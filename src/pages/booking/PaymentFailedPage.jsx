// src/pages/payment/PaymentFailedPage.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/logos/tendr-logo-secondary.png";

const PaymentFailedPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { orderId, bookingDetails, amount, paymentId } = state || {};
  const [loading, setLoading] = useState(false);

  const BACKEND_BASE_URL = "http://localhost:8080";
  const handleRetry = async () => {
    try {
      setLoading(true);

      // 🔹 Call backend retry API
      const res = await axios.post(
        `${BACKEND_BASE_URL}/api/payments/${paymentId}/retry`,
        {},
        { withCredentials: true }
      );

      if (res.data && res.data.payment?.status === "SUCCESS") {
        // 🔹 Direct success page
        navigate("/booking/payment-success", {
          state: {
            orderId: res.data.order.id,
            bookingDetails,
            amount,
            paymentId: res.data.payment._id,
          },
        });
      } else {
        alert("Retry failed. Please try again later.");
      }
    } catch (err) {
      console.error("Retry error:", err);
      alert("Something went wrong during retry.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#FFF6EF]">
      {/* Main Container */}
      <div className="flex-grow flex items-center justify-center px-4 sm:px-6 py-10">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8 flex flex-col items-center text-center">
          {/* Logo */}
          <img src={logo} alt="Tendr Logo" className="w-40 sm:w-48 mx-auto mb-6" />

          {/* Icon */}
          <div className="text-[#2e1b0f] text-6xl mb-4">❌</div>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2e1b0f] mb-3">
            Payment Failed
          </h2>

          {/* Message */}
          <p className="text-gray-700 text-base sm:text-lg font-medium mb-6">
            Unfortunately, your payment could not be processed.  
            Please check your details and try again.
          </p>

          {/* Retry Button */}
          <button
            onClick={handleRetry}
            disabled={loading}
            className="w-full sm:w-60 bg-[#2e1b0f] text-white font-semibold py-3 px-6 rounded-xl hover:bg-[#2e1b0f]/80 transition disabled:opacity-50"
          >
            {loading ? "Retrying..." : "Retry Payment"}
          </button>

          {/* Contact Support */}
          <p className="text-sm text-gray-600 mt-6">
            Need help?{" "}
            <span className="text-[#2e1b0f] cursor-pointer hover:underline">
              Contact Support
            </span>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full text-gray-600 text-sm py-4 text-center border-t">
        tendr © | Support | Help Center | Vendor Support | Get in touch
      </footer>
    </div>
  );
};

export default PaymentFailedPage;
