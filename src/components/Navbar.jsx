import React from "react";
import { CarIcon, PlusIcon, CalculatorIcon, UsersIcon } from "./Icons";

export function Navbar({ activeTab, setActiveTab, onOpenCreateModal, onOpenCalculator, myRidesCount }) {
  return (
    <header className="navbar">
      <div className="container">
        <div className="nav-wrapper">
          {/* Brand Logo */}
          <div className="brand-logo" onClick={() => setActiveTab("feed")}>
            <div className="brand-icon-box">
              <CarIcon size={22} />
            </div>
            <div className="brand-text">
              <h1>SplitRoute</h1>
              <span>Campus Commute Pool</span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="nav-tabs">
            <button
              className={`nav-tab-btn ${activeTab === "feed" ? "active" : ""}`}
              onClick={() => setActiveTab("feed")}
            >
              <CarIcon size={16} />
              <span className="label">Find Rides</span>
            </button>

            <button
              className={`nav-tab-btn ${activeTab === "my-rides" ? "active" : ""}`}
              onClick={() => setActiveTab("my-rides")}
            >
              <UsersIcon size={16} />
              <span className="label">My Rides</span>
              {myRidesCount > 0 && <span className="badge-count">{myRidesCount}</span>}
            </button>

            <button
              className="nav-tab-btn"
              onClick={onOpenCalculator}
            >
              <CalculatorIcon size={16} />
              <span className="label">Split Calc</span>
            </button>
          </nav>

          {/* Actions & Profile */}
          <div className="nav-actions">
            <button className="btn btn-primary btn-sm" onClick={onOpenCreateModal}>
              <PlusIcon size={16} />
              <span>Offer Ride</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
