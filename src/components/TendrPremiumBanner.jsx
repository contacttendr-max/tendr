import React from 'react';
import { FiCheck, FiStar, FiUsers, FiCalendar, FiTruck, FiAward, FiGift } from 'react-icons/fi';

const TendrPremiumBanner = () => {
  return (
    <div className="w-full bg-[#FFF8DC] py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Section - Main Promotional Area */}
          <div className="space-y-8">
            {/* Headline */}
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
                Upgrade Corporate Events with{' '}
                <span className="text-amber-500">Tendr Premium</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Plan smarter — save time, eliminate vendor stress, and make your office events look exceptional. Starting at under ₹2000/month.
              </p>
            </div>

            {/* Key Benefits */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FiCheck className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Save 12+ hours — focus on real HR work</span>
              </div>
              <div className="flex items-start gap-3">
                <FiCheck className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Save ₹25,000+ annually vs. agencies</span>
              </div>
              <div className="flex items-start gap-3">
                <FiCheck className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <span className="text-gray-700">No vendor stress — we handle it all</span>
              </div>
              <div className="flex items-start gap-3">
                <FiCheck className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Professional results that wow teams</span>
              </div>
              <div className="flex items-start gap-3">
                <FiCheck className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Easy budget approval — under ₹2000/month</span>
              </div>
            </div>

            {/* Call to Action Button */}
            <button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-200 hover:scale-105 shadow-lg">
              Go Premium ↓
            </button>
          </div>

          {/* Right Section - Information Panels */}
          <div className="space-y-6">
            {/* Top Panel - Perfect For */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Perfect For:</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <FiStar className="w-5 h-5 text-yellow-500" />
                  <span className="text-gray-700">Diwali / Festival Parties</span>
                </div>
                <div className="flex items-center gap-3">
                  <FiAward className="w-5 h-5 text-amber-500" />
                  <span className="text-gray-700">Achievement Recognition Events</span>
                </div>
                <div className="flex items-center gap-3">
                  <FiTruck className="w-5 h-5 text-blue-500" />
                  <span className="text-gray-700">Quarterly Team Outings</span>
                </div>
                <div className="flex items-center gap-3">
                  <FiGift className="w-5 h-5 text-pink-500" />
                  <span className="text-gray-700">Monthly Birthday Events</span>
                </div>
                <div className="flex items-center gap-3">
                  <FiUsers className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Team Celebrations</span>
                </div>
              </div>
            </div>

            {/* Bottom Panel - Key Metrics */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-800 mb-1">80%</div>
                  <div className="text-sm text-gray-600">Less planning effort vs traditional process</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-800 mb-1">12+ hrs</div>
                  <div className="text-sm text-gray-600">Saved per event by HRs and Admins</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-800 mb-1">₹25,000+</div>
                  <div className="text-sm text-gray-600">Saved yearly vs. agency costs</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-800 mb-1">100%</div>
                  <div className="text-sm text-gray-600">Vendor coordination handled by us</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TendrPremiumBanner;
