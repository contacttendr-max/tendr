// src/components/PrimaryFilters_ListingPage.jsx
import React from "react";

const PrimaryFilters_ListingPage = ({
  eventType = "",
  setEventType = () => {},
  serviceType = "",
  setServiceType = () => {},
  locationType = "",
  setLocationType = () => {},
  date = "",
  setDate = () => {},
  guestCount = "",
  setGuestCount = () => {},
  onSearch = () => {},
}) => {
  return (
    <div className="primary-filters space-y-4 sm:space-y-6">
      {/* Service Type */}
      <div className="filter-group">
        <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
          Service Type
        </label>
        <select
          value={serviceType}
          onChange={(e) => setServiceType(e.target.value)}
          className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CCAB4A] focus:border-[#CCAB4A] text-sm sm:text-base"
        >
          <option value="">All Services</option>
          <option value="Caterer">Caterer</option>
          <option value="Decorator">Decorator</option>
          <option value="Photographer">Photographer</option>
          {/* add more here if your API supports them: DJ, Makeup, Venue, etc. */}
        </select>
      </div>

      {/* Location */}
      <div className="filter-group">
        <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
          Location
        </label>
        <input
          value={locationType}
          onChange={(e) => setLocationType(e.target.value)}
          placeholder="City / Area"
          className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CCAB4A] focus:border-[#CCAB4A] text-sm sm:text-base"
        />
      </div>

      {/* Event Type */}
      <div className="filter-group">
        <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
          Event Type
        </label>
        <select
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
          className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CCAB4A] focus:border-[#CCAB4A] text-sm sm:text-base"
        >
          <option value="">All Event Types</option>
          <option value="Get-together">Get-together</option>
          <option value="Birthday">Birthday</option>
          <option value="Office Party">Office Party</option>
          <option value="Concert">Concert</option>
          <option value="Anniversary">Anniversary</option>
          <option value="Pre Wedding">Pre Wedding</option>
          <option value="Rituals">Rituals</option>
          <option value="Festival">Festival</option>
          <option value="Others">Others</option>
        </select>
      </div>

      {/* Date */}
      <div className="filter-group">
        <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
          Date
        </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CCAB4A] focus:border-[#CCAB4A] text-sm sm:text-base"
        />
      </div>

      {/* Guest Count */}
      <div className="filter-group">
        <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
          Number of Guests
        </label>
        <input
          type="number"
          min="1"
          value={guestCount ?? ""}
          onChange={(e) => setGuestCount(e.target.value)}
          placeholder="Enter guest count"
          className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CCAB4A] focus:border-[#CCAB4A] text-sm sm:text-base"
        />
      </div>

      {/* Trigger search */}
      <button
        onClick={onSearch}
        className="w-full bg-[#CCAB4A] text-white py-2 sm:py-3 px-4 rounded-lg font-semibold hover:bg-[#ab8f39] transition-colors duration-200 text-sm sm:text-base"
      >
        Search
      </button>
    </div>
  );
};

export default PrimaryFilters_ListingPage;
