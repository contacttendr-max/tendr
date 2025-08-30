import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ServiceSpecificFields from "../../components/forms/ServiceSpecificFields";

export default function VendorRegistration() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    phoneNumber: "",
    secondaryPhoneNumber: "",
    otp: "",
    name: "",
    location: "",
    address: "",
    state: "",
    gstNumber: "",
    teamSize: "",
    experience: "",
    eventsCompleted: "",
    concurrentEvents: "",
    clientReferences: "",
    governmentId: "",
    accHolderName: "",
    bankName: "",
    accNumber: "",
    ifscCode: "",
    upiId: "",
    aadhaarNumber: "",
    password: "",
    portfolioFiles: [],
    service: "",
    customService: "",
    serviceFilters: {},
  });

  const [otpDigits, setOtpDigits] = useState(["", "", "", ""]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [canResend, setCanResend] = useState(true);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [supportedCities, setSupportedCities] = useState([]);
  const otpInputRefs = useRef([]);

  useEffect(() => {
    // Mock cities data instead of API call
    const mockCities = [
      "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", 
      "Kolkata", "Pune", "Ahmedabad", "Jaipur", "Surat"
    ];
    setSupportedCities(mockCities);
  }, []);

  const lowercaseService = (service) => {
    if (service === "others") return service;
    return service.toLowerCase();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    const newOtpDigits = [...otpDigits];
    newOtpDigits[index] = value;
    setOtpDigits(newOtpDigits);
    setFormData((prev) => ({ ...prev, otp: newOtpDigits.join("") }));

    if (value && index < otpDigits.length - 1) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otpDigits[index] === "") {
      if (index > 0) {
        otpInputRefs.current[index - 1]?.focus();
      }
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid 10-digit phone number";
    }
    console.log("Validation errors:", newErrors);
    return newErrors;
  };

  const handleStep1Submit = async (e) => {
    e.preventDefault();
    const validationErrors = validateStep1();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setApiError("");
    setErrors({});
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate mock OTP
      const mockOtp = String(Math.floor(1000 + Math.random() * 9000));
      localStorage.setItem("vendorOtp", mockOtp);
      localStorage.setItem("vendorPhoneNumber", formData.phoneNumber);
      
      console.info("=== VENDOR OTP GENERATED ===");
      console.info("Phone Number:", formData.phoneNumber);
      console.info("OTP:", mockOtp);
      console.info("Stored in localStorage as 'vendorOtp'");
      console.info("================================");
      
      setStep(2);
    } catch {
      setApiError("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setCanResend(false);
    setResendCooldown(30);
    setApiError("");
    setErrors({});
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate new mock OTP
      const mockOtp = String(Math.floor(1000 + Math.random() * 9000));
      localStorage.setItem("vendorOtp", mockOtp);
      
      console.info("Vendor OTP (dev):", mockOtp);
      alert("OTP resent successfully!");
    } catch {
      setApiError("Failed to resend OTP. Please try again.");
    }
  };

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => {
        setResendCooldown((prev) => prev - 1);
        if (resendCooldown === 1) setCanResend(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.otp || formData.otp.length !== 4) {
      newErrors.otp = "Please enter a valid 4-digit OTP";
    }
    return newErrors;
  };

  const handleStep2Submit = async (e) => {
    e.preventDefault();
    const validationErrors = validateStep2();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setApiError("");
    setErrors({});
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Verify mock OTP
      const storedOtp = localStorage.getItem("vendorOtp");
      const storedPhone = localStorage.getItem("vendorPhoneNumber");
      
      console.info("=== VENDOR OTP VERIFICATION ===");
      console.info("Entered OTP:", formData.otp);
      console.info("Stored OTP:", storedOtp);
      console.info("Entered Phone:", formData.phoneNumber);
      console.info("Stored Phone:", storedPhone);
      console.info("OTP Match:", formData.otp === storedOtp);
      console.info("Phone Match:", formData.phoneNumber === storedPhone);
      console.info("=================================");
      
      if (formData.otp === storedOtp && formData.phoneNumber === storedPhone) {
        setStep(3);
      } else {
        setApiError("Invalid OTP. Please try again.");
      }
    } catch {
      setApiError("OTP verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const validateStep3 = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Vendor name is required";
    }
    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }
    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }
    if (!formData.gstNumber.trim()) {
      newErrors.gstNumber = "GST number is required";
    }
    if (!formData.teamSize) {
      newErrors.teamSize = "Team size is required";
    }
    if (!formData.experience) {
      newErrors.experience = "Experience is required";
    }
    if (!formData.eventsCompleted) {
      newErrors.eventsCompleted = "Number of events completed is required";
    }
    if (!formData.concurrentEvents) {
      newErrors.concurrentEvents = "Concurrent events capacity is required";
    }
    if (!formData.accHolderName.trim()) {
      newErrors.accHolderName = "Account holder name is required";
    }
    if (!formData.bankName.trim()) {
      newErrors.bankName = "Bank name is required";
    }
    if (!formData.accNumber.trim()) {
      newErrors.accNumber = "Account number is required";
    }
    if (!formData.ifscCode.trim()) {
      newErrors.ifscCode = "IFSC code is required";
    }
    if (!formData.governmentId.trim()) {
      newErrors.governmentId = "PAN number is required";
    }
    if (!formData.aadhaarNumber.trim()) {
      newErrors.aadhaarNumber = "Aadhaar number is required";
    } else if (!/^\d{12}$/.test(formData.aadhaarNumber)) {
      newErrors.aadhaarNumber = "Aadhaar number must be 12 digits";
    }
    if (formData.secondaryPhoneNumber && !/^[6-9]\d{9}$/.test(formData.secondaryPhoneNumber)) {
      newErrors.secondaryPhoneNumber = "Secondary phone number must be a valid 10-digit number";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    return newErrors;
  };

  const handleStep3Submit = async (e) => {
    e.preventDefault();
    const validationErrors = validateStep3();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setApiError("");
    setErrors({});
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store vendor data in localStorage
      const vendorData = {
        ...formData,
        registrationDate: new Date().toISOString(),
        status: "pending_approval"
      };
      
      localStorage.setItem("vendorData", JSON.stringify(vendorData));
      localStorage.removeItem("vendorOtp");
      localStorage.removeItem("vendorPhoneNumber");
      
      console.log("Vendor registration completed:", vendorData);
      
      // Navigate to success page or dashboard
      alert("Vendor registration completed successfully! Your application is under review.");
      navigate("/");
    } catch {
      setApiError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "border border-[#D48060] p-3 rounded-xl text-sm text-[#D48060] placeholder-[#D48060] focus:outline-none focus:ring-2 focus:ring-[#CCAB4A] bg-white transition-all duration-300";

  const otpInputClass =
    "w-12 h-12 border border-[#D48060] rounded-xl text-center text-[#D48060] text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-[#CCAB4A] bg-white transition-all duration-300";

  return (
    <div className="min-h-screen bg-[#F7F4EF] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl bg-[#FFD3C3] p-6 sm:p-8 rounded-[40px] shadow-lg space-y-8">
        <h2 className="text-3xl font-extrabold text-[#D48060] text-center">Register as a Vendor</h2>
        {apiError && <p className="text-red-500 text-center font-medium">{apiError}</p>}
        {/* citiesError && <p className="text-red-500 text-center font-medium">{citiesError}</p> */}

        {step === 1 && (
          <form onSubmit={handleStep1Submit} className="space-y-6">
            <div>
              <label className="block mb-2 text-[#D48060] font-semibold">Phone Number</label>
              <input
                name="phoneNumber"
                placeholder="Enter your 10-digit phone number"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className={inputClass + " w-full"}
              />
              {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`bg-[#CCAB4A] hover:bg-[#D48060] text-white font-semibold px-6 py-3 rounded-xl w-full transform transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleStep2Submit} className="space-y-6">
            <div>
              <label className="block mb-2 text-[#D48060] font-semibold">Enter OTP</label>
              <div className="flex justify-center gap-4" onPaste={() => {}}>
                {otpDigits.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(el) => (otpInputRefs.current[index] = el)}
                    className={otpInputClass}
                    autoFocus={index === 0}
                  />
                ))}
              </div>
              {errors.otp && <p className="text-red-500 text-center text-xs mt-2">{errors.otp}</p>}
            </div>
            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={!canResend}
                className={`text-[#D48060] font-semibold hover:underline mt-2 ${
                  !canResend ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {canResend ? "Resend OTP" : `Resend OTP (${resendCooldown}s)`}
              </button>
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`bg-[#CCAB4A] hover:bg-[#D48060] text-white font-semibold px-6 py-3 rounded-xl w-full transform transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Verifying OTP..." : "Verify OTP"}
            </button>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-[#D48060] font-semibold hover:underline mt-2"
            >
              Back
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleStep3Submit} className="space-y-6">
            {/* citiesLoading && <p className="text-[#D48060] text-center">Loading supported cities...</p> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { name: "name", placeholder: "Vendor Name *" },
                { name: "location", placeholder: "Select City *", type: "select", options: supportedCities },
                { name: "address", placeholder: "Street Address *" },
                { name: "state", placeholder: "State *" },
                { name: "gstNumber", placeholder: "GST Number *" },
                { name: "teamSize", placeholder: "Team Size *" },
                { name: "experience", placeholder: "Years of Service" },
                { name: "eventsCompleted", placeholder: "Total Events Completed" },
                { name: "concurrentEvents", placeholder: "Concurrent Events You Can Handle" },
                { name: "clientReferences", placeholder: "Past Client References" },
                { name: "governmentId", placeholder: "PAN Number *" },
                { name: "aadhaarNumber", placeholder: "Aadhaar Number (12 digits) *" },
                { name: "secondaryPhoneNumber", placeholder: "Secondary Phone Number (Optional)" },
              ].map(({ name, placeholder, type, options }, i) => (
                <div key={i}>
                  {type === "select" ? (
                    <select
                      name={name}
                      value={formData[name]}
                      onChange={handleInputChange}
                      className={inputClass + " w-full"}
                      // disabled={citiesLoading}
                    >
                      <option value="">{placeholder}</option>
                      {options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      name={name}
                      placeholder={placeholder}
                      value={formData[name]}
                      onChange={handleInputChange}
                      className={inputClass + " w-full"}
                    />
                  )}
                  {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
                </div>
              ))}
            </div>

            <div>
              <label className="block mb-2 text-[#D48060] font-semibold">Service Type *</label>
              <select
                name="service"
                value={formData.service}
                onChange={handleInputChange}
                className={inputClass + " w-full"}
              >
                <option value="">Select Service</option>
                <option value="caterer">Caterer</option>
                <option value="dj">DJ</option>
                <option value="decorator">Decorator</option>
                <option value="photographer">Photographer</option>
                <option value="others">Others</option>
              </select>
              {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service}</p>}
            </div>

            {formData.service === "others" && (
              <div>
                <input
                  name="customService"
                  placeholder="Specify Your Service"
                  value={formData.customService || ""}
                  onChange={handleInputChange}
                  className={inputClass + " w-full"}
                />
              </div>
            )}

            {formData.service && (
              <ServiceSpecificFields
                service={lowercaseService(formData.service)}
                onChange={() => {}} // No state update for filters here, as it's not in formData
                initialFilters={formData.serviceFilters}
              />
            )}

            <div>
              <h3 className="text-xl font-bold text-[#D48060] mb-4">Bank Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { name: "accHolderName", placeholder: "Account Holder Name *" },
                  { name: "bankName", placeholder: "Bank Name *" },
                  { name: "accNumber", placeholder: "Account Number *" },
                  { name: "ifscCode", placeholder: "IFSC Code *" },
                  { name: "upiId", placeholder: "UPI ID (Optional)" },
                ].map(({ name, placeholder }, i) => (
                  <div key={i}>
                    <input
                      name={name}
                      placeholder={placeholder}
                      value={formData[name]}
                      onChange={handleInputChange}
                      className={inputClass + " w-full"}
                    />
                    {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block mb-2 text-[#D48060] font-semibold">Password *</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password (min 8 characters)"
                value={formData.password}
                onChange={handleInputChange}
                className={inputClass + " w-full"}
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="block mb-2 font-semibold text-[#D48060]">
                Upload Portfolio Files (Images, Videos)
              </label>
              <input
                type="file"
                name="portfolioFiles"
                multiple
                accept="image/*,video/*"
                onChange={() => {}} // No state update for files here
                className="w-full border border-[#D48060] rounded-xl p-2 bg-white text-[#D48060] file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-[#CCAB4A] file:text-white hover:file:bg-[#D48060] transition-all duration-300"
              />
              {/* No file count display as files are not managed in state */}
            </div>

            <button
              type="submit"
              disabled={loading || false}
              className={`bg-[#CCAB4A] hover:bg-[#D48060] text-white font-semibold px-6 py-3 rounded-xl w-full transform transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95 ${
                (loading || false) ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => console.log("Submit button clicked, disabled:", loading || false)}
            >
              {loading ? "Submitting..." : "Complete Registration"}
            </button>
            <button
              type="button"
              onClick={() => setStep(2)}
              className="text-[#D48060] font-semibold hover:underline mt-2"
            >
              Back
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
