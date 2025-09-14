import React, { useEffect, useState } from "react";
import loginbackground from "../../assets/backgrounds/login-bg.png";
import signupbackground from "../../assets/backgrounds/signup-bg.png";
import logo from "../../assets/logos/tendr-logo-secondary.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { clearError } from '../../redux/authSlice';
import BasicSpeedDial from "../../components/BasicSpeedDial";
import Footer from "../../components/Footer";

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, verificationId } = useSelector((state) => state.auth);

  const isSignupPath = location.pathname === "/signup";
  const [isSignup, setIsSignup] = useState(isSignupPath);
  const [localLoading, setLocalLoading] = useState(false);
  const [localError, setLocalError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    location: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setIsSignup(location.pathname === "/signup");
    dispatch(clearError());
    setLocalError("");
  }, [location.pathname, dispatch]);

  useEffect(() => {
    if (verificationId) {
      navigate("/otp");
    }
  }, [verificationId, navigate]);

  const toggleAuthMode = () => {
    setIsSignup(!isSignup);
    navigate(isSignup ? "/login" : "/signup");
    setPasswordError("");
    setShowPassword(false);
    setLocalError("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "password") {
      if (value.length < 8) {
        setPasswordError("Password must be at least 8 characters long");
      } else {
        setPasswordError("");
      }
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (formData.password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return;
    }

    setLocalLoading(true);
    setLocalError("");

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Store user data in localStorage for mock flow
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
        location: formData.location,
      };

      // Generate mock verification ID
      const mockVerificationId = `mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Store in localStorage for OTP verification
      localStorage.setItem("mockUserData", JSON.stringify(userData));
      localStorage.setItem("mockVerificationId", mockVerificationId);
      
      // Generate mock OTP
      const mockOtp = String(Math.floor(1000 + Math.random() * 9000));
      localStorage.setItem("mockOtp", mockOtp);
      
      console.info("Mock OTP (dev):", mockOtp);
      console.info("Mock Verification ID:", mockVerificationId);

      // Navigate to OTP page
      navigate("/otp");
    } catch {
      setLocalError("Signup failed. Please try again.");
    } finally {
      setLocalLoading(false);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (formData.password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return;
    }

    setLocalLoading(true);
    setLocalError("");

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check if user exists in localStorage (mock authentication)
      const mockUserData = localStorage.getItem("mockUserData");
      if (mockUserData) {
        const user = JSON.parse(mockUserData);
        if (user.phoneNumber === formData.phoneNumber && user.password === formData.password) {
          // Mock successful login
          localStorage.setItem("mockLogin", JSON.stringify({
            user,
            loginTime: new Date().toISOString()
          }));
          navigate("/dashboard");
        } else {
          setLocalError("Invalid phone number or password");
        }
      } else {
        setLocalError("No account found. Please sign up first.");
      }
    } catch {
      setLocalError("Login failed. Please try again.");
    } finally {
      setLocalLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="w-screen min-h-screen flex flex-col bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${isSignup ? signupbackground : loginbackground})`,
      }}
    >
      <BasicSpeedDial/>
      <div className="absolute inset-0 bg-[#CCAB4A] opacity-30 z-0" />

      <div className="flex-grow flex items-center justify-center px-3 sm:px-4 pt-4 relative z-10">
        <div
          className={`bg-[#F7F4EF] ${isSignup ? "py-4 sm:py-6 px-4 sm:px-6" : "p-6 sm:p-8"
            } rounded-2xl shadow-lg w-full max-w-sm`}
        >
          <div className="flex justify-center mb-3 sm:mb-4">
            <img
              src={logo}
              alt="tendr logo"
              className="w-40 sm:w-48 md:w-[300px] lg:w-[326px] h-auto"
            />
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-center mb-3 sm:mb-4 sm:mb-6 text-gray-800">
            {isSignup ? "Welcome to tendr!" : "Sign in to tendr!"}
          </h2>

          {(error || localError) && (
            <div className="text-red-500 text-xs sm:text-sm text-center mb-3 sm:mb-4">
              {localError || error}
            </div>
          )}

          {isSignup ? (
            <form className="space-y-2 sm:space-y-3" onSubmit={handleSignupSubmit}>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-yellow-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  disabled={loading || localLoading}
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-yellow-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  disabled={loading || localLoading}
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border ${passwordError ? "border-red-500" : "border-yellow-400"
                      } rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 pr-10`}
                    disabled={loading || localLoading}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 flex items-center pr-2 sm:pr-3 text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500 active:outline-none rounded-r-xl transition-colors duration-200"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    disabled={loading || localLoading}
                  >
                    <svg
                      className="h-4 w-4 sm:h-5 sm:w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {showPassword ? (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      ) : (
                        <>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </>
                      )}
                    </svg>
                  </button>
                </div>
                {passwordError && (
                  <p className="text-red-500 text-xs mt-1">{passwordError}</p>
                )}
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-yellow-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  disabled={loading || localLoading}
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-yellow-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  disabled={loading || localLoading}
                >
                  <option value="">Select a location</option>
                  <option value="delhi">Delhi</option>
                  <option value="mumbai">Mumbai</option>
                  <option value="bangalore">Bangalore</option>
                </select>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="text-white text-xs sm:text-sm font-semibold rounded-xl w-24 sm:w-28 h-8 sm:h-9 m-1"
                  style={{ backgroundColor: "#CCAB4A" }}
                  disabled={loading || localLoading || passwordError}
                >
                  {loading || localLoading ? "Signing Up..." : "Sign Up"}
                </button>
              </div>
            </form>
          ) : (
            <form className="space-y-3 sm:space-y-4" onSubmit={handleLoginSubmit}>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm border border-yellow-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  disabled={loading || localLoading}
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm border ${passwordError ? "border-red-500" : "border-yellow-400"
                      } rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 pr-10`}
                    disabled={loading || localLoading}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 flex items-center pr-2 sm:pr-3 text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500 active:outline-none rounded-r-xl transition-colors duration-200"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    disabled={loading || localLoading}
                  >
                    <svg
                      className="h-4 w-4 sm:h-5 sm:w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {showPassword ? (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      ) : (
                        <>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </>
                      )}
                    </svg>
                  </button>
                </div>
                {passwordError && (
                  <p className="text-red-500 text-xs mt-1">{passwordError}</p>
                )}
              </div>
              <div className="text-right text-xs sm:text-sm font-bold text-gray-600 hover:underline cursor-pointer">
                Forgot Your Password?
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="text-white text-xs sm:text-sm font-semibold rounded-xl w-28 sm:w-32 h-8 sm:h-10"
                  style={{ backgroundColor: "#CCAB4A" }}
                  disabled={loading || localLoading || passwordError}
                >
                  {loading || localLoading ? "Signing In..." : "Sign In"}
                </button>
              </div>
            </form>
          )}

          <div className="mt-4 sm:mt-5 flex flex-col sm:flex-row items-center justify-center text-xs sm:text-sm text-gray-700 font-bold gap-1 bg-white rounded-xl p-2 sm:p-3">
            <span>{isSignup ? "Already have an account?" : "New to tendr?"}</span>
            <span
              className="font-semibold cursor-pointer hover:underline"
              style={{ color: "#CCAB4A" }}
              onClick={toggleAuthMode}
            >
              {isSignup ? "Sign In" : "Create an account"}
            </span>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Auth;
