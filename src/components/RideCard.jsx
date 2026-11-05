import React from "react";
import { 
  ShieldCheckIcon, 
  ClockIcon, 
  CarIcon, 
  UsersIcon, 
  InfoIcon, 
  CheckCircleIcon 
} from "./Icons";

export function RideCard({ 
  ride, 
  currentUser, 
  onJoinClick, 
  onLeaveClick, 
  onCancelClick 
}) {
  const isHost = ride.host.email === currentUser.email;
  const isPassenger = ride.passengers.some((p) => p.email === currentUser.email && !p.isHost);
  const totalOccupants = ride.passengers.length;
  // Per person fare split currently
  const currentPerPersonFare = Math.ceil(ride.totalFare / Math.max(1, totalOccupants));
  // What it will become if 1 more person joins (if seats still open)
  const potentialPerPersonFare = Math.ceil(ride.totalFare / (totalOccupants + 1));

  return (
    <div className={`ride-card ${ride.isWomenOnly ? "women-only-card" : "standard-card"}`}>
      <div>
        {/* Card Top: Host & Badges */}
        <div className="card-top">
          <div className="host-profile">
            <img 
              src={ride.host.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80"} 
              alt={ride.host.name} 
              className="host-avatar" 
            />
            <div className="host-details">
              <h4>
                {ride.host.name}
                {ride.host.isVerified && (
                  <span className="verified-badge" title="Verified Campus Student">
                    <CheckCircleIcon size={16} />
                  </span>
                )}
              </h4>
              <p>{ride.host.dept}</p>
            </div>
          </div>

          <div className="tags-cluster">
            {ride.isWomenOnly && (
              <span className="pill-badge pill-women">
                <ShieldCheckIcon size={12} /> Women Only
              </span>
            )}
            <span className="pill-badge pill-vehicle">
              <CarIcon size={12} /> {ride.vehicleType}
            </span>
          </div>
        </div>

        {/* Route Timeline */}
        <div className="route-timeline">
          <div className="route-point">
            <span className="route-bullet"></span>
            <div className="route-label">From (Pickup)</div>
            <div className="route-value" title={ride.origin}>{ride.origin}</div>
          </div>

          <div className="route-point">
            <span className="route-bullet end"></span>
            <div className="route-label">To (Drop)</div>
            <div className="route-value" title={ride.destination}>{ride.destination}</div>
          </div>
        </div>

        {/* Departure Time */}
        <div className="ride-timing-strip">
          <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
            <ClockIcon size={16} />
            {ride.departureTime}
          </span>
          <span>
            {ride.passengers.length} of {ride.totalSeats} seats taken
          </span>
        </div>

        {/* Notes */}
        {ride.pickupNotes && (
          <div className="pickup-note">
            💬 "{ride.pickupNotes}"
          </div>
        )}
      </div>

      {/* Card Bottom: Fare & Booking CTA */}
      <div className="card-bottom">
        <div className="fare-block">
          <span className="per-person-label">Est. Fare / Person</span>
          <div className="fare-amount">₹{currentPerPersonFare}</div>
          <span className="fare-total-sub">Total: ₹{ride.totalFare}</span>
        </div>

        <div className="seat-status-box">
          <span className={`seat-pill ${ride.availableSeats > 0 ? "seat-available" : "seat-full"}`}>
            {ride.availableSeats > 0 ? `${ride.availableSeats} seat${ride.availableSeats > 1 ? "s" : ""} left` : "Pool Full"}
          </span>

          {/* Action Button */}
          {isHost ? (
            <button 
              className="btn btn-secondary btn-sm" 
              style={{ color: "var(--danger)", borderColor: "#fecaca" }}
              onClick={() => onCancelClick(ride.id)}
            >
              Cancel Pool
            </button>
          ) : isPassenger ? (
            <button 
              className="btn btn-secondary btn-sm"
              style={{ color: "var(--warning)", borderColor: "#fef3c7" }}
              onClick={() => onLeaveClick(ride.id)}
            >
              Leave Ride
            </button>
          ) : ride.availableSeats > 0 ? (
            <button 
              className="btn btn-primary btn-sm"
              onClick={() => onJoinClick(ride)}
            >
              Join Pool (₹{potentialPerPersonFare})
            </button>
          ) : (
            <button className="btn btn-secondary btn-sm" disabled style={{ opacity: 0.6, cursor: "not-allowed" }}>
              Full
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
