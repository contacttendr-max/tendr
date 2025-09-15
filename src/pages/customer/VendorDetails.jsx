import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import ListingsNav from "../../components/ListingsNav";

import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";

import { Heart, Share, Star, Hourglass, CheckCircle2, MapPin, Users, Trophy, Phone } from "lucide-react";

import main1 from "../../assets/vendor-details/main-1.avif";
import main2 from "../../assets/vendor-details/main-2.avif";
import main3 from "../../assets/vendor-details/main-3.avif";
import main4 from "../../assets/vendor-details/main-4.avif";
import main5 from "../../assets/vendor-details/main-5.avif";

import { getVendorById } from "../../apis/vendorApi";
import BasicSpeedDial from "../../components/BasicSpeedDial";
import { useSelector } from "react-redux";

const VendorDetailsPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  // If navigated from listings
  const vendorFromState = location.state?.vendor;

  useEffect(() => {
    const fetchVendorData = async () => {
      try {
        setLoading(true);
        setError(null);

        let vendorData;
        if (vendorFromState) {
          vendorData = vendorFromState;
        } else if (id) {
          const response = await getVendorById(id);
          vendorData = response.vendor || response;
        } else {
          throw new Error("No vendor ID provided");
        }

        setVendor(vendorData);
      } catch (err) {
        console.error("Error fetching vendor data:", err);
        setError(err.message || "Failed to load vendor details");
      } finally {
        setLoading(false);
      }
    };

    fetchVendorData();
  }, [id, vendorFromState]);

  // ===== Helpers =====
  const rating = useMemo(() => {
    // API gives avgReviewScore (0–5). Fallback to 4.9 when nothing yet.
    const r = Number(vendor?.avgReviewScore);
    return Number.isFinite(r) && r > 0 ? r : 4.9;
  }, [vendor]);

  const ratingStars = useMemo(() => {
    const filled = Math.round(rating);
    return [...Array(5)].map((_, i) => (
      <Star key={i} size={12} fill={i < filled ? "black" : "transparent"} stroke="black" />
    ));
  }, [rating]);

  const coverImages = useMemo(() => {
    // Prefer API portfolioPhotos if present; else use local fallbacks
    const apiPhotos = (vendor?.portfolioPhotos || []).filter(Boolean);
    const first = apiPhotos[0] || main1;
    const smalls = apiPhotos.slice(1, 5);
    while (smalls.length < 4) {
      smalls.push([main2, main3, main4, main5][smalls.length]); // pad with defaults
    }
    return { first, smalls };
  }, [vendor]);

  const primaryCity = vendor?.address?.city || vendor?.location || vendor?.locations?.[0] || "Location";
  const stateName = vendor?.address?.state || "";
  const serviceType = vendor?.serviceType || "Service";
  const yearsOfExperience = vendor?.yearsOfExperience ?? null;
  const teamSize = vendor?.teamSize ?? null;
  const totalEventsCompleted = vendor?.totalEventsCompleted ?? null;
  const maxConcurrentEvents = vendor?.maxConcurrentEvents ?? null;

  const isPhoneVerified = !!vendor?.phoneVerified;

  const filtersData = {
    guest: useSelector((state) => state.eventPlanning.formData.guests),
    location: useSelector((state) => state.eventPlanning.formData.location),
    date: useSelector((state) => state.eventPlanning.formData.date),
    // time: useSelector((state) => state.eventPlanning.formData.time),
    foodType: useSelector((state) => state.eventPlanning.formData.location),
    decorTheme: useSelector((state) => state.eventPlanning.formData.additionalInfo),
    budget : useSelector((state) => state.eventPlanning.formData.budget),
    eventType : useSelector((state) => state.eventPlanning.formData.eventType)
  };

  // ===== DO NOT CHANGE PAYMENT/CHAT/DBOARD per your instruction =====
  const handlePayment = async () => {
    try {
      const totalAmount = 10000;
      const conversationId = "YOUR_CONVERSATION_ID";

      const res = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversationId, totalAmount }),
      });

      const { orderId, amount, currency } = await res.json();

      const options = {
        key: "rzp_test_YOUR_KEY_HERE",
        amount,
        currency,
        name: "Tendr",
        description: "Event Booking Payment",
        order_id: orderId,
        handler: function (response) {
          console.log("Payment successful:", response);
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999",
        },
        theme: { color: "#CCAB4A" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-semibold text-gray-600">Loading vendor details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-semibold text-red-600 mb-4">Error loading vendor</div>
          <div className="text-gray-600 mb-4">{error}</div>
          <button
            onClick={() => navigate("/listings")}
            className="px-6 py-2 bg-[#CCAB4A] text-white rounded-xl hover:bg-[#ab8f39]"
          >
            Back to Listings
          </button>
        </div>
      </div>
    );
  }

  if (!vendor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-semibold text-gray-600 mb-4">Vendor not found</div>
          <div className="text-gray-600 mb-4">The vendor you're looking for doesn't exist or has been removed.</div>
          <button
            onClick={() => navigate("/listings")}
            className="px-6 py-2 bg-[#CCAB4A] text-white rounded-xl hover:bg-[#ab8f39]"
          >
            Back to Listings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white text-black">
      <BasicSpeedDial />
      {/* Navbar */}
      <div className="navbar border-b-[1px] border-[#CCAB4A]">
        <ListingsNav />
      </div>

      {/* Page Content Container */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title, Share and Save */}
        <div className="flex items-center justify-between py-7">
          {/* Title */}
          <div className="flex flex-col">
            <h1 className="text-2xl md:text-3xl lg:text-4xl break-words">
              {vendor.name || "Vendor Name"}
            </h1>
            <div className="mt-2 flex items-center gap-2 text-gray-700">
              <MapPin className="w-4 h-4" />
              <span className="text-sm md:text-base">
                Located in {primaryCity}
                {stateName ? `, ${stateName}` : ""}
              </span>
            </div>
          </div>

          {/* Share and Save */}
          <div className="flex w-[180px] justify-between">
            <button className="flex justify-center items-center gap-[6px] leading-none text-sm bg-black w-[78px] rounded-full h-8 transition-all duration-300 text-white font-semibold hover:-translate-y-1 hover:scale-110">
              <Share size={16} />
              <span>Share</span>
            </button>
            <button className="flex justify-center items-center gap-[6px] leading-none text-sm bg-black w-[78px] rounded-full h-8 transition-all duration-300 text-white font-semibold hover:-translate-y-1 hover:scale-110">
              <Heart size={16} />
              <span>Save</span>
            </button>
          </div>
        </div>

        {/* Gallery */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {/* Main Image */}
          <div className="relative h-[400px] w-full rounded-l-xl overflow-hidden group cursor-pointer">
            <img
              src={coverImages.first}
              alt="Main cover"
              className="h-full w-full object-cover"
              onLoad={() => setIsLoaded(true)}
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
          </div>

          {/* Small Grid Images */}
          <div className="grid grid-cols-2 gap-3">
            {coverImages.smalls.map((img, idx) => {
              let rounding = "";
              if (idx === 1) rounding = "rounded-tr-xl";
              if (idx === 3) rounding = "rounded-br-xl";
              return (
                <div
                  key={idx}
                  className={`relative h-[195px] w-full overflow-hidden group cursor-pointer ${rounding}`}
                >
                  <img
                    src={img}
                    alt={`Gallery ${idx + 2}`}
                    className="h-full w-full object-cover"
                    onLoad={() => setIsLoaded(true)}
                  />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Top Meta & Booking */}
        <div className="flex flex-col lg:flex-row justify-between gap-8 py-10">
          {/* Left: Vendor Info */}
          <div className="lg:w-2/3">
            {/* Quick Facts Pill */}
            <div className="inline-flex items-stretch min-h-16 text-black rounded-3xl border-[1px] border-[#CCAB4A] mt-2 overflow-hidden">
              {/* Rating */}
              <div className="flex flex-col justify-center items-center px-6 py-3 gap-1 bg-white">
                <span className="font-semibold text-lg">{rating.toFixed(1)}</span>
                <div className="flex gap-[1px]">{ratingStars}</div>
                <div className="text-xs text-gray-600 mt-1">Average rating</div>
              </div>

              <div className="w-px bg-[#CCAB4A]" />

              {/* Experience */}
              <div className="flex flex-col justify-center items-center px-6 py-3">
                <span className="font-semibold text-lg">{yearsOfExperience ?? "—"}</span>
                <div className="text-xs text-gray-600">Years of experience</div>
              </div>

              <div className="w-px bg-[#CCAB4A]" />

              {/* Team Size */}
              <div className="flex flex-col justify-center items-center px-6 py-3">
                <span className="font-semibold text-lg">{teamSize ?? "—"}</span>
                <div className="text-xs text-gray-600">Team size</div>
              </div>

              <div className="w-px bg-[#CCAB4A]" />

              {/* Events Done */}
              <div className="flex flex-col justify-center items-center px-6 py-3">
                <span className="font-semibold text-lg">{totalEventsCompleted ?? "—"}</span>
                <div className="text-xs text-gray-600">Events completed</div>
              </div>
            </div>

            {/* Badges */}
            <div className="mt-4 flex flex-wrap gap-2">
              {isPhoneVerified && (
                <span className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full border border-emerald-500 text-emerald-700 bg-emerald-50">
                  <CheckCircle2 className="w-3 h-3" /> Phone verified
                </span>
              )}

              {maxConcurrentEvents != null && (
                <span className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full border border-amber-500 text-amber-700 bg-amber-50">
                  <Users className="w-3 h-3" /> {maxConcurrentEvents} events concurrently
                </span>
              )}
              {serviceType && (
                <span className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full border border-[#CCAB4A] text-[#7a6527] bg-[#fffaea]">
                  <Trophy className="w-3 h-3" /> {serviceType}
                </span>
              )}
            </div>

            {/* Description block */}
            <p className="text-xl text-gray-700 mt-6">
              {/* No description from API right now — keep a classy default */}
              We offer premium {serviceType?.toLowerCase() || "event"} services with an unwavering commitment to quality,
              sophistication, and detail. From weddings to corporate gatherings, our team curates unforgettable
              experiences end‑to‑end.
            </p>

            {/* Contact & Service Areas */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* <div className="rounded-2xl border border-[#CCAB4A] p-4">
                <div className="font-semibold text-lg mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4" /> Contact
                </div>
                <div className="text-gray-800 text-sm">
                  Phone: {vendor.phoneNumber || "—"}
                </div>
                <div className="text-gray-800 text-sm">
                  Address:{" "}
                  {vendor.address
                    ? `${vendor.address.street || ""}${vendor.address.street ? ", " : ""}${vendor.address.city || ""}${vendor.address.state ? ", " + vendor.address.state : ""
                    }`
                    : "—"}
                </div>
              </div> */}

              <div className="rounded-2xl border border-[#CCAB4A] p-4">
                <div className="font-semibold text-lg mb-2">Service Areas</div>
                <div className="flex flex-wrap gap-2">
                  {(vendor.locations || []).map((loc, i) => (
                    <span
                      key={i}
                      className="text-sm px-3 py-1 rounded-full border border-gray-300 bg-white"
                    >
                      {loc}
                    </span>
                  ))}
                  {(!vendor.locations || vendor.locations.length === 0) && (
                    <span className="text-sm text-gray-600">—</span>
                  )}
                </div>
              </div>
            </div>

            {/* Venue Coverage */}
            <div className="mt-6">
              <div className="font-semibold text-lg mb-2">Venue Coverage</div>
              <div className="flex flex-wrap gap-2">
                {(vendor.venueCoverage || []).map((item, idx) => (
                  <span
                    key={idx}
                    className="text-sm px-3 py-1 rounded-full border border-gray-300 bg-white"
                  >
                    {item}
                  </span>
                ))}
                {(!vendor.venueCoverage || vendor.venueCoverage.length === 0) && (
                  <span className="text-sm text-gray-600">—</span>
                )}
              </div>
            </div>

            {/* Themes */}
            <div className="mt-6">
              <div className="font-semibold text-lg mb-2">Themes</div>
              <div className="flex flex-wrap gap-2">
                {(vendor.themes || []).map((theme, idx) => (
                  <span
                    key={idx}
                    className="text-sm px-3 py-1 rounded-full border border-gray-300 bg-white"
                  >
                    {theme}
                  </span>
                ))}
                {(!vendor.themes || vendor.themes.length === 0) && (
                  <span className="text-sm text-gray-600">—</span>
                )}
              </div>
            </div>

            {/* Response Time */}
            <div className="inline-flex items-center h-16 text-black font-semibold text-xl rounded-3xl border-[1px] border-[#CCAB4A] mt-6">
              <div className="flex items-center gap-2 px-8 py-2 h-full">
                <Hourglass className="w-5 h-5" />
                <div className="text-xl font-medium pr-8">Response time</div>
                <div className="h-10 w-px bg-[#CCAB4A]"></div>
                <div className="text-xl ml-1 px-8">1 hour</div>
              </div>
            </div>
          </div>

          {/* Right: Booking Card */}
          <div className="lg:w-1/3 bg-white p-5 rounded-2xl shadow-lg border border-[#CCAB4A]">
            <h2 className="text-xl font-semibold">
              ₹{vendor.price || "Price to be updated"}
            </h2>
            <div className="text-base mt-2 text-gray-600 font-medium">Event Location, Date & Time</div>

            <div className="bg-[#fffaea] mt-4 border border-[#CCAB4A] text-base font-medium p-3 rounded-xl whitespace-pre-line text-gray-800">
              {`Guest: ${filtersData.guest}
Location: ${filtersData.location}
Date: ${filtersData.date}
Food Type: ${filtersData.foodType}
Additional Info: ${filtersData.additionalInfo}
Budget : ${filtersData.budget}
Event Type : ${filtersData.eventType}
`}
            </div>

            {/* DO NOT CHANGE: Chat button */}
            <button
              onClick={() =>
                navigate("/chat", {
                  state: { vendor: vendor, filters: filtersData },
                })
              }
              className="w-full mt-5 px-4 py-2 bg-[#CCAB4A] hover:bg-[#ab8f39] text-white rounded-xl text-base font-bold"
            >
              Chat with Vendor
            </button>



            {/* DO NOT CHANGE: Pay button */}
            <button
              onClick={handlePayment}
              className="w-full mt-5 px-4 py-2 bg-[#CCAB4A] hover:bg-[#ab8f39] text-white rounded-xl text-base font-bold"
            >
              Pay
            </button>
          </div>
        </div>

        {/* Specializes In (kept as-is visual sample) */}
        {/* <section className="pb-12">
          <h3 className="text-2xl font-semibold mb-6">
            Specializes In — {serviceType || "Catering"}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { title: "South Indian", img: south_indian },
              { title: "North Indian", img: north_indian },
              { title: "Snacks", img: snacks },
              { title: "Desserts", img: desert },
              { title: "Beverages", img: beverage },
              { title: "Live Counters", img: live_counter },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-md overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:scale-110 cursor-pointer"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className={`h-32 w-full object-cover transition-opacity duration-200 ${isLoaded ? "opacity-100" : "opacity-0"}`}
                  onLoad={() => setIsLoaded(true)}
                />
                <div className="p-3 text-center font-semibold text-sm text-gray-700">
                  {item.title}
                </div>
              </div>
            ))}
          </div>
        </section> */}
      </div>

      {/* Footer (unchanged) */}
      <div className="footer h-fit pt-20 pb-5 bg-[#FFD3C3] text-[#D48060] rounded-t-[40px] md:rounded-t-[80px] transition-colors duration-300">
        <div className="top flex flex-col md:flex-row justify-between items-start md:items-center gap-10 mx-4 md:mx-20">
          {/* Left Section */}
          <div className="left flex flex-col gap-16">
            <div className="top text-[45px] font-bold">tendr</div>
            <div className="bottom flex flex-col gap-3">
              <div className="first text-2xl font-semibold">Follow us on :-</div>
              <div className="second flex gap-5">
                <div className="group cursor-pointer transition-colors duration-300">
                  <LinkedInIcon className="text-black group-hover:text-white" sx={{ fontSize: 40 }} />
                </div>
                <div className="group cursor-pointer transition-colors duration-300">
                  <InstagramIcon className="text-black group-hover:text-white" sx={{ fontSize: 40 }} />
                </div>
                <div className="group cursor-pointer transition-colors duration-300">
                  <FacebookIcon className="text-black group-hover:text-white" sx={{ fontSize: 40 }} />
                </div>
              </div>
            </div>
          </div>
          {/* Right Section */}
          <div className="right mt-4 font-bold text-[24px] flex flex-col gap-2">
            {["Support", "Help Center", "Vendor Support", "Vendor", "Get in touch"].map((text, index) => (
              <div key={index} className="group cursor-pointer transition-colors duration-300 hover:text-white">
                {text}
              </div>
            ))}
          </div>
        </div>
        <div className="center text-[100px] md:text-[280px] lg:text-[380px] text-center font-bold text-[#D48060] leading-none">
          tendr
        </div>
        <div className="bottom flex flex-col md:flex-row justify-between items-center gap-4 mx-4 md:mx-12 text-xl font-bold">
          <div className="bottom mx-12 text-xl font-bold flex justify-between">
            <div className="left group cursor-pointer transition-colors duration-300 hover:text-white">
              Copyright 2025 | tendr
            </div>
            <div className="right group cursor-pointer transition-colors duration-300 hover:text-white">
              Privacy policy
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDetailsPage;
