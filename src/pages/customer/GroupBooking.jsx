import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Users, DollarSign, MapPin, Calendar, Music, Camera, Utensils, X, Plus, CheckCircle, Shield, Award, HeartHandshake, Gift, Check, Minus, Star, Clock, Phone, Mail } from 'lucide-react';
import BasicSpeedDial from '../../components/BasicSpeedDial';

const GroupBookingPage = () => {
  const navigate = useNavigate();
  const [selectedVendors, setSelectedVendors] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');

  const vendorCategories = [
    { id: 'all', name: 'All Vendors', icon: <Calendar className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { id: 'catering', name: 'Catering', icon: <Utensils className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { id: 'photography', name: 'Photography', icon: <Camera className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { id: 'entertainment', name: 'Entertainment', icon: <Music className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { id: 'decoration', name: 'Decoration', icon: <Gift className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { id: 'venue', name: 'Venues', icon: <MapPin className="w-4 h-4 sm:w-5 sm:h-5" /> }
  ];

  const vendors = [
    {
      id: 1,
      name: 'Elegant Events Catering',
      category: 'catering',
      rating: 4.8,
      reviews: 127,
      price: 850,
      priceUnit: 'per person',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop',
      description: 'Premium catering with international cuisine options',
      specialties: ['Italian', 'Continental', 'Indian'],
      availability: 'Available',
      contact: { phone: '+1 (555) 123-4567', email: 'contact@elegantevents.com' }
    },
    {
      id: 2,
      name: 'Golden Lens Photography',
      category: 'photography',
      rating: 4.9,
      reviews: 89,
      price: 1200,
      priceUnit: 'per event',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=300&fit=crop',
      description: 'Professional wedding and event photography',
      specialties: ['Weddings', 'Corporate Events', 'Portraits'],
      availability: 'Available',
      contact: { phone: '+1 (555) 234-5678', email: 'hello@goldenlens.com' }
    },
    {
      id: 3,
      name: 'DJ Soundwave',
      category: 'entertainment',
      rating: 4.7,
      reviews: 156,
      price: 600,
      priceUnit: 'per event',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
      description: 'Professional DJ services with premium sound system',
      specialties: ['Weddings', 'Corporate', 'Birthday Parties'],
      availability: 'Available',
      contact: { phone: '+1 (555) 345-6789', email: 'bookings@djsoundwave.com' }
    },
    {
      id: 4,
      name: 'Bloom Decorations',
      category: 'decoration',
      rating: 4.6,
      reviews: 98,
      price: 450,
      priceUnit: 'per setup',
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=300&fit=crop',
      description: 'Beautiful floral arrangements and event decoration',
      specialties: ['Floral Design', 'Table Settings', 'Lighting'],
      availability: 'Available',
      contact: { phone: '+1 (555) 456-7890', email: 'info@bloomdecorations.com' }
    },
    {
      id: 5,
      name: 'Grand Ballroom',
      category: 'venue',
      rating: 4.8,
      reviews: 67,
      price: 2500,
      priceUnit: 'per day',
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=300&fit=crop',
      description: 'Luxurious ballroom perfect for weddings and corporate events',
      specialties: ['Weddings', 'Corporate Events', 'Galas'],
      availability: 'Available',
      contact: { phone: '+1 (555) 567-8901', email: 'reservations@grandballroom.com' }
    },
    {
      id: 6,
      name: 'Spice Garden Catering',
      category: 'catering',
      rating: 4.5,
      reviews: 203,
      price: 650,
      priceUnit: 'per person',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop',
      description: 'Authentic Indian and Asian cuisine specialists',
      specialties: ['Indian', 'Thai', 'Chinese'],
      availability: 'Limited',
      contact: { phone: '+1 (555) 678-9012', email: 'orders@spicegarden.com' }
    }
  ];

  const filteredVendors = activeCategory === 'all' 
    ? vendors 
    : vendors.filter(vendor => vendor.category === activeCategory);

  const addVendor = (vendor) => {
    if (!selectedVendors.find(v => v.id === vendor.id)) {
      setSelectedVendors([...selectedVendors, { ...vendor, quantity: 1 }]);
    }
  };

  const removeVendor = (vendorId) => {
    setSelectedVendors(selectedVendors.filter(v => v.id !== vendorId));
  };

  const updateQuantity = (vendorId, quantity) => {
    if (quantity === 0) {
      removeVendor(vendorId);
    } else {
      setSelectedVendors(selectedVendors.map(v => 
        v.id === vendorId ? { ...v, quantity } : v
      ));
    }
  };

  const getTotalCost = () => {
    return selectedVendors.reduce((total, vendor) => {
      return total + (vendor.price * vendor.quantity);
    }, 0);
  };

  const isVendorSelected = (vendorId) => {
    return selectedVendors.some(v => v.id === vendorId);
  };

  if (showCheckout) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-rose-100">
        {/* Header */}
        <div className="bg-white shadow-sm px-3 sm:px-6 py-3 sm:py-4">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-orange-400 to-pink-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs sm:text-sm">T</span>
              </div>
              <span className="text-xl sm:text-2xl font-bold text-gray-800">tendr</span>
            </div>
            <div className="flex space-x-2 sm:space-x-4">
              <button className="px-3 sm:px-6 py-1.5 sm:py-2 text-orange-600 border border-orange-600 rounded-full hover:bg-orange-50 transition-colors text-xs sm:text-sm">
                Sign In
              </button>
              <button className="px-3 sm:px-6 py-1.5 sm:py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors text-xs sm:text-sm">
                Sign Up
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-3 sm:px-6 py-6 sm:py-12">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-8">
            <div className="flex items-center mb-6 sm:mb-8">
              <button
                onClick={() => setShowCheckout(false)}
                className="text-gray-600 hover:text-gray-800 mr-3 sm:mr-4"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Review Your Booking</h1>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
              {/* Selected Vendors */}
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">Selected Vendors</h2>
                <div className="space-y-3 sm:space-y-4">
                  {selectedVendors.map((vendor) => (
                    <div key={vendor.id} className="bg-gray-50 rounded-xl p-3 sm:p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-800 text-sm sm:text-base">{vendor.name}</h3>
                        <button
                          onClick={() => removeVendor(vendor.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                      <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3">{vendor.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-orange-600 font-semibold text-sm sm:text-base">
                          ${vendor.price} {vendor.priceUnit}
                        </span>
                        <div className="flex items-center space-x-1 sm:space-x-2">
                          <button
                            onClick={() => updateQuantity(vendor.id, vendor.quantity - 1)}
                            className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600"
                          >
                            <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                          <span className="w-6 sm:w-8 text-center text-sm sm:text-base">{vendor.quantity}</span>
                          <button
                            onClick={() => updateQuantity(vendor.id, vendor.quantity + 1)}
                            className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600"
                          >
                            <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Booking Summary */}
              <div>
                <div className="bg-gradient-to-r from-orange-100 to-pink-100 rounded-xl p-4 sm:p-6">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">Booking Summary</h2>
                  
                  <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                    {selectedVendors.map((vendor) => (
                      <div key={vendor.id} className="flex justify-between">
                        <span className="text-gray-700 text-sm sm:text-base">{vendor.name} x{vendor.quantity}</span>
                        <span className="font-semibold text-sm sm:text-base">${vendor.price * vendor.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-orange-200 pt-3 sm:pt-4 mb-4 sm:mb-6">
                    <div className="flex justify-between text-lg sm:text-xl font-bold text-gray-800">
                      <span>Total</span>
                      <span>${getTotalCost().toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    <input
                      type="text"
                      placeholder="Event Name"
                      className="w-full p-2 sm:p-3 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm sm:text-base"
                    />
                    <input
                      type="date"
                      className="w-full p-2 sm:p-3 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm sm:text-base"
                    />
                    <input
                      type="text"
                      placeholder="Contact Number"
                      className="w-full p-2 sm:p-3 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm sm:text-base"
                    />
                    <textarea
                      placeholder="Special Requirements"
                      rows={3}
                      className="w-full p-2 sm:p-3 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none text-sm sm:text-base"
                    />
                  </div>

                  <button className="w-full mt-4 sm:mt-6 bg-gradient-to-r from-orange-500 to-pink-500 text-white py-3 sm:py-4 rounded-xl hover:from-orange-600 hover:to-pink-600 transition-all duration-300 font-semibold text-base sm:text-lg shadow-lg">
                    Confirm Booking - ${getTotalCost().toLocaleString()}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-rose-100">
      <BasicSpeedDial/>
      {/* Header */}
      <div className="bg-white shadow-sm px-3 sm:px-6 py-3 sm:py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-orange-400 to-pink-400 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs sm:text-sm">T</span>
            </div>
            <span className="text-xl sm:text-2xl font-bold text-gray-800">tendr</span>
          </div>
          <div className="flex space-x-2 sm:space-x-4">
            <button className="px-3 sm:px-6 py-1.5 sm:py-2 text-orange-600 border border-orange-600 rounded-full hover:bg-orange-50 transition-colors text-xs sm:text-sm">
              Sign In
            </button>
            <button className="px-3 sm:px-6 py-1.5 sm:py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors text-xs sm:text-sm">
              Sign Up
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-12">
        {/* Header */}
                 <div className="text-center mb-6 sm:mb-8">
           <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-3 sm:mb-4">
             Booking - Multiple Vendors
           </h1>
           <p className="text-base sm:text-xl text-gray-600 mb-6 sm:mb-8">
             Select multiple vendors for your event and save with our group booking discounts
           </p>
          {selectedVendors.length > 0 && (
            <div className="bg-gradient-to-r from-orange-100 to-pink-100 rounded-xl sm:rounded-2xl p-3 sm:p-4 inline-block">
              <span className="text-orange-800 font-semibold text-sm sm:text-base">
                {selectedVendors.length} vendors selected • Total: ${getTotalCost().toLocaleString()}
              </span>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Sidebar - Categories */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-4 sm:p-6 sticky top-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">Categories</h2>
              <div className="space-y-2">
                {vendorCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-xl transition-colors text-sm sm:text-base ${
                      activeCategory === category.id
                        ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white'
                        : 'text-gray-600 hover:bg-orange-50'
                    }`}
                  >
                    {category.icon}
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>

              {selectedVendors.length > 0 && (
                <div className="mt-6 sm:mt-8">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Selected Vendors</h3>
                  <div className="space-y-2">
                    {selectedVendors.map((vendor) => (
                      <div key={vendor.id} className="flex items-center justify-between p-2 bg-orange-50 rounded-lg">
                        <span className="text-xs sm:text-sm text-gray-700">{vendor.name}</span>
                        <button
                          onClick={() => removeVendor(vendor.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                                     <button
                     onClick={() => setShowCheckout(true)}
                     className="w-full mt-3 sm:mt-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white py-3 sm:py-4 rounded-xl hover:from-orange-600 hover:to-pink-600 transition-all duration-300 font-semibold text-base sm:text-lg"
                   >
                     Review Booking ({selectedVendors.length})
                   </button>
                </div>
              )}
            </div>
          </div>

          {/* Main Content - Vendor Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {filteredVendors.map((vendor) => (
                <div key={vendor.id} className="bg-white rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative">
                    <img
                      src={vendor.image}
                      alt={vendor.name}
                      className="w-full h-40 sm:h-48 object-cover"
                    />
                    <div className={`absolute top-2 sm:top-4 right-2 sm:right-4 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${
                      vendor.availability === 'Available' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {vendor.availability}
                    </div>
                  </div>

                  <div className="p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-800">{vendor.name}</h3>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                        <span className="text-xs sm:text-sm text-gray-600">{vendor.rating}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4">{vendor.description}</p>

                    <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                      {vendor.specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className="px-2 sm:px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs sm:text-sm"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center space-x-2 sm:space-x-4 mb-3 sm:mb-4 text-xs sm:text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{vendor.contact.phone}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="text-xl sm:text-2xl font-bold text-orange-600">
                          ${vendor.price}
                        </span>
                        <span className="text-gray-600 text-xs sm:text-sm ml-1">
                          {vendor.priceUnit}
                        </span>
                      </div>

                      {isVendorSelected(vendor.id) ? (
                        <div className="flex items-center space-x-1 sm:space-x-2">
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                          <span className="text-green-600 font-semibold text-sm sm:text-base">Added</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => addVendor(vendor)}
                          className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-xl hover:from-orange-600 hover:to-pink-600 transition-all duration-300 font-semibold text-xs sm:text-sm"
                        >
                          Add to Booking
                        </button>
                      )}
                    </div>

                    <button
                      onClick={() => navigate(`/vendor/${vendor.id}`, { state: { vendor } })}
                      className="w-full text-orange-600 border border-orange-600 py-1.5 sm:py-2 rounded-xl hover:bg-orange-50 transition-colors font-semibold text-xs sm:text-sm"
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupBookingPage;