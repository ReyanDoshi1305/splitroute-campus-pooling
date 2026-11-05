import React, { useState } from "react";
import { XIcon, CalculatorIcon, SparklesIcon, WalletIcon } from "./Icons";

export function FareCalculatorModal({ isOpen, onClose }) {
  const [fare, setFare] = useState(320);

  if (!isOpen) return null;

  const splits = [
    { count: 1, label: "Solo Ride", perPerson: fare, savings: 0 },
    { count: 2, label: "2 Students", perPerson: Math.ceil(fare / 2), savings: Math.floor(fare - fare / 2) },
    { count: 3, label: "3 Students", perPerson: Math.ceil(fare / 3), savings: Math.floor(fare - fare / 3) },
    { count: 4, label: "4 Students (Full)", perPerson: Math.ceil(fare / 4), savings: Math.floor(fare - fare / 4) }
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <CalculatorIcon size={20} className="text-primary" />
            <h3>Campus Fare Split Calculator</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <XIcon size={18} />
          </button>
        </div>

        <div className="modal-body">
          <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginBottom: "1rem" }}>
            Got an Uber, Ola, or Auto-rickshaw quote? See how much you and your friends will save by pooling together.
          </p>

          <div className="input-group">
            <label>Total Cab / Auto Fare (₹)</label>
            <input
              type="number"
              min="10"
              max="10000"
              className="input-field"
              style={{ paddingLeft: "1rem", fontSize: "1.1rem", fontWeight: "700" }}
              value={fare}
              onChange={(e) => setFare(Number(e.target.value) || 0)}
            />
          </div>

          <div className="calc-breakdown">
            {splits.map((s) => (
              <div 
                key={s.count} 
                className={`split-step-box ${s.count === 4 ? "highlight" : ""}`}
              >
                <span>{s.label}</span>
                <strong>₹{s.perPerson}</strong>
                <span style={{ color: s.savings > 0 ? "var(--success)" : "var(--text-light)", fontWeight: "600", fontSize: "0.7rem", marginTop: "0.2rem" }}>
                  {s.savings > 0 ? `Save ₹${s.savings}` : "No savings"}
                </span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "1.5rem", background: "var(--primary-light)", padding: "1rem", borderRadius: "var(--radius-md)", display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <SparklesIcon size={24} style={{ color: "var(--primary)", flexShrink: 0 }} />
            <div style={{ fontSize: "0.85rem", color: "var(--text-main)" }}>
              <strong>Did you know?</strong> Sharing a cab with 3 campus peers saves you <strong>₹{Math.floor(fare - fare / 4)} per ride</strong>, which equals roughly <strong>₹{Math.floor((fare - fare / 4) * 20).toLocaleString()} saved per month</strong>!
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-primary" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
