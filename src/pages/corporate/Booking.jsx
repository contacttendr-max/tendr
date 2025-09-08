import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowDown, FiCheck, FiStar, FiUsers, FiCalendar, FiDollarSign, FiClock, FiShield, FiAward, FiGift, FiCamera, FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import BasicSpeedDial from "../../components/BasicSpeedDial";

const plans = [
  {
    id: "basic",
    title: "Basic Plan",
    price: "Free",
    originalPrice: null,
    subtext: "Ideal for Small Teams and Trial Runs",
    highlights: [
      "Full access to vendor marketplace",
      "Self-service event booking",
      "24/7 customer support",
      "Premium quality service",
      "Transparent pricing - no hidden fees",
      "Basic event coordination",
      "Standard vendor recommendations",
    ],
    mandatoryAddon: "Platform usage + on-ground support → ₹750/event",
    optionalAddons: [
      { name: "Custom Memorabilia", price: 1100, originalPrice: 1500 },
      { name: "Professional After Movie", price: 1100, originalPrice: 1500 },
      { name: "Customized Invitation Flyer", price: 1100, originalPrice: 1500 },
    ],
    savings: "Save ₹25,000+ annually vs traditional agencies",
    isPaid: false,
    features: ["Vendor Access", "Basic Support", "Event Booking", "Standard Coordination"]
  },
  {
    id: "pro",
    title: "Pro Plan",
    price: "₹12,000/year",
    originalPrice: "₹15,000/year",
    subtext: "Smart choice for growing companies",
    highlights: [
      "Everything in Basic Plan",
      "Priority WhatsApp support",
      "Real-time dashboard",
      "Faster support response",
      "Enhanced vendor recommendations",
      "Dedicated account manager",
      "Monthly event planning sessions",
      "Custom event templates",
    ],
    mandatoryAddon: "Platform usage + on-ground support → ₹500/event",
    optionalAddons: [
      { name: "Custom Memorabilia", price: 750, originalPrice: 1100 },
      { name: "Professional After Movie", price: 750, originalPrice: 1100 },
      { name: "Customized Invitation Flyer", price: 750, originalPrice: 1100 },
    ],
    savings: "Save ₹35,000+ annually vs traditional agencies",
    isPaid: true,
    features: ["Priority Support", "Real-time Dashboard", "Account Manager", "Custom Templates"]
  },
  {
    id: "elite",
    title: "Elite Plan",
    price: "₹18,000/year",
    originalPrice: "₹21,000/year",
    subtext: "Premium end-to-end event management",
    highlights: [
      "Everything in Pro Plan",
      "Top-rated vendor recommendations",
      "Dedicated event coordinator",
      "Exclusive photoshoot backdrop",
      "All add-ons included",
      "Complimentary Social media shoutout and event marketing",
      "Dedicated 24/7 Premium support",
      "Full planning-to-execution event support",
      "Custom branding and memorabilia",
      "Professional after movies included",
      "Exclusive vendor network access",
      "Priority booking for all vendors",
    ],
    mandatoryAddon: "Included",
    optionalAddons: [{ name: "All add-ons included", price: 0, originalPrice: 3300 }],
    savings: "Save ₹50,000+ annually vs traditional agencies",
    isPaid: true,
    features: ["End-to-End Management", "Dedicated Coordinator", "All Add-ons", "Premium Support"]
  },
];

const eventTypes = [
  { id: "diwali", name: "Diwali/Festival Parties", icon: "🎆", frequency: "Annual" },
  { id: "birthday", name: "Monthly Birthday Events", icon: "🎂", frequency: "Monthly" },
  { id: "achievement", name: "Achievement Recognition", icon: "🏆", frequency: "Quarterly" },
  { id: "celebration", name: "Team Celebrations", icon: "🎉", frequency: "As needed" },
  { id: "outing", name: "Quarterly Team Outings", icon: "🚌", frequency: "Quarterly" },
  { id: "custom", name: "Custom Events", icon: "✨", frequency: "Custom" },
];

