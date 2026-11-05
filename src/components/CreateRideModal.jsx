import React, { useState } from "react";
import { XIcon, CarIcon, ShieldCheckIcon, CalculatorIcon } from "./Icons";
import { POPULAR_LOCATIONS } from "../data/initialRides";

export function CreateRideModal({ isOpen, onClose, onCreateRide, currentUser }) {
  const [origin, setOrigin] = useState(POPULAR_LOCATIONS[0]);
  const [destination, setDestination] = useState(POPULAR_LOCATIONS[5]);
  const [timeString, setTimeString] = useState("Today, 09:30 AM");
  const [vehicleType, setVehicleType] = useState("Cab / Sedan");
  const [totalFare, setTotalFare] = useState(300);
  const [totalSeats, setTotalSeats] = useState(4);
  const [isWomenOnly, setIsWomenOnly] = useState(false);
  const [pickupNotes, setPickupNotes] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRide = {
      id: "ride-" + Date.now(),
      host: {
        name: currentUser.name,
        dept: currentUser.dept,
        email: currentUser.email,
        phone: currentUser.phone,
        avatar: currentUser.avatar,
        isVerified: true
      },
      origin,
      destination,
      departureTime: timeString,
      departureTimestamp: Date.now() + 1000 * 60 * 60,
      vehicleType,
      totalFare: Number(totalFare) || 200,
      totalSeats: Number(totalSeats),
      availableSeats: Number(totalSeats) - 1, // Host occupies 1 seat
      isWomenOnly,
      pickupNotes,
      passengers: [
        { name: currentUser.name, email: currentUser.email, isHost: true }
      ],
      status: "ACTIVE"
    };

    onCreateRide(newRide);
    onClose();
  };

  const perPersonPreview = Math.ceil((Number(totalFare) || 0) / Number(totalSeats));

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <CarIcon size={20} className="text-primary" />
            <h3>Offer a Campus Ride Pool</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <XIcon size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-grid">
              {/* Origin */}
              <div className="input-group form-full">
                <label>Pickup Location (Origin)</label>
                <select
                  className="select-field"
                  style={{ paddingLeft: "1rem" }}
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  required
                >
                  {POPULAR_LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              {/* Destination */}
              <div className="input-group form-full">
                <label>Drop Location (Destination)</label>
                <select
                  className="select-field"
                  style={{ paddingLeft: "1rem" }}
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  required
                >
                  {POPULAR_LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              {/* Departure Time */}
              <div className="input-group">
                <label>Departure Time</label>
                <input
                  type="text"
                  className="input-field"
                  style={{ paddingLeft: "1rem" }}
                  placeholder="e.g. Today, 09:30 AM"
                  value={timeString}
                  onChange={(e) => setTimeString(e.target.value)}
                  required
                />
              </div>

              {/* Vehicle Type */}
              <div className="input-group">
                <label>Vehicle Type</label>
                <select
                  className="select-field"
                  style={{ paddingLeft: "1rem" }}
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                >
                  <option value="Cab / Sedan">Cab / Sedan</option>
                  <option value="Auto-Rickshaw">Auto-Rickshaw</option>
                  <option value="Personal Car">Personal Car</option>
                </select>
              </div>

              {/* Total Estimated Fare */}
              <div className="input-group">
                <label>Total Fare (₹)</label>
                <input
                  type="number"
                  min="20"
                  max="5000"
                  className="input-field"
                  style={{ paddingLeft: "1rem" }}
                  value={totalFare}
                  onChange={(e) => setTotalFare(e.target.value)}
                  required
                />
              </div>

              {/* Total Vehicle Seats */}
              <div className="input-group">
                <label>Total Seats (Including You)</label>
                <select
                  className="select-field"
                  style={{ paddingLeft: "1rem" }}
                  value={totalSeats}
                  onChange={(e) => setTotalSeats(e.target.value)}
                >
                  <option value={2}>2 (e.g. Auto / Bike)</option>
                  <option value={3}>3 (e.g. 3-seater auto / hatchback)</option>
                  <option value={4}>4 (e.g. Standard 4-seater cab)</option>
                </select>
              </div>

              {/* Live Fare Preview Banner */}
              <div className="form-full" style={{ background: "var(--primary-light)", padding: "0.85rem", borderRadius: "var(--radius-md)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: "0.75rem", fontWeight: "700", color: "var(--primary)" }}>ESTIMATED FARE WHEN FULL</div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Total ₹{totalFare} ÷ {totalSeats} seats</div>
                </div>
                <div style={{ fontSize: "1.3rem", fontWeight: "800", color: "var(--primary)" }}>
                  ₹{perPersonPreview} <span style={{ fontSize: "0.75rem", fontWeight: "500" }}>/person</span>
                </div>
              </div>

              {/* Notes / Landmark */}
              <div className="input-group form-full">
                <label>Pickup Notes & Landmark (Optional)</label>
                <input
                  type="text"
                  className="input-field"
                  style={{ paddingLeft: "1rem" }}
                  placeholder="e.g. Meet outside Gate 2 near the ATM. Cab # DL 01 AB 1234"
                  value={pickupNotes}
                  onChange={(e) => setPickupNotes(e.target.value)}
                />
              </div>

              {/* Women Only Checkbox */}
              <div className="form-full" style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginTop: "0.25rem" }}>
                <input
                  type="checkbox"
                  id="womenOnly"
                  checked={isWomenOnly}
                  onChange={(e) => setIsWomenOnly(e.target.checked)}
                  style={{ width: "18px", height: "18px", accentColor: "var(--accent-pink)", cursor: "pointer" }}
                />
                <label htmlFor="womenOnly" style={{ fontSize: "0.875rem", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <ShieldCheckIcon size={16} style={{ color: "var(--accent-pink)" }} />
                  Make this a Women-Only pool
                </label>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Publish Ride Pool
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
