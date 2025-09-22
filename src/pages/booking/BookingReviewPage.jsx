// src/pages/booking/BookingReviewPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function BookingReviewPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [addons, setAddons] = useState([
    { id: 1, name: "Lunch", price: 50, selected: true },
    { id: 2, name: "Dj", price: 100, selected: true },
    { id: 3, name: "Decoration", price: 80, selected: false },
    { id: 4, name: "Projector", price: 50, selected: false },
    { id: 5, name: "Photographer", price: 100, selected: false },
  ]);
  // Navigation to payment selection
  const handleProceedToPayment = () => {
    navigate('/booking/payment', {
      state: {
        booking: {
          ...bookingDetails,
          addons: addons.filter(a => a.selected),
          amount: totalAmount,
        },
      },
    });
  };

  // Example booking details (replace with real data)
  const bookingDetails = {
    offerId: "64f5e6c1b2c3d4a56789ef01", // example MongoDB ObjectId
    vendorId: "64f5e6c1b2c3d4a56789ef02",
    eventName: "Tech Summit 2024",
    date: "2025-09-10",
    time: "10:00 AM – 4:00 PM",
    vendor: "John Doe",
    guests: 150,
    service: "Premium",
    address: "Tendr, NCR, Delhi",
    basePrice: 250,
    customerId: localStorage.getItem("userId"), // replace with logged-in user
  };

  const selectedAddons = addons.filter((a) => a.selected);
  const totalAmount =
    bookingDetails.basePrice +
    selectedAddons.reduce((sum, a) => sum + a.price, 0);

  const handleAddonChange = (id) => {
    setAddons((prev) =>
      prev.map((a) => (a.id === id ? { ...a, selected: !a.selected } : a))
    );
  };

  const BACKEND_BASE_URL = "http://localhost:8080";
  const handleConfirmBooking = async () => {
    setLoading(true);
    try {
      // 🔹 Call backend to create payment order
      const res = await axios.post(
        `${BACKEND_BASE_URL}/api/payments/create-order`,
        {
          offerId: bookingDetails.offerId,
          customerId: bookingDetails.customerId,
          amount: totalAmount,
          paymentType: "BOOKING",
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      const orderId = res.data.order?.id;
      if (!orderId) throw new Error("Failed to create payment order");

      // 🔹 Navigate to PaymentProcessingPage with order & booking info
      navigate("/payment-processing", {
        state: {
          bookingDetails,
          selectedAddons,
          totalAmount,
          orderId,
        },
      });
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Failed to create order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fefcf6] flex flex-col justify-between">
      <div className="flex flex-col items-center justify-center flex-grow py-6">
        <div className="bg-white shadow-lg border-2 rounded-2xl p-10 w-full max-w-6xl min-h-[500px] flex flex-col md:flex-row gap-10">
          {/* Left Section */}
          <div className="flex-1 space-y-4">
            <h2 className="text-2xl font-bold text-[#2e1b0f]">Review Your Booking</h2>
            <div>
              <p className="font-semibold">Event Type</p>
              <p>{bookingDetails.eventName}</p>
            </div>
            <div>
              <p className="font-semibold">Address</p>
              <p>{bookingDetails.address}</p>
            </div>
            <div>
              <p className="font-semibold">Date & Time</p>
              <p>{bookingDetails.date}</p>
              <p>{bookingDetails.time}</p>
            </div>
            <div>
              <p className="font-semibold">Vendor</p>
              <p>{bookingDetails.vendor}</p>
            </div>
            <div>
              <p className="font-semibold">Total Guests</p>
              <p>{bookingDetails.guests}</p>
            </div>
            <div>
              <p className="font-semibold">Service Type</p>
              <p>{bookingDetails.service}</p>
            </div>
            <div>
              <p className="font-semibold">Extra Requirements</p>
              <textarea
                placeholder="Any special requests?"
                className="w-full border rounded-lg p-2 mt-1"
                rows="3"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex-1 space-y-4">
            <h3 className="text-lg font-bold">Add-ons</h3>
            <div className="space-y-2">
              {addons.map((addon) => (
                <label
                  key={addon.id}
                  className="flex items-center justify-between border rounded-lg p-2 cursor-pointer"
                >
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={addon.selected}
                      onChange={() => handleAddonChange(addon.id)}
                    />
                    <span>{addon.name}</span>
                  </div>
                  <span className="font-medium">₹{addon.price}</span>
                </label>
              ))}
            </div>

            <div className="text-xl font-bold text-[#2e1b0f] flex justify-between">
              <span>Total:</span> <span>₹{totalAmount}</span>
            </div>

            <button
              onClick={handleConfirmBooking}
              disabled={loading}
              className="w-full bg-[#2e1b0f] hover:bg-[#2e1b0f]/80 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
            >
              {loading ? "Processing..." : "Confirm & Pay"}
            </button>
            <button onClick={handleProceedToPayment} disabled={loading} className="w-full bg-[#2e1b0f] hover:bg-[#2e1b0f]/80 text-white py-3 rounded-lg font-semibold disabled:opacity-50">
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-600 py-4 mt-1 border-t">
        tendr © | Support | Help Center | Vendor Support | Get in touch
      </footer>
    </div>
  );
}
export default BookingReviewPage;
