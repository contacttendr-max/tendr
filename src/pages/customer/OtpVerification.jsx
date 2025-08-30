import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  verifyOtpAction,
  resendOtpAction,
  clearError,
} from "../../redux/authSlice";
import logo from "../../assets/logos/tendr-logo-secondary.png";

const OTPPage = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [localError, setLocalError] = useState("");
  const [corporateMode, setCorporateMode] = useState(false);
  const [regularMode, setRegularMode] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { verificationId, userData, loading, error } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    const corporateData = localStorage.getItem("corporatePlan");
    const mockUserData = localStorage.getItem("mockUserData");
    const isCorporateUser = !!corporateData;
    const isRegularUser = !!mockUserData;
    const isReduxUser = verificationId && userData?.phoneNumber;

    if (!isCorporateUser && !isRegularUser && !isReduxUser) {
      navigate("/signup"); // redirecting to signup if not registered
    }
    setCorporateMode(isCorporateUser);
    setRegularMode(isRegularUser);
  }, [verificationId, userData, navigate]);

  // Generate a mock OTP for corporate flow (no real SMS integration here)
  useEffect(() => {
    if (corporateMode) {
      const existing = localStorage.getItem("corporateOtp");
      if (!existing) {
        const generated = String(Math.floor(1000 + Math.random() * 9000));
        localStorage.setItem("corporateOtp", generated);
        // For development convenience, log the OTP
        console.info("Corporate OTP (dev):", generated);
      }
    }
  }, [corporateMode]);

  // Generate a mock OTP for regular user flow
  useEffect(() => {
    if (regularMode) {
      const existing = localStorage.getItem("mockOtp");
      if (!existing) {
        const generated = String(Math.floor(1000 + Math.random() * 9000));
        localStorage.setItem("mockOtp", generated);
        // For development convenience, log the OTP
        console.info("Regular User OTP (dev):", generated);
      }
    }
  }, [regularMode]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleChange = (e) => {
    const value = e.target.value;
    const index = e.target.dataset.index;

    if (value.length > 1) return;
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${parseInt(index) + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "") {
      if (index > 0) {
        document.getElementById(`otp-input-${index - 1}`).focus();
      }
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const finalOtp = otp.join("");
    if (finalOtp.length !== 4) {
      if (corporateMode || regularMode) {
        setLocalError("Please enter a 4-digit OTP");
      } else {
        dispatch({
          type: "auth/verifyOtp/rejected",
          payload: "Please enter a 4-digit OTP",
        });
      }
      return;
    }

    if (corporateMode) {
      setLocalLoading(true);
      setLocalError("");
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const expected = localStorage.getItem("corporateOtp");
      if (finalOtp === expected) {
        // Mark corporate as verified and redirect to corporate dashboard
        localStorage.removeItem("corporateOtp");
        localStorage.setItem(
          "corporateLogin",
          JSON.stringify({ loginTime: new Date().toISOString() })
        );
        navigate("/corporate/dashboard");
      } else {
        setLocalError("Invalid OTP. Please try again.");
      }
      setLocalLoading(false);
    } else if (regularMode) {
      setLocalLoading(true);
      setLocalError("");
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const expected = localStorage.getItem("mockOtp");
      if (finalOtp === expected) {
        // Mark regular user as verified and redirect to dashboard
        localStorage.removeItem("mockOtp");
        localStorage.removeItem("mockVerificationId");
        localStorage.setItem(
          "mockLogin",
          JSON.stringify({ 
            user: JSON.parse(localStorage.getItem("mockUserData")),
            loginTime: new Date().toISOString() 
          })
        );
        navigate("/dashboard");
      } else {
        setLocalError("Invalid OTP. Please try again.");
      }
      setLocalLoading(false);
    } else {
      dispatch(
        verifyOtpAction({
          phoneNumber: userData.phoneNumber,
          name: userData.name,
          email: userData.email,
          password: userData.password,
          otp: finalOtp,
          verificationId,
        })
      ).then((result) => {
        if (result.meta.requestStatus === "fulfilled") {
          navigate("/dashboard"); // Redirect to user dashboard after successful verification
        }
      });
    }
  };

  const handleResend = () => {
    setTimeLeft(60);
    setCanResend(false);
    setLocalError("");
    if (corporateMode) {
      const generated = String(Math.floor(1000 + Math.random() * 9000));
      localStorage.setItem("corporateOtp", generated);
      console.info("Corporate OTP (dev):", generated);
      setOtp(["", "", "", ""]);
    } else if (regularMode) {
      const generated = String(Math.floor(1000 + Math.random() * 9000));
      localStorage.setItem("mockOtp", generated);
      console.info("Regular User OTP (dev):", generated);
      setOtp(["", "", "", ""]);
    } else {
      dispatch(clearError());
      dispatch(resendOtpAction()).then((result) => {
        if (result.meta.requestStatus === "fulfilled") {
          setOtp(["", "", "", ""]); // Clear OTP inputs
        }
      });
    }
  };

  return (
    <div className="w-screen min-h-screen flex flex-col bg-[#E8DED1]">
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="bg-[#F7F4EF] rounded-2xl shadow-lg w-[454px] h-[530px] p-6 flex flex-col items-center">
          <img
            src={logo}
            alt="Tendr Logo"
            className="w-[325px] h-[106px] mb-4"
          />

          <div className="w-[424px] h-[312px] flex flex-col items-center">
            <h2 className="text-xl font-bold text-center mb-2">
              OTP verification
            </h2>
            <p className="text-sm text-center text-gray-700 font-bold mb-4">
              Please enter the OTP (One-Time Password) sent to your registered
              phone number to complete your verification.
            </p>
            {(error || localError) && (
              <div className="text-red-500 text-sm text-center mb-4">
                {localError || error}
              </div>
            )}
            <form onSubmit={handleVerify} className="space-y-4 w-full">
              <div className="flex justify-evenly gap-2 mb-1">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={handleChange}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    id={`otp-input-${index}`}
                    data-index={index}
                    className="w-10 h-10 text-center text-xl border border-yellow-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    disabled={loading || localLoading}
                  />
                ))}
              </div>
              <div className="flex justify-between text-xs text-gray-700 font-medium px-1">
                <span>
                  Remaining Time:{" "}
                  <span className="text-yellow-600 font-bold">
                    00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}s
                  </span>
                </span>
                <span>
                  Didn't get the code?{" "}
                  <button
                    type="button"
                    className={`font-semibold hover:underline ${
                      canResend ? "text-yellow-600" : "text-gray-400"
                    }`}
                    onClick={handleResend}
                    disabled={!canResend || loading || localLoading}
                  >
                    Resend
                  </button>
                </span>
              </div>
              <div className="flex justify-center mt-2">
                <button
                  type="submit"
                  className="text-white font-semibold rounded-xl w-[137px] h-[37px]"
                  style={{ backgroundColor: "#CCAB4A" }}
                  disabled={loading || localLoading}
                >
                  {loading || localLoading ? "Verifying..." : "Verify"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <footer className="w-full text-black text-sm py-3 px-4 text-center bg-opacity-60">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 font-semibold">
          <span>tendr ©</span>
          <span>|</span>
          <a href="#" className="hover:underline cursor-pointer">
            Support
          </a>
          <span>|</span>
          <a href="#" className="hover:underline cursor-pointer">
            Help Center
          </a>
          <span>|</span>
          <a href="#" className="hover:underline cursor-pointer">
            Vendor Support
          </a>
          <span>|</span>
          <a href="#" className="hover:underline cursor-pointer">
            Get in touch
          </a>
        </div>
      </footer>
    </div>
  );
};

export default OTPPage;
