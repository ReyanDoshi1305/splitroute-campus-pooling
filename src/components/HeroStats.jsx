import React from "react";
import { SparklesIcon, WalletIcon, LeafIcon, CarIcon, UsersIcon } from "./Icons";

export function HeroStats({ totalActiveRides, totalSavedAmount }) {
  return (
    <section className="hero-stats">
      <div className="container">
        <div className="hero-header">
          <div className="hero-pill">
            <SparklesIcon size={14} />
            <span>Zero-Cost Solo Rides Are Over</span>
          </div>
          <h2>Split Campus Cabs, Autos & Commutes</h2>
          <p>
            Connect with verified students heading your way. Share seats, cut transit costs by up to 75%, and travel safely together.
          </p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon green">
              <WalletIcon size={24} />
            </div>
            <div className="stat-info">
              <h3>₹{totalSavedAmount.toLocaleString()}</h3>
              <p>Total Student Money Saved</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon blue">
              <CarIcon size={24} />
            </div>
            <div className="stat-info">
              <h3>{totalActiveRides} Pools</h3>
              <p>Active Rides Open Today</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon cyan">
              <LeafIcon size={24} />
            </div>
            <div className="stat-info">
              <h3>340 kg</h3>
              <p>Campus CO₂ Prevented</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon yellow">
              <UsersIcon size={24} />
            </div>
            <div className="stat-info">
              <h3>100%</h3>
              <p>Verified Campus Community</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
