import React from "react";
import { SearchIcon, MapPinIcon, FilterIcon, ShieldCheckIcon } from "./Icons";
import { POPULAR_LOCATIONS } from "../data/initialRides";

export function FilterBar({
  searchQuery,
  setSearchQuery,
  selectedLocation,
  setSelectedLocation,
  vehicleFilter,
  setVehicleFilter,
  isWomenOnlyFilter,
  setIsWomenOnlyFilter,
  onResetFilters
}) {
  return (
    <div className="filter-card">
      <div className="filter-grid">
        {/* Search Input */}
        <div className="input-group">
          <label>Search Route / Host</label>
          <div className="input-with-icon">
            <SearchIcon size={18} className="input-icon" />
            <input
              type="text"
              className="input-field"
              placeholder="e.g. Metro Gate 2, Library, Engineering..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Location Dropdown */}
        <div className="input-group">
          <label>Filter by Location</label>
          <div className="input-with-icon">
            <MapPinIcon size={18} className="input-icon" />
            <select
              className="select-field"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="">All Locations</option>
              {POPULAR_LOCATIONS.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Vehicle Type */}
        <div className="input-group">
          <label>Vehicle Type</label>
          <div className="input-with-icon">
            <FilterIcon size={18} className="input-icon" />
            <select
              className="select-field"
              value={vehicleFilter}
              onChange={(e) => setVehicleFilter(e.target.value)}
            >
              <option value="ALL">All Vehicles</option>
              <option value="Cab / Sedan">Cab / Sedan</option>
              <option value="Auto-Rickshaw">Auto-Rickshaw</option>
              <option value="Personal Car">Personal Car</option>
            </select>
          </div>
        </div>

        {/* Women-Only Filter Toggle */}
        <div className="input-group">
          <label>Safety Filter</label>
          <div
            className={`women-toggle ${isWomenOnlyFilter ? "active" : ""}`}
            onClick={() => setIsWomenOnlyFilter(!isWomenOnlyFilter)}
          >
            <ShieldCheckIcon size={18} />
            <span>Women-Only</span>
          </div>
        </div>
      </div>
    </div>
  );
}