export default function CorporateBooking() {
  const navigate = useNavigate();
  const plansRef = useRef(null);
  const [showEventCalculator, setShowEventCalculator] = useState(false);

  const scrollToPlans = () => {
    plansRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handlePlanClick = (plan) => {
    navigate("/corporate-signup", { state: { plan } });
  };

  const calculateSavings = (planId, eventsPerYear = 12) => {
    const traditionalCost = eventsPerYear * 5000; // Traditional agency cost per event
    let tendrCost = 0;
    
    if (planId === "basic") {
      tendrCost = eventsPerYear * 750; // Only mandatory add-ons
    } else if (planId === "pro") {
      tendrCost = 12000 + (eventsPerYear * 500); // Annual fee + reduced add-ons
    } else if (planId === "elite") {
      tendrCost = 18000; // All inclusive
    }
    
    return traditionalCost - tendrCost;
  };

  return (
    <div className="min-h-screen bg-[#F7F4EF] py-4 sm:py-10 px-2 sm:px-4">
      <BasicSpeedDial />
      {/* Header */}
      <div className="bg-[#fff6eb] w-full py-4 sm:py-6 px-3 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 sm:gap-10 items-center">
          <div className="lg:w-1/2 space-y-4 sm:space-y-6 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#6B4226] leading-tight">
              Upgrade Corporate Events with{" "}
              <span className="text-[#CCAB4A]">Tendr Premium</span>
            </h1>
            <p className="text-base sm:text-lg text-[#6B4226] font-medium">
              Plan smarter — save time, eliminate vendor stress, and make your
              office events look exceptional. Starting at under ₹2000/month.
            </p>
            <ul className="list-disc ml-4 sm:ml-6 text-[#6B4226] space-y-1 sm:space-y-2 text-sm sm:text-base">
              <li>✅ Save 12+ hours — focus on real HR work</li>
              <li>✅ Save ₹25,000+ annually vs. agencies</li>
              <li>✅ No vendor stress — we handle it all</li>
              <li>✅ Professional results that wow teams</li>
              <li>✅ Easy budget approval — under ₹2000/month</li>
            </ul>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
            <button
              onClick={scrollToPlans}
                className="flex items-center justify-center gap-2 bg-[#CCAB4A] hover:bg-[#b7973f] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-2xl font-bold transition text-sm sm:text-base"
            >
              Go Premium <FiArrowDown />
            </button>
              <button
                onClick={() => setShowEventCalculator(!showEventCalculator)}
                className="flex items-center justify-center gap-2 bg-white border-2 border-[#CCAB4A] text-[#CCAB4A] px-4 sm:px-6 py-2 sm:py-3 rounded-2xl font-bold transition hover:bg-[#CCAB4A] hover:text-white text-sm sm:text-base"
              >
                Calculate Savings
              </button>
            </div>
          </div>

          <div className="lg:w-1/2 w-full flex flex-col gap-4 sm:gap-8">
            <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md border border-[#CCAB4A]">
              <h3 className="text-lg sm:text-xl font-bold text-[#D48060] mb-3 sm:mb-4">
                Perfect For:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {eventTypes.map((event) => (
                  <div key={event.id} className="flex items-center gap-2 sm:gap-3">
                    <span className="text-xl sm:text-2xl">{event.icon}</span>
                    <div>
                      <p className="text-xs sm:text-sm font-semibold text-[#6B4226]">{event.name}</p>
                      <p className="text-xs text-gray-500">{event.frequency}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl py-4 sm:py-6 px-3 sm:px-4 flex flex-col sm:flex-row justify-around items-center text-center shadow-md border border-[#CCAB4A]">
              {["80%", "12+ hrs", "₹25,000+", "100%"].map((value, idx) => (
                <div
                  key={idx}
                  className="mb-4 sm:mb-0 sm:px-2 lg:px-4 w-full sm:w-auto"
                >
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#D48060]">
                    {value}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6B4226] font-medium">
                    {
                      [
                        "Less planning effort vs traditional process",
                        "Saved per event by HRs and Admins",
                        "Saved yearly vs. agency costs",
                        "Vendor coordination handled by us",
                      ][idx]
                    }
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SAVINGS CALCULATOR */}
      {showEventCalculator && (
        <div className="bg-white py-8 sm:py-16 px-3 sm:px-6 mb-8 sm:mb-12 rounded-3xl shadow-lg max-w-4xl mx-auto">
          <h2 className="text-center text-2xl sm:text-3xl font-bold text-[#6B4226] mb-6 sm:mb-8">
            Calculate Your Annual Savings
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {plans.map((plan) => (
              <div key={plan.id} className="text-center p-4 sm:p-6 bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl">
                <h3 className="text-lg sm:text-xl font-bold text-[#CCAB4A] mb-3 sm:mb-4">{plan.title}</h3>
                <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-2">
                  ₹{calculateSavings(plan.id).toLocaleString()}
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">Annual Savings</p>
                <div className="text-xs sm:text-sm text-gray-700">
                  <p>Traditional Cost: ₹60,000/year</p>
                  <p>Tendr Cost: ₹{plan.id === "basic" ? "9,000" : plan.id === "pro" ? "18,000" : "18,000"}/year</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* EXCLUSIVE PERKS */}
      <div className="bg-[#fff6eb] py-8 sm:py-16 px-3 sm:px-6 mb-8 sm:mb-12">
        <h2 className="text-center text-3xl sm:text-4xl font-bold text-[#6B4226] mb-8 sm:mb-12">
          Exclusive Corporate Perks
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 max-w-7xl mx-auto">
          {[
            {
              title: "Centralized Vendor Access",
              desc: "One platform to book decorators, caterers, anchors, and entertainers without back-and-forth.",
              icon: "📦",
            },
            {
              title: "Professional Planning",
              desc: "Dedicated planning support with event execution & communication handled for you.",
              icon: "🧑‍💼",
            },
            {
              title: "24/7 HR Support",
              desc: "Your company representative or HR can reach out to us anytime, stress-free.",
              icon: "📞",
            },
            {
              title: "Budget Friendly",
              desc: "Plans starting under ₹2000/month — with transparent, flexible billing.",
              icon: "💰",
            },
            {
              title: "Custom Branding",
              desc: "Flyers, shoutouts, team visuals, and memorabilia — all tailored to your event.",
              icon: "🎨",
            },
            {
              title: "Hassle-Free Execution",
              desc: "No more tracking vendors. Our team manages on-ground operations and delivery.",
              icon: "🧾",
            },
          ].map((perk, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-4 sm:p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition"
            >
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{perk.icon}</div>
              <h3 className="text-base sm:text-lg font-bold text-[#D48060] mb-2">
                {perk.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#6B4226]">{perk.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* PLANS */}
      <div
        ref={plansRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 max-w-7xl mx-auto px-3 sm:px-6"
      >
        {plans.map((plan, idx) => (
          <div
            key={plan.id}
            className={`relative flex flex-col rounded-3xl p-4 sm:p-6 shadow-xl cursor-pointer transition-transform transform hover:scale-105 bg-white border ${
              idx === 1
                ? "border-[#CCAB4A] ring-2 ring-[#CCAB4A]"
                : "border-[#6B4226]"
            }`}
            style={{ minHeight: "auto" }}
            onClick={() => handlePlanClick(plan)}
          >
            {/* Most Popular Tag */}
            {idx === 2 && (
              <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2 bg-[#CCAB4A] text-white px-6 sm:px-12 py-1 sm:py-2 text-xs font-bold shadow-lg z-10 rounded-xl">
                Most Popular
              </div>
            )}

            {/* Savings Badge */}
            <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 bg-green-500 text-white px-2 sm:px-3 py-1 text-xs font-bold rounded-full">
              Save ₹{calculateSavings(plan.id).toLocaleString()}/year
            </div>

            {/* Top Content */}
            <div className="flex-grow">
              <h2 className="text-xl sm:text-2xl font-bold text-[#CCAB4A] mb-1">
                {plan.title}
              </h2>
              <div className="flex items-center gap-2 mb-1">
                <p className="text-2xl sm:text-3xl font-extrabold text-[#CCAB4A]">
                {plan.price}
              </p>
                {plan.originalPrice && (
                  <p className="text-base sm:text-lg text-gray-500 line-through">
                    {plan.originalPrice}
                  </p>
                )}
              </div>
              <p className="text-xs sm:text-sm text-[#CCAB4A] mb-3 sm:mb-4">{plan.subtext}</p>

              {/* Feature Icons */}
              <div className="flex flex-wrap gap-1 sm:gap-2 mb-4 sm:mb-6">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-1 bg-orange-100 px-2 py-1 rounded-full">
                    <FiCheck className="w-3 h-3 text-orange-600" />
                    <span className="text-xs text-orange-800">{feature}</span>
                  </div>
                ))}
              </div>

              <ul className="space-y-1 sm:space-y-2 text-[#000000] text-xs sm:text-sm mb-4 sm:mb-6">
                {plan.highlights.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#CCAB4A] font-bold">✔</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="text-xs sm:text-sm text-[#000000] space-y-3 sm:space-y-4">
                <div>
                  <p className="font-semibold underline text-[#6B4226] mb-1">
                    Mandatory Add-on:
                  </p>
                  <ul className="list-disc list-inside ml-2 sm:ml-4 text-xs sm:text-sm">
                    <li>{plan.mandatoryAddon}</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold underline text-[#6B4226] mb-1">
                    Optional Add-ons:
                  </p>
                  <ul className="list-disc list-inside ml-2 sm:ml-4 text-xs sm:text-sm">
                    {plan.optionalAddons.map((addon, idx) => (
                      <li key={idx}>
                        {addon.name} {addon.price > 0 ? `₹${addon.price}` : addon.name}
                        {addon.originalPrice > 0 && (
                          <span className="text-gray-500 line-through ml-1">₹{addon.originalPrice}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Bottom Button */}
            <button className="mt-4 sm:mt-6 w-full h-[40px] sm:h-[45px] bg-[#CCAB4A] hover:bg-[#dfba4a] text-white font-semibold rounded-xl transition-transform transform hover:-translate-y-1 active:scale-95 text-sm sm:text-base">
              Get Started
            </button>
          </div>
        ))}
      </div>

      {/* TESTIMONIALS */}
      <div className="bg-[#F7F4EF] py-8 sm:py-16 px-3 sm:px-6">
        <h2 className="text-center text-3xl sm:text-4xl font-bold text-[#6B4226] mb-8 sm:mb-12">
          What Our Clients Say
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          {[
            {
              quote: "Tendr made our Diwali celebration hassle-free. Everything was handled beautifully and on time. Highly recommend the premium plan!",
              name: "Priya Sharma",
              role: "HR Manager",
              company: "TechCorp India"
            },
            {
              quote: "The Elite plan saved us ₹50,000+ this year. Our team events now look professional and we focus on what matters most.",
              name: "Rajesh Kumar",
              role: "Admin Head",
              company: "Innovate Solutions"
            },
            {
              quote: "From monthly birthdays to quarterly outings, Tendr handles it all. The dedicated coordinator makes all the difference.",
              name: "Anita Patel",
              role: "People Operations",
              company: "StartupXYZ"
            }
          ].map((testimonial, idx) => (
            <div
              key={idx}
              className="bg-white p-4 sm:p-6 rounded-2xl shadow-md border border-[#CCAB4A]"
            >
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FiStar key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-[#6B4226] italic mb-3 sm:mb-4">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-yellow-400 text-white font-bold flex items-center justify-center text-sm">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-[#6B4226]">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
