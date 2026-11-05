import React from "react";
import { RideCard } from "./RideCard";
import { CarIcon, UsersIcon, PlusIcon, SearchIcon } from "./Icons";

export function MyRidesView({ 
  rides, 
  currentUser, 
  onLeaveClick, 
  onCancelClick, 
  onFindRidesClick,
  onOfferRideClick 
}) {
  const hostedRides = rides.filter((r) => r.host.email === currentUser.email);
  const joinedRides = rides.filter((r) => 
    r.passengers.some((p) => p.email === currentUser.email && !p.isHost)
  );

  const hasAnyRides = hostedRides.length > 0 || joinedRides.length > 0;

  // Calculate estimated personal savings for the user
  const personalSavings = joinedRides.reduce((total, r) => {
    const solo = r.totalFare;
    const split = Math.ceil(r.totalFare / r.passengers.length);
    return total + (solo - split);
  }, 0);

  return (
    <div className="container" style={{ paddingTop: "1.5rem", paddingBottom: "3rem" }}>
      {/* Top Banner */}
      <div style={{ background: "white", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-xl)", padding: "1.5rem", marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: "700" }}>
            My Rides & Active Bookings
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>
            Track the rides you are hosting or riding along in today.
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ background: "var(--success-light)", padding: "0.5rem 1rem", borderRadius: "var(--radius-md)", border: "1px solid #bbf7d0" }}>
            <span style={{ fontSize: "0.75rem", color: "#166534", fontWeight: "600", display: "block" }}>YOUR SAVINGS</span>
            <strong style={{ fontSize: "1.2rem", color: "#166534" }}>₹{personalSavings.toLocaleString()}</strong>
          </div>
          <button className="btn btn-primary btn-sm" onClick={onOfferRideClick}>
            <PlusIcon size={16} /> Offer Another
          </button>
        </div>
      </div>

      {!hasAnyRides ? (
        <div className="empty-state">
          <div className="empty-icon">
            <CarIcon size={32} />
          </div>
          <h4>No Active Rides Yet</h4>
          <p>
            You haven't joined or hosted any ride pools yet. Check out available rides heading to campus or offer your own!
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem" }}>
            <button className="btn btn-primary" onClick={onFindRidesClick}>
              <SearchIcon size={18} /> Find Rides
            </button>
            <button className="btn btn-secondary" onClick={onOfferRideClick}>
              <PlusIcon size={18} /> Offer a Ride
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Hosted Section */}
          {hostedRides.length > 0 && (
            <div style={{ marginBottom: "2.5rem" }}>
              <div className="feed-header">
                <h3>🚗 Rides You Are Hosting ({hostedRides.length})</h3>
              </div>
              <div className="rides-grid">
                {hostedRides.map((ride) => (
                  <RideCard
                    key={ride.id}
                    ride={ride}
                    currentUser={currentUser}
                    onLeaveClick={onLeaveClick}
                    onCancelClick={onCancelClick}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Joined Section */}
          {joinedRides.length > 0 && (
            <div>
              <div className="feed-header">
                <h3>🤝 Pools You Have Joined ({joinedRides.length})</h3>
              </div>
              <div className="rides-grid">
                {joinedRides.map((ride) => (
                  <RideCard
                    key={ride.id}
                    ride={ride}
                    currentUser={currentUser}
                    onLeaveClick={onLeaveClick}
                    onCancelClick={onCancelClick}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
