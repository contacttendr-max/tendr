import React, { useEffect, useMemo, useState } from "react";

/** Static fallback options shown when no vendors provide values yet */
const MASTER_OPTIONS = {
  Caterer: {
    cuisineTypes: ["North Indian","South Indian","Chinese","Italian","Mexican","Continental"],
    dietaryPreferences: ["Vegetarian","Vegan","Non-Vegetarian","Gluten-Free","Halal","Jain"],
    serviceFeatures: ["On-Site Cooking","Delivery","Setup & Cleanup","Staff Provided","Custom Menu","Tasting Available"],
  },
  Decorator: {
    themes: ["Floral Focused","Balloon Dominant","Lighting Emphasis","Fabric Draping","Mixed Media","Prop Centered","Minimalist Touch"],
    venueCoverage: ["Interior","Exterior","Full","Backdrop Stage Setup"],
  },
  Photographer: {
    styles: ["Candid","Traditional","Documentary","Fine Art","Pre-wedding","Cinematic"],
    deliverables: ["Albums","Digital Files","Raw Photos","Edited Photos","Reels / Short Films","Prints"],
  },
  DJ: {
    musicGenres: ["Bollywood","EDM","Hip-Hop","Punjabi","Retro","House"],
    djServices: ["MC/Hosting","Dance Floor","Lighting","Fog Machine"],
    equipment: ["DJ Controller","Speakers","Subwoofers","Microphones","Lights"],
  },
  Makeup: {
    makeupStyles: ["Bridal","Engagement","Party","HD","Airbrush"],
    makeupServices: ["Hair Styling","Draping","Nail Art","Trial"],
    brands: ["MAC","Huda Beauty","Maybelline","Lakmé","NYX"],
  },
  Venue: {
    venueType: ["Banquet","Lawn","Resort","Farmhouse","Hall","Rooftop"],
    amenities: ["Parking","AC","Rooms","Stage","Catering Kitchen","Generator"],
    capacityBands: ["0–100","100–300","300–600","600+"],
  },
  Mehndi: {
    mehndiStyles: ["Bridal","Arabic","Rajasthani","Moroccan","Indo-Western"],
    packageTypes: ["Per Hand","Hourly","Full Bridal","Family Pack"],
  },
  Band: {
    musicGenres: ["Bollywood","Punjabi","Classical","Sufi","Fusion"],
    instruments: ["Dhol","Trumpet","Saxophone","Drums","Shehnai"],
    bandServices: ["Procession","Stage Show","Entry Performance"],
  },
  Planner: {
    specialties: ["Budgeting","Logistics","Theme Design","Vendor Management","End-to-End Planning"],
    plannerServices: ["Day-of Coordination","Full Planning","Partial Planning","Decor Supervision"],
  },
};

/** Which sections to show per serviceType (keys must match vendor fields / MASTER_OPTIONS) */
const TYPE_CONFIG = {
  Caterer: [
    { key: "cuisineTypes", title: "Cuisine Types" },
    { key: "dietaryPreferences", title: "Dietary Preferences" },
    { key: "serviceFeatures", title: "Service Features" },
  ],
  Decorator: [
    { key: "themes", title: "Themes" },
    { key: "venueCoverage", title: "Venue Coverage" },
  ],
  Photographer: [
    { key: "styles", title: "Styles" },
    { key: "deliverables", title: "Deliverables" },
  ],
  DJ: [
    { key: "musicGenres", title: "Music Genres" },
    { key: "djServices", title: "Services" },
    { key: "equipment", title: "Equipment" },
  ],
  Makeup: [
    { key: "makeupStyles", title: "Makeup Styles" },
    { key: "makeupServices", title: "Services" },
    { key: "brands", title: "Brands" },
  ],
  Venue: [
    { key: "venueType", title: "Venue Type" },
    { key: "amenities", title: "Amenities" },
    { key: "capacityBands", title: "Capacity" },
  ],
  Mehndi: [
    { key: "mehndiStyles", title: "Mehndi Styles" },
    { key: "packageTypes", title: "Packages" },
  ],
  Band: [
    { key: "musicGenres", title: "Music Genres" },
    { key: "instruments", title: "Instruments" },
    { key: "bandServices", title: "Services" },
  ],
  Planner: [
    { key: "specialties", title: "Specialties" },
    { key: "plannerServices", title: "Services" },
  ],
};

const ALL_KEYS = Array.from(
  new Set(Object.values(TYPE_CONFIG).flat().map((s) => s.key))
);

