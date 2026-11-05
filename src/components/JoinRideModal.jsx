import React from "react";
import { XIcon, CarIcon, UsersIcon, CheckCircleIcon, MapPinIcon, ClockIcon } from "./Icons";

export function JoinRideModal({ isOpen, onClose, ride, onConfirmJoin, currentUser }) {
  if (!isOpen || !ride) return null;

  const newPassengerCount = ride.passengers.length + 1;
  const newPerPersonFare = Math.ceil(ride.totalFare / newPassengerCount);
  const soloFare = ride.totalFare;
  const savedAmount = soloFare - newPerPersonFare;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <UsersIcon size={20} className="text-primary" />
            <h3>Join Ride Pool</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <XIcon size={18} />
          </button>
        </div>

        <div className="modal-body">
          {/* Host strip */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", background: "#f8fafc", padding: "0.85rem", borderRadius: "var(--radius-md)", marginBottom: "1.25rem" }}>
            <img 
              src={ride.host.avatar} 
              alt={ride.host.name} 
              style={{ width: "42px", height: "42px", borderRadius: "50%", objectFit: "cover" }} 
            />
            <div>
              <div style={{ fontWeight: "700", display: "flex", alignItems: "center", gap: "0.35rem" }}>
                Hosted by {ride.host.name}
                <CheckCircleIcon size={16} style={{ color: "var(--primary)" }} />
              </div>
              <div style={{ fontSize: "0.775rem", color: "var(--text-muted)" }}>
                {ride.host.dept} • {ride.vehicleType}
              </div>
            </div>
          </div>

          {/* Route Review */}
          <div style={{ marginBottom: "1.25rem", padding: "0.85rem", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)" }}>
            <div style={{ fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.35rem" }}>
              <ClockIcon size={16} /> Departs: {ride.departureTime}
            </div>
            <div style={{ fontSize: "0.85rem", color: "var(--text-main)", marginBottom: "0.35rem" }}>
              📍 <strong>From:</strong> {ride.origin}
            </div>
            <div style={{ fontSize: "0.85rem", color: "var(--text-main)" }}>
              🏁 <strong>To:</strong> {ride.destination}
            </div>
          </div>

          {/* Fare Split Math Box */}
          <div style={{ background: "var(--success-light)", border: "1px solid #bbf7d0", padding: "1rem", borderRadius: "var(--radius-md)", marginBottom: "1.25rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
              <span style={{ fontSize: "0.85rem", color: "#166534", fontWeight: "600" }}>Your Split (Split by {newPassengerCount} students)</span>
              <span style={{ fontSize: "1.4rem", fontWeight: "800", color: "#166534" }}>₹{newPerPersonFare}</span>
            </div>
            <div style={{ fontSize: "0.75rem", color: "#15803d", display: "flex", justifyContent: "space-between" }}>
              <span>Solo Fare: ₹{soloFare}</span>
              <span><strong>You Save: ₹{savedAmount} (70%+)</strong></span>
            </div>
          </div>

          {/* Co-passengers */}
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
            <strong>Current Co-riders ({ride.passengers.length}):</strong>
            <ul style={{ marginTop: "0.35rem", paddingLeft: "1.25rem" }}>
              {ride.passengers.map((p, idx) => (
                <li key={idx}>
                  {p.name} {p.isHost && "(Host)"}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button 
            type="button" 
            className="btn btn-primary"
            onClick={() => {
              onConfirmJoin(ride.id);
              onClose();
            }}
          >
            Confirm & Reserve Seat
          </button>
        </div>
      </div>
    </div>
  );
}
