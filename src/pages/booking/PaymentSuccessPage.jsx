// src/pages/payment/PaymentSuccessPage.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/logos/tendr-logo-secondary.png";

const PaymentSuccessPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { bookingDetails, orderId, paymentId, amount } = state || {};
  const [booking, setBooking] = useState(null);

  const BACKEND_BASE_URL = "http://localhost:8080";
  useEffect(() => {
    const createBooking = async () => {
      try {
        // backend booking create
        const res = await axios.post(
          `${BACKEND_BASE_URL}/api/bookings`,
          {
            offerId: bookingDetails.offerId,
            paymentId,
            customerId: bookingDetails.customerId,
            vendorId: bookingDetails.vendorId,
            schedule: bookingDetails.schedule,
            items: bookingDetails.addons || {},
          },
          { withCredentials: true }
        );

        setBooking(res.data);
        // Navigate to booking confirmation after booking is created
        navigate('/booking/confirmation', {
          state: {
            booking: res.data,
            amount,
          },
        });
      } catch (err) {
        console.error("Booking create error:", err);
        alert("Something went wrong while confirming booking!");
        navigate("/booking-review");
      }
    };

    if (bookingDetails && paymentId) {
      createBooking();
    }
  }, [bookingDetails, paymentId, navigate]);

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF6EF]">
        <h2 className="text-xl font-bold text-[#2e1b0f]">
          Finalizing your booking...
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#FFF6EF]">
      {/* Main Container */}
      <div className="flex-grow flex items-center justify-center px-4 sm:px-6 py-10">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8 text-center">
          {/* Logo */}
          <img
            src={logo}
            alt="Tendr Logo"
            className="w-40 sm:w-48 mx-auto mb-6"
          />

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl font-extrabold text-green-700 mb-3">
            🎉 Booking Confirmed!
          </h2>
          <p className="text-gray-700 text-base sm:text-lg mb-8">
            Your payment was successful and your booking has been confirmed.
          </p>

          {/* Booking Details */}
          <div className="bg-orange-50 rounded-xl p-5 shadow-inner text-left mb-8">
            <p className="text-gray-800 mb-1">
              <strong>Booking ID:</strong> {booking._id}
            </p>
            <p className="text-gray-800 mb-1">
              <strong>Event:</strong> {bookingDetails.eventName}
            </p>
            <p className="text-gray-800 mb-1">
              <strong>Date:</strong> {bookingDetails.schedule?.date}
            </p>
            <p className="text-gray-800 mb-1">
              <strong>Time:</strong> {bookingDetails.schedule?.timeSlot}
            </p>
            <p className="text-gray-800 mb-1">
              <strong>Plan:</strong> {bookingDetails.service}
            </p>
            <p className="text-gray-800">
              <strong>Amount Paid:</strong> ₹{amount}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              className="flex-1 bg-green-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-green-700 transition"
              onClick={() => alert("Downloading Ticket...")}
            >
              Download Ticket
            </button>
            <button
              className="flex-1 bg-[#2e1b0f] text-white py-3 px-6 rounded-xl font-semibold hover:bg-[#2e1b0f]/80 transition"
              onClick={() => navigate("/dashboard")}
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full text-gray-600 text-sm py-4 text-center border-t">
        tendr © | Support | Help Center | Vendor Support
      </footer>
    </div>
  );
};

export default PaymentSuccessPage;