const SecondaryFilters_ListingPage = ({
  serviceType = "",
  vendors = [],
  filters,
  onFilterChange,
  onFiltersChange,
}) => {
  const isControlled = filters !== undefined && typeof onFilterChange === "function";
  const [localFilters, setLocalFilters] = useState(() =>
    Object.fromEntries([...ALL_KEYS, "minRating"].map((k) => [k, k === "minRating" ? undefined : []]))
  );
  const current = isControlled ? filters : localFilters;

  const update = (key, value) => {
    if (isControlled) onFilterChange?.(key, value);
    else {
      setLocalFilters((prev) => {
        const next = { ...prev, [key]: value };
        onFiltersChange?.(next);
        return next;
      });
    }
  };

  const toggleArray = (key, value) => {
    const arr = Array.isArray(current?.[key]) ? current[key] : [];
    update(key, arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]);
  };

  // Build facets dynamically; if empty for a key, fall back to MASTER_OPTIONS
  const facets = useMemo(() => {
    const map = Object.fromEntries(ALL_KEYS.map((k) => [k, new Set()]));
    const addMany = (set, arr) => Array.isArray(arr) && arr.forEach((v) => v && set.add(v));

    vendors.forEach((v) => {
      ALL_KEYS.forEach((k) => addMany(map[k], v?.[k]));
    });

    const toArr = (s) => Array.from(s).sort((a, b) => String(a).localeCompare(String(b)));

    const built = Object.fromEntries(ALL_KEYS.map((k) => [k, toArr(map[k])]));
    const fallback = MASTER_OPTIONS[serviceType] || {};

    // merge with fallback if vendor-derived options are empty
    for (const k of Object.keys(built)) {
      if ((!built[k] || built[k].length === 0) && Array.isArray(fallback[k])) {
        built[k] = fallback[k];
      }
    }
    return built;
  }, [vendors, serviceType]);

  // Clear incompatible selections when serviceType changes
  useEffect(() => {
    const config = TYPE_CONFIG[serviceType] || [];
    const allowed = new Set(config.map((s) => s.key));
    ALL_KEYS.forEach((k) => {
      if (!allowed.has(k) && (current?.[k]?.length || 0) > 0) update(k, []);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceType]);

  // For uncontrolled, notify parent once initially
  useEffect(() => {
    if (!isControlled) onFiltersChange?.(localFilters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Section = ({ title, keyName, options }) => {
    if (!options || options.length === 0) return null;
    return (
      <div className="filter-group">
        <h4 className="text-sm sm:text-base font-semibold text-gray-700 mb-3">{title}</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
          {options.map((opt) => (
            <label key={opt} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={(current?.[keyName] ?? []).includes(opt)}
                onChange={() => toggleArray(keyName, opt)}
                className="w-4 h-4 sm:w-5 sm:h-5 text-[#CCAB4A] border-gray-300 rounded focus:ring-[#CCAB4A]"
              />
              <span className="text-sm sm:text-base text-gray-700">{opt}</span>
            </label>
          ))}
        </div>
      </div>
    );
  };

  const sections =
    TYPE_CONFIG[serviceType] ||
    Object.keys(facets).map((k) => ({ key: k, title: k.replace(/^\w/, (c) => c.toUpperCase()) }));

  return (
    <div className="secondary-filters space-y-4 sm:space-y-6">
      {sections.map(({ key, title }) => (
        <Section key={key} title={title} keyName={key} options={facets[key]} />
      ))}

      {/* Minimum Rating */}
      <div className="filter-group">
        <h4 className="text-sm sm:text-base font-semibold text-gray-700 mb-3">Minimum Rating</h4>
        <div className="flex items-center flex-wrap gap-3">
          {[4, 3, 2, 1].map((rating) => (
            <label key={rating} className="flex items-center space-x-1 cursor-pointer">
              <input
                type="radio"
                name="minRating"
                checked={Number(current?.minRating ?? NaN) === rating}
                onChange={() => update("minRating", rating)}
                className="w-4 h-4 sm:w-5 sm:h-5 text-[#CCAB4A] border-gray-300 focus:ring-[#CCAB4A]"
              />
              <span className="text-sm sm:text-base text-gray-700">{rating}+</span>
            </label>
          ))}
          <button
            onClick={() => update("minRating", undefined)}
            className="text-xs sm:text-sm underline text-gray-500"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecondaryFilters_ListingPage;
