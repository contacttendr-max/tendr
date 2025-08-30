import React, { useState, useEffect } from 'react';
import { 
  FiCalendar, 
  FiUsers, 
  FiDollarSign, 
  FiStar, 
  FiCheck, 
  FiPlus, 
  FiSearch, 
  FiFilter,
  FiClock,
  FiMapPin,
  FiPhone,
  FiMail,
  FiEdit,
  FiTrash2,
  FiEye,
  FiDownload,
  FiBell,
  FiSettings,
  FiLogOut,
  FiTrendingUp,
  FiAward,
  FiGift,
  FiCamera,
  FiMusic,
  FiCoffee,  
  // FiUtensils,
  FiMenu,
  FiX
} from 'react-icons/fi';
import EventCreationModal from '../../components/EventCreationModal';

const CorporateDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showEventModal, setShowEventModal] = useState(false);
  const [corporateData, setCorporateData] = useState(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    // Load corporate data from localStorage
    const savedData = localStorage.getItem('corporatePlan');
    if (savedData) {
      setCorporateData(JSON.parse(savedData));
    }
  }, []);

  const mockEvents = [
    {
      id: 1,
      name: "Diwali Celebration 2024",
      date: "2024-11-12",
      status: "upcoming",
      type: "Festival Party",
      attendees: 150,
      budget: 45000,
      vendors: [
        { id: 1, name: "Elegant Events Catering", category: "catering", status: "confirmed" },
        { id: 2, name: "Golden Lens Photography", category: "photography", status: "confirmed" },
        { id: 3, name: "DJ Soundwave", category: "entertainment", status: "pending" }
      ],
      addons: ["Custom Memorabilia", "Professional After Movie"],
      coordinator: "Priya Sharma",
      location: "Office Premises"
    },
    {
      id: 2,
      name: "Monthly Birthday Bash",
      date: "2024-10-25",
      status: "completed",
      type: "Team Celebration",
      attendees: 45,
      budget: 18000,
      vendors: [
        { id: 4, name: "Bloom Decorations", category: "decoration", status: "completed" },
        { id: 6, name: "Spice Garden Catering", category: "catering", status: "completed" }
      ],
      addons: ["Customized Invitation Flyer"],
      coordinator: "Rajesh Kumar",
      location: "Conference Hall"
    },
    {
      id: 3,
      name: "Q4 Team Outing",
      date: "2024-12-15",
      status: "planning",
      type: "Team Outing",
      attendees: 80,
      budget: 60000,
      vendors: [],
      addons: [],
      coordinator: "Anita Patel",
      location: "Resort & Spa"
    }
  ];

  const mockVendors = [
    {
      id: 1,
      name: "Elegant Events Catering",
      category: "catering",
      rating: 4.8,
      reviews: 127,
      price: 850,
      priceUnit: "per person",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
      description: "Premium catering with international cuisine options",
      specialties: ["Italian", "Continental", "Indian"],
      availability: "Available"
    },
    {
      id: 2,
      name: "Golden Lens Photography",
      category: "photography",
      rating: 4.9,
      reviews: 89,
      price: 1200,
      priceUnit: "per event",
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=300&fit=crop",
      description: "Professional wedding and event photography",
      specialties: ["Weddings", "Corporate Events", "Portraits"],
      availability: "Available"
    },
    {
      id: 3,
      name: "DJ Soundwave",
      category: "entertainment",
      rating: 4.7,
      reviews: 156,
      price: 600,
      priceUnit: "per event",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
      description: "Professional DJ services with premium sound system",
      specialties: ["Weddings", "Corporate", "Birthday Parties"],
      availability: "Available"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'planning': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getVendorIcon = (category) => {
    switch (category) {
      case 'catering': return <FiUtensils className="w-4 h-4" />;
      case 'photography': return <FiCamera className="w-4 h-4" />;
      case 'entertainment': return <FiMusic className="w-4 h-4" />;
      case 'decoration': return <FiGift className="w-4 h-4" />;
      default: return <FiStar className="w-4 h-4" />;
    }
  };

  const calculateSavings = () => {
    const completedEvents = mockEvents.filter(event => event.status === 'completed');
    const totalSpent = completedEvents.reduce((sum, event) => sum + event.budget, 0);
    const traditionalCost = completedEvents.length * 5000; // Traditional agency cost per event
    return traditionalCost - totalSpent;
  };

  const handleEventSubmit = (eventData) => {
    // Add the new event to the mock events
    const newEvent = {
      ...eventData,
      id: mockEvents.length + 1,
      status: 'planning'
    };
    // In a real app, this would be an API call
    console.log('New event created:', newEvent);
    setShowEventModal(false);
  };

  const renderOverview = () => (
    <div className="space-y-4 sm:space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <div className="bg-white p-3 sm:p-6 rounded-2xl shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-600">Total Events</p>
              <p className="text-lg sm:text-2xl font-bold text-gray-800">{mockEvents.length}</p>
            </div>
            <FiCalendar className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" />
          </div>
        </div>
        
        <div className="bg-white p-3 sm:p-6 rounded-2xl shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-600">Total Attendees</p>
              <p className="text-lg sm:text-2xl font-bold text-gray-800">
                {mockEvents.reduce((sum, event) => sum + event.attendees, 0)}
              </p>
            </div>
            <FiUsers className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white p-3 sm:p-6 rounded-2xl shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-600">Total Spent</p>
              <p className="text-lg sm:text-2xl font-bold text-gray-800">
                ₹{mockEvents.reduce((sum, event) => sum + event.budget, 0).toLocaleString()}
              </p>
            </div>
            <FiDollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white p-3 sm:p-6 rounded-2xl shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-600">Annual Savings</p>
              <p className="text-lg sm:text-2xl font-bold text-green-600">
                ₹{calculateSavings().toLocaleString()}
              </p>
            </div>
            <FiTrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
          </div>
        </div>
      </div>

      {/* Recent Events */}
      <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h3 className="text-lg sm:text-xl font-bold text-gray-800">Recent Events</h3>
          <button 
            onClick={() => setShowEventModal(true)}
            className="flex items-center gap-1 sm:gap-2 bg-orange-500 text-white px-3 sm:px-4 py-2 rounded-xl hover:bg-orange-600 transition-colors text-xs sm:text-sm"
          >
            <FiPlus className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">New Event</span>
            <span className="sm:hidden">New</span>
          </button>
        </div>
        
        <div className="space-y-3 sm:space-y-4">
          {mockEvents.slice(0, 3).map((event) => (
            <div key={event.id} className="border border-gray-200 rounded-xl p-3 sm:p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2">
                    <h4 className="font-semibold text-gray-800 text-sm sm:text-base truncate">{event.name}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ${getStatusColor(event.status)}`}>
                      {event.status}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs sm:text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <FiCalendar className="w-3 h-3 sm:w-4 sm:h-4" />
                      {new Date(event.date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiUsers className="w-3 h-3 sm:w-4 sm:h-4" />
                      {event.attendees} attendees
                    </span>
                    <span className="flex items-center gap-1">
                      <FiDollarSign className="w-3 h-3 sm:w-4 sm:h-4" />
                      ₹{event.budget.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 sm:gap-2 ml-2">
                  <button 
                    onClick={() => console.log('Viewing event:', event)}
                    className="p-1 sm:p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <FiEye className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                  <button className="p-1 sm:p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                    <FiEdit className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderEvents = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h3 className="text-lg sm:text-xl font-bold text-gray-800">All Events</h3>
        <button 
          onClick={() => setShowEventModal(true)}
          className="flex items-center gap-1 sm:gap-2 bg-orange-500 text-white px-3 sm:px-4 py-2 rounded-xl hover:bg-orange-600 transition-colors text-xs sm:text-sm"
        >
          <FiPlus className="w-3 h-3 sm:w-4 sm:h-4" />
          Create New Event
        </button>
      </div>
      
      <div className="grid gap-4 sm:gap-6">
        {mockEvents.map((event) => (
          <div key={event.id} className="bg-white rounded-2xl shadow-md p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3 sm:mb-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <h4 className="text-lg sm:text-xl font-bold text-gray-800 truncate">{event.name}</h4>
                  <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium flex-shrink-0 ${getStatusColor(event.status)}`}>
                    {event.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{event.type} • {event.location}</p>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-3 sm:mb-4">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <FiCalendar className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                    <span className="text-xs sm:text-sm text-gray-700">{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <FiUsers className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                    <span className="text-xs sm:text-sm text-gray-700">{event.attendees} attendees</span>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <FiDollarSign className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                    <span className="text-xs sm:text-sm text-gray-700">₹{event.budget.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <FiClock className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                    <span className="text-xs sm:text-sm text-gray-700">{event.vendors.length} vendors</span>
                  </div>
                </div>
                
                {event.vendors.length > 0 && (
                  <div className="mb-3 sm:mb-4">
                    <h5 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">Vendors:</h5>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {event.vendors.map((vendor) => (
                        <div key={vendor.id} className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-lg">
                          {getVendorIcon(vendor.category)}
                          <span className="text-xs sm:text-sm text-gray-700 truncate max-w-20 sm:max-w-none">{vendor.name}</span>
                          <span className={`w-2 h-2 rounded-full ${
                            vendor.status === 'confirmed' ? 'bg-green-500' : 
                            vendor.status === 'pending' ? 'bg-yellow-500' : 'bg-gray-500'
                          }`}></span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {event.addons.length > 0 && (
                  <div>
                    <h5 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">Add-ons:</h5>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {event.addons.map((addon, index) => (
                        <span key={index} className="bg-orange-100 text-orange-800 px-2 py-1 rounded-lg text-xs sm:text-sm">
                          {addon}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-1 sm:gap-2 mt-3 sm:mt-0 sm:ml-4">
                <button className="p-1 sm:p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <FiEye className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
                <button className="p-1 sm:p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                  <FiEdit className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
                <button className="p-1 sm:p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <FiTrash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderVendors = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h3 className="text-lg sm:text-xl font-bold text-gray-800">Recommended Vendors</h3>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search vendors..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm w-full"
            />
          </div>
          <button className="flex items-center gap-1 sm:gap-2 border border-gray-300 px-3 sm:px-4 py-2 rounded-xl hover:bg-gray-50 transition-colors text-sm">
            <FiFilter className="w-4 h-4" />
            <span className="hidden sm:inline">Filter</span>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {mockVendors.map((vendor) => (
          <div key={vendor.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <img
              src={vendor.image}
              alt={vendor.name}
              className="w-full h-32 sm:h-48 object-cover"
            />
            <div className="p-3 sm:p-6">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-gray-800 text-sm sm:text-base truncate">{vendor.name}</h4>
                <div className="flex items-center gap-1">
                  <FiStar className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                  <span className="text-xs sm:text-sm text-gray-600">{vendor.rating}</span>
                </div>
              </div>
              
              <p className="text-gray-600 text-xs sm:text-sm mb-3 line-clamp-2">{vendor.description}</p>
              
              <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                {vendor.specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="text-lg sm:text-xl font-bold text-orange-600">₹{vendor.price}</span>
                  <span className="text-gray-600 text-xs sm:text-sm ml-1">{vendor.priceUnit}</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  vendor.availability === 'Available' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {vendor.availability}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="flex-1 bg-orange-500 text-white py-2 rounded-xl hover:bg-orange-600 transition-colors text-xs sm:text-sm">
                  Book Now
                </button>
                <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <FiEye className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSubscription = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">Current Subscription</h3>
        
        {corporateData && (
          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-orange-100 to-pink-100 rounded-xl">
              <div>
                <h4 className="font-bold text-gray-800 text-sm sm:text-base">{corporateData.plan}</h4>
                <p className="text-xs sm:text-sm text-gray-600">Active since {new Date(corporateData.signupDate).toLocaleDateString()}</p>
              </div>
              <div className="text-right mt-2 sm:mt-0">
                <p className="text-lg sm:text-2xl font-bold text-orange-600">
                  {corporateData.plan === 'Basic Plan' ? 'Free' : '₹12,000/year'}
                </p>
                <p className="text-xs sm:text-sm text-gray-600">Next billing: Dec 2024</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="p-3 sm:p-4 border border-gray-200 rounded-xl">
                <h5 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">Company Details</h5>
                <div className="space-y-1 text-xs sm:text-sm text-gray-600">
                  <p><strong>Name:</strong> {corporateData.companyName}</p>
                  <p><strong>Location:</strong> {corporateData.location}</p>
                  <p><strong>Industry:</strong> {corporateData.industry}</p>
                  <p><strong>Team Size:</strong> {corporateData.teamSize}</p>
                </div>
              </div>
              
              <div className="p-3 sm:p-4 border border-gray-200 rounded-xl">
                <h5 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">Contact Person</h5>
                <div className="space-y-1 text-xs sm:text-sm text-gray-600">
                  <p><strong>Name:</strong> {corporateData.personName}</p>
                  <p><strong>Designation:</strong> {corporateData.designation}</p>
                  <p><strong>Email:</strong> {corporateData.email}</p>
                  <p><strong>Phone:</strong> {corporateData.phone}</p>
                </div>
              </div>
            </div>
            
            {corporateData.coupon && (
              <div className="p-3 sm:p-4 bg-green-100 rounded-xl">
                <h5 className="font-semibold text-green-800 mb-2 text-sm sm:text-base">Special Discount Code</h5>
                <p className="text-green-700 font-mono text-sm">{corporateData.coupon}</p>
                <p className="text-xs sm:text-sm text-green-600 mt-1">Use this code for additional discounts on your first booking</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm px-3 sm:px-6 py-3 sm:py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-orange-400 to-pink-400 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs sm:text-sm">T</span>
            </div>
            <span className="text-xl sm:text-2xl font-bold text-gray-800">tendr</span>
            <span className="text-xs sm:text-sm text-gray-500 hidden sm:inline">Corporate</span>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button className="p-1 sm:p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
              <FiBell className="w-4 h-5 sm:w-5 sm:h-5" />
            </button>
            <button className="p-1 sm:p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
              <FiSettings className="w-4 h-5 sm:w-5 sm:h-5" />
            </button>
            <button className="p-1 sm:p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
              <FiLogOut className="w-4 h-5 sm:w-5 sm:h-5" />
            </button>
            <button 
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="lg:hidden p-1 sm:p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {showMobileMenu ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-8">
        {/* Welcome Section */}
        <div className="mb-4 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">
            Welcome back, {corporateData?.personName || 'User'}!
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Manage your corporate events, vendors, and subscriptions all in one place.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-md p-2 mb-4 sm:mb-8">
          <div className={`flex ${showMobileMenu ? 'flex-col' : 'flex-row'} space-y-2 sm:space-y-0 sm:space-x-2`}>
            {[
              { id: 'overview', label: 'Overview', icon: FiTrendingUp },
              { id: 'events', label: 'Events', icon: FiCalendar },
              { id: 'vendors', label: 'Vendors', icon: FiUsers },
              { id: 'subscription', label: 'Subscription', icon: FiAward }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setShowMobileMenu(false);
                }}
                className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl transition-colors text-xs sm:text-sm ${
                  activeTab === tab.id
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4 sm:space-y-6">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'events' && renderEvents()}
          {activeTab === 'vendors' && renderVendors()}
          {activeTab === 'subscription' && renderSubscription()}
        </div>
      </div>

      {/* Event Creation Modal */}
      <EventCreationModal
        isOpen={showEventModal}
        onClose={() => setShowEventModal(false)}
        onSubmit={handleEventSubmit}
        corporateData={corporateData}
      />
    </div>
  );
};

export default CorporateDashboard; 
