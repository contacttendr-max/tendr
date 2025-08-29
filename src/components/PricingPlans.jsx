import React from 'react';
import { FiCheck } from 'react-icons/fi';
// import { useNavigate } from 'react-router-dom';

const PricingPlans = () => {
  // const navigate = useNavigate();
  const plans = [
    {
      title: "Basic Plan",
      price: "Free",
      tagline: "Ideal for Small Teams and Trial Runs",
      features: [
        "Full access to vendor marketplace",
        "Self-service event booking",
        "24/7 customer support",
        "Premium quality service",
        "Transparent pricing - no hidden fees"
      ],
      mandatoryAddon: "Platform usage + on-ground support → ₹750/event",
      optionalAddons: [
        "Custom Memorabilia ₹1,100",
        "Professional After Movie ₹1,100",
        "Customized Invitation Flyer ₹1,100"
      ],
      isPopular: false
    },
    {
      title: "Pro Plan",
      price: "₹12,000/year",
      tagline: "Smart choice for growing companies",
      features: [
        "Everything in Basic Plan",
        "Priority WhatsApp support",
        "Real-time dashboard",
        "Faster support response"
      ],
      mandatoryAddon: "Platform usage + on-ground support → ₹500/event",
      optionalAddons: [
        "Custom Memorabilia ₹750",
        "Professional After Movie ₹750",
        "Customized Invitation Flyer ₹750"
      ],
      isPopular: true
    },
    {
      title: "Elite Plan",
      price: "₹18,000/year",
      tagline: "Premium end-to-end event management",
      features: [
        "Everything in Pro Plan",
        "Top-rated vendor recommendations",
        "Dedicated event coordinator",
        "Exclusive photoshoot backdrop",
        "All add-ons included",
        "Complimentary Social media shoutout and event marketing",
        "Dedicated 24/7 Premium support",
        "Full planning-to-execution event support"
      ],
      mandatoryAddon: "Included",
      optionalAddons: ["All included"],
      isPopular: false
    }
  ];

  return (
    <div className="w-full py-16 px-4" style={{ backgroundColor: '#FFF8DC' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Choose Your Plan</h2>
          <p className="text-lg text-gray-600">Select the perfect plan for your corporate events</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div key={index} className="relative">
              {/* Popular Badge */}
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                    Popular
                  </div>
                </div>
              )}
              
              {/* Plan Card */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 h-full border border-amber-100 hover:border-amber-200 transition-all duration-300 hover:shadow-2xl">
                                 {/* Plan Header */}
                 <div className="text-center mb-8">
                   <h3 className="text-2xl font-bold text-amber-600 mb-2">{plan.title}</h3>
                   <div className="text-3xl font-bold bg-gradient-to-r from-amber-500 to-yellow-600 bg-clip-text text-transparent mb-2">{plan.price}</div>
                   <p className="text-gray-600 text-sm">{plan.tagline}</p>
                 </div>

                 {/* Features */}
                 <div className="space-y-3 mb-8">
                   {plan.features.map((feature, featureIndex) => (
                     <div key={featureIndex} className="flex items-start gap-3">
                       <FiCheck className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                       <span className="text-gray-700 text-sm">{feature}</span>
                     </div>
                   ))}
                 </div>

                 {/* Mandatory Add-on */}
                 <div className="mb-6">
                   <h4 className="font-bold text-gray-800 mb-2">Mandatory Add-on:</h4>
                   <div className="flex items-start gap-3">
                     <FiCheck className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                     <span className="text-gray-700 text-sm">{plan.mandatoryAddon}</span>
                   </div>
                 </div>

                 {/* Optional Add-ons */}
                 <div className="mb-8">
                   <h4 className="font-bold text-gray-800 mb-2">Optional Add-ons:</h4>
                   <div className="space-y-2">
                     {plan.optionalAddons.map((addon, addonIndex) => (
                       <div key={addonIndex} className="flex items-start gap-3">
                         <FiCheck className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                         <span className="text-gray-700 text-sm">{addon}</span>
                       </div>
                     ))}
                   </div>
                 </div>

                 
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;
