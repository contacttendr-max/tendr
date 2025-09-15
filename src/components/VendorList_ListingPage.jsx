// src/components/VendorList_ListingPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const VendorList_ListingPage = ({
  eventType,
  serviceType,
  date,
  locationType,
  guestCount,
  vendors = [],
  paginationInfo = {},
  currentPage = 1,
  handleShowMore,
  isLoading,
  sortBy,
  sortOrder,
  setSortBy,
  setSortOrder,
  // NEW props
  compareSelected = [],
  onToggleCompare,
}) => {
  const navigate = useNavigate();

  const handleCardClick = (vendorId) => {
    // ✅ SPA navigation (no full reload, Redux state stays intact)
    navigate(`/vendor/${vendorId}`, {
      state: {
        from: "listing",
        filters: {
          eventType,
          serviceType,
          locationType,
          date,
          guestCount,
          sortBy,
          sortOrder,
        },
      },
    });
  };

  return (
    <div className="flex flex-col min-h-full">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur supports-[backdrop-filter]:backdrop-blur border-b border-gray-100">
        <div className="mx-auto w-full max-w-7xl px-3 sm:px-5">
          <div className="flex flex-col gap-3 py-4 sm:py-5 lg:py-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
              {/* Left */}
              <div className="leading-7">
                <div className="text-xs sm:text-sm font-semibold text-gray-700">
                  Top picks for
                </div>
                <div className="mt-1 text-xl sm:text-2xl lg:text-[26px] font-bold text-gray-900">
                  <span>{eventType}</span>, <span>{serviceType}</span>,{" "}
                  <span>{locationType}</span>, <span>{date}</span>,{" "}
                  <span>{guestCount} guests</span>
                </div>

                {/* Filter summary chips */}
                <div className="mt-2 flex flex-wrap gap-2">
                  {[eventType, serviceType, locationType, date, `${guestCount} guests`]
                    .filter(Boolean)
                    .map((chip, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center rounded-full border border-[#CCAB4A]/50 bg-white px-2.5 py-1 text-xs font-medium text-gray-700"
                      >
                        {chip}
                      </span>
                    ))}
                </div>
              </div>

              {/* Right: Sort controls */}
              <div className="flex items-center gap-2 md:gap-3">
                <label className="text-xs sm:text-sm font-semibold text-gray-700">
                  Sort by:
                </label>
                <div className="flex items-center gap-2">
                  <select
                    aria-label="Sort field"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="rounded-full border px-4 py-2 text-xs sm:text-sm border-[#CCAB4A] bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#CCAB4A]/40"
                  >
                    <option value="rankingScore">Best Match</option>
                    <option value="rating">Rating</option>
                    <option value="price">Price</option>
                    <option value="experience">Experience</option>
                  </select>
                  <select
                    aria-label="Sort order"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="rounded-full border px-4 py-2 text-xs sm:text-sm border-[#CCAB4A] bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#CCAB4A]/40"
                  >
                    <option value="desc">High to Low</option>
                    <option value="asc">Low to High</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content container */}
      <div className="mx-auto w-full max-w-7xl px-3 sm:px-5">
        {/* Vendor Cards */}
        <div className="vendor-list">
          {isLoading ? (
            // Skeleton grid—keeps layout stable
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 py-8">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse rounded-lg border border-gray-100 bg-white p-3 sm:p-4"
                >
                  <div className="aspect-[16/10] w-full rounded-md bg-gray-200" />
                  <div className="mt-3 h-4 w-3/4 rounded bg-gray-200" />
                  <div className="mt-2 h-3 w-1/2 rounded bg-gray-200" />
                  <div className="mt-4 flex items-center justify-between">
                    <div className="h-3 w-24 rounded bg-gray-200" />
                    <div className="h-3 w-16 rounded bg-gray-200" />
                  </div>
                </div>
              ))}
            </div>
          ) : vendors.length === 0 ? (
            <div className="py-16 text-center">
              <div className="mx-auto mb-3 h-12 w-12 rounded-full border border-dashed border-[#CCAB4A] flex items-center justify-center">
                <svg
                  className="h-6 w-6 text-[#CCAB4A]"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 5v14m-7-7h14"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <p className="text-sm sm:text-base text-gray-600">
                No vendors found matching your criteria.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 py-6">
              {vendors.map((vendor, index) => {
                const isSelected = compareSelected.some((v) => v._id === vendor._id);

                return (
                  <div
                    key={vendor._id || index}
                    role="button"
                    tabIndex={0}
                    onClick={() => handleCardClick(vendor._id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") handleCardClick(vendor._id);
                    }}
                    className="group vendor-card bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 cursor-pointer overflow-hidden"
                  >
                    {/* Vendor Image */}
                    <div className="relative">
                      <div className="aspect-[16/10] w-full overflow-hidden bg-gray-50">
                        <img
                          src={vendor.image || "/src/assets/GrayDummyPhoto.jpg"}
                          alt={vendor.name}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                          loading="lazy"
                        />
                      </div>

                      {/* Verified badge */}
                      {vendor.isVerified && (
                        <div className="absolute top-2 right-2 rounded-full bg-green-500 text-white p-1.5 shadow">
                          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Vendor Info */}
                    <div className="p-3 sm:p-4">
                      <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-1 line-clamp-1">
                        {vendor.name}
                      </h3>

                      <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-1">
                        {vendor.location}
                      </p>

                      {/* Rating */}
                      <div className="flex items-center mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                                i < Math.floor(vendor.rating || 0)
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                              aria-hidden="true"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-xs sm:text-sm text-gray-600 ml-1">
                          ({vendor.number_of_reviews || 0} reviews)
                        </span>
                      </div>

                      {/* Price & Type */}
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm font-semibold text-[#CCAB4A]">
                          Starting from ₹{vendor.price ?? "N/A"}
                        </span>
                        <span className="text-[11px] sm:text-xs text-gray-500">
                          {vendor.serviceType}
                        </span>
                      </div>

                      {/* Compare toggle */}
                      <div className="mt-4 flex justify-end">
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // ✅ don't navigate when comparing
                            onToggleCompare?.(vendor);
                          }}
                          className={`text-xs sm:text-sm px-3 py-1.5 rounded-full border transition-colors ${
                            isSelected
                              ? "bg-[#CCAB4A] text-white border-[#CCAB4A]"
                              : "bg-white text-gray-700 border-gray-200 hover:border-[#CCAB4A]/60"
                          } focus:outline-none focus:ring-2 focus:ring-[#CCAB4A]/40`}
                          title="Select two vendors to compare"
                          aria-pressed={isSelected}
                        >
                          {isSelected ? "Selected" : "Compare"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Show More */}
        {paginationInfo?.totalPages > currentPage && (
          <div className="flex justify-center mt-4 sm:mt-6 mb-10">
            <button
              type="button"
              onClick={handleShowMore}
              disabled={isLoading}
              className={`rounded-full shadow-sm px-6 py-2.5 font-semibold border border-[#CCAB4A] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#CCAB4A]/30 ${
                isLoading ? "opacity-60 cursor-not-allowed" : "hover:-translate-y-0.5 hover:shadow-md"
              }`}
            >
              {isLoading ? "Loading..." : "Show More"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorList_ListingPage;
