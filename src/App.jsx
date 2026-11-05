import React, { useState, useEffect, useMemo } from "react";
import { INITIAL_RIDES } from "./data/initialRides";
import { Navbar } from "./components/Navbar";
import { HeroStats } from "./components/HeroStats";
import { FilterBar } from "./components/FilterBar";
import { RideCard } from "./components/RideCard";
import { CreateRideModal } from "./components/CreateRideModal";
import { JoinRideModal } from "./components/JoinRideModal";
import { FareCalculatorModal } from "./components/FareCalculatorModal";
import { MyRidesView } from "./components/MyRidesView";
import { Toast } from "./components/Toast";
import { CarIcon, PlusIcon, SearchIcon } from "./components/Icons";

const STORAGE_KEY = "splitroute_rides_v1";

export default function App() {
  // Current Logged-in Campus Student Profile
  const [currentUser] = useState({
    name: "Rohan Mehra",
    dept: "Computer Science, 2nd Yr",
    email: "rohan.m@campus.edu",
    phone: "+91 98990 12345",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
    isVerified: true
  });

  // State: Rides List with LocalStorage Persistence
  const [rides, setRides] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to load saved rides:", e);
    }
    return INITIAL_RIDES;
  });

  // Save to LocalStorage whenever rides change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(rides));
    } catch (e) {
      console.error("Failed to save rides:", e);
    }
  }, [rides]);

  // Tab & Modal Navigation State
  const [activeTab, setActiveTab] = useState("feed"); // "feed" | "my-rides"
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCalculatorModalOpen, setIsCalculatorModalOpen] = useState(false);
  const [joiningRide, setJoiningRide] = useState(null);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [vehicleFilter, setVehicleFilter] = useState("ALL");
  const [isWomenOnlyFilter, setIsWomenOnlyFilter] = useState(false);

  // Toast Notification State
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Actions
  const handleCreateRide = (newRide) => {
    setRides((prev) => [newRide, ...prev]);
    showToast("🎉 Ride pool published successfully! Fellow students can now join.");
  };

  const handleJoinRide = (rideId) => {
    setRides((prev) =>
      prev.map((r) => {
        if (r.id !== rideId) return r;
        if (r.availableSeats <= 0) return r;

        const updatedPassengers = [
          ...r.passengers,
          { name: currentUser.name, email: currentUser.email, isHost: false }
        ];
        const updatedSeats = r.availableSeats - 1;

        return {
          ...r,
          passengers: updatedPassengers,
          availableSeats: updatedSeats,
          status: updatedSeats === 0 ? "FULL" : "ACTIVE"
        };
      })
    );
    showToast("Seat reserved! Check 'My Rides' to view details.");
  };

  const handleLeaveRide = (rideId) => {
    setRides((prev) =>
      prev.map((r) => {
        if (r.id !== rideId) return r;

        const updatedPassengers = r.passengers.filter(
          (p) => p.email !== currentUser.email
        );
        const updatedSeats = r.availableSeats + 1;

        return {
          ...r,
          passengers: updatedPassengers,
          availableSeats: updatedSeats,
          status: "ACTIVE"
        };
      })
    );
    showToast("You have left the ride pool.", "info");
  };

  const handleCancelRide = (rideId) => {
    if (window.confirm("Are you sure you want to cancel this ride pool?")) {
      setRides((prev) => prev.filter((r) => r.id !== rideId));
      showToast("Ride pool has been cancelled.", "info");
    }
  };

  // Filtered Rides Calculation
  const filteredRides = useMemo(() => {
    return rides.filter((ride) => {
      // 1. Text search across origin, destination, host name
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        ride.origin.toLowerCase().includes(q) ||
        ride.destination.toLowerCase().includes(q) ||
        ride.host.name.toLowerCase().includes(q) ||
        (ride.pickupNotes && ride.pickupNotes.toLowerCase().includes(q));

      // 2. Location filter
      const matchesLocation =
        !selectedLocation ||
        ride.origin === selectedLocation ||
        ride.destination === selectedLocation;

      // 3. Vehicle filter
      const matchesVehicle =
        vehicleFilter === "ALL" || ride.vehicleType === vehicleFilter;

      // 4. Women-only filter
      const matchesWomen = !isWomenOnlyFilter || ride.isWomenOnly;

      return matchesSearch && matchesLocation && matchesVehicle && matchesWomen;
    });
  }, [rides, searchQuery, selectedLocation, vehicleFilter, isWomenOnlyFilter]);

  // Overall Campus Stats
  const activePoolsCount = rides.filter((r) => r.availableSeats > 0).length;
  const totalMoneySaved = useMemo(() => {
    return rides.reduce((sum, r) => {
      const occupants = r.passengers.length;
      if (occupants <= 1) return sum;
      const soloCost = r.totalFare * (occupants - 1);
      const splitCost = Math.ceil(r.totalFare / occupants) * (occupants - 1);
      return sum + (soloCost - splitCost);
    }, 45000); // Base seeded campus savings
  }, [rides]);

  // My Rides Count
  const myRidesCount = useMemo(() => {
    return rides.filter(
      (r) =>
        r.host.email === currentUser.email ||
        r.passengers.some((p) => p.email === currentUser.email)
    ).length;
  }, [rides, currentUser.email]);

  return (
    <div className="app-root">
      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCreateModal={() => setIsCreateModalOpen(true)}
        onOpenCalculator={() => setIsCalculatorModalOpen(true)}
        myRidesCount={myRidesCount}
      />

      {/* Main Content View Switcher */}
      {activeTab === "feed" ? (
        <main>
          {/* Hero Banner & Campus Stats */}
          <HeroStats
            totalActiveRides={activePoolsCount}
            totalSavedAmount={totalMoneySaved}
          />

          <div className="container">
            {/* Filter Bar */}
            <FilterBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
              vehicleFilter={vehicleFilter}
              setVehicleFilter={setVehicleFilter}
              isWomenOnlyFilter={isWomenOnlyFilter}
              setIsWomenOnlyFilter={setIsWomenOnlyFilter}
            />

            {/* Feed Header */}
            <div className="feed-header">
              <h3>
                {isWomenOnlyFilter ? "🌸 Women-Only Pools" : "🚗 Available Campus Pools"}{" "}
                ({filteredRides.length})
              </h3>
              {(searchQuery || selectedLocation || vehicleFilter !== "ALL" || isWomenOnlyFilter) && (
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedLocation("");
                    setVehicleFilter("ALL");
                    setIsWomenOnlyFilter(false);
                  }}
                >
                  Clear Filters
                </button>
              )}
            </div>

            {/* Rides Grid */}
            {filteredRides.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">
                  <SearchIcon size={32} />
                </div>
                <h4>No matching ride pools found</h4>
                <p>
                  Try adjusting your search criteria, or be the first to offer a ride pool on this route!
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => setIsCreateModalOpen(true)}
                >
                  <PlusIcon size={18} /> Offer a Ride on this Route
                </button>
              </div>
            ) : (
              <div className="rides-grid">
                {filteredRides.map((ride) => (
                  <RideCard
                    key={ride.id}
                    ride={ride}
                    currentUser={currentUser}
                    onJoinClick={(r) => setJoiningRide(r)}
                    onLeaveClick={handleLeaveRide}
                    onCancelClick={handleCancelRide}
                  />
                ))}
              </div>
            )}
          </div>
        </main>
      ) : (
        <MyRidesView
          rides={rides}
          currentUser={currentUser}
          onLeaveClick={handleLeaveRide}
          onCancelClick={handleCancelRide}
          onFindRidesClick={() => setActiveTab("feed")}
          onOfferRideClick={() => setIsCreateModalOpen(true)}
        />
      )}

      {/* Modals */}
      <CreateRideModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateRide={handleCreateRide}
        currentUser={currentUser}
      />

      <JoinRideModal
        isOpen={!!joiningRide}
        ride={joiningRide}
        onClose={() => setJoiningRide(null)}
        onConfirmJoin={handleJoinRide}
        currentUser={currentUser}
      />

      <FareCalculatorModal
        isOpen={isCalculatorModalOpen}
        onClose={() => setIsCalculatorModalOpen(false)}
      />

      {/* Toast Alert */}
      <Toast toast={toast} />
    </div>
  );
}
