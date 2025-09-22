import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CalendarDays, Briefcase, ArrowRight } from "lucide-react";
import { setBookingType, resetEventPlanning } from "../../redux/eventPlanningSlice";
import BasicSpeedDial from "../../components/BasicSpeedDial";

export default function ChooseBooking() {
  // Example booking details for review navigation
  const exampleBookingDetails = {
    offerId: "64f5e6c1b2c3d4a56789ef01",
    vendorId: "64f5e6c1b2c3d4a56789ef02",
    eventName: "Tech Summit 2024",
    date: "2025-09-10",
    time: "10:00 AM – 4:00 PM",
    vendor: "John Doe",
    guests: 150,
    service: "Premium",
    address: "Tendr, NCR, Delhi",
    basePrice: 250,
    customerId: localStorage.getItem("userId"),
    addons: [],
    amount: 250,
  };

  const handleGoToReview = () => {
    navigate('/booking/review', { state: { booking: exampleBookingDetails } });
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChoose = (type) => {
    dispatch(resetEventPlanning());      // ✅ Reset state first
    dispatch(setBookingType(type));      // ✅ Then set booking type
    navigate(`/plan-event/form?bookingType=${type}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <BasicSpeedDial />
      <div className="flex flex-col items-center w-full max-w-5xl">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
            <span className="bg-gradient-to-r from-amber-600 to-yellow-500 bg-clip-text text-transparent">
              Choose Your Booking Type
            </span>
          </h1>
          <p className="mt-3 text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Two simple options. Pick what fits you best.
          </p>
          <div className="mt-6 w-16 h-1 bg-amber-600 mx-auto rounded-full" />
        </header>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {/* You Do It */}
          <div className="rounded-xl border bg-white p-8 shadow-md hover:shadow-lg transition flex flex-col">
            <div className="flex items-center gap-3">
              <span className="p-4 rounded-lg bg-amber-50 border border-amber-200">
                <CalendarDays className="h-8 w-8 text-amber-700" />
              </span>
              <h2 className="text-xl font-semibold text-gray-800">You Do It</h2>
            </div>
            <p className="mt-4 text-base text-gray-600 flex-grow">
              Guided flow with vendors and budget.
            </p>
            <button
              onClick={() => handleChoose("you-do-it")}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 bg-amber-600 text-white text-base font-medium hover:bg-amber-700 transition w-full"
            >
              Continue <ArrowRight className="h-5 w-5" />
            </button>
          </div>

          {/* Let Us Do It */}
          <div className="rounded-xl border bg-white p-8 shadow-md hover:shadow-lg transition flex flex-col">
            <div className="flex items-center gap-3">
              <span className="p-4 rounded-lg bg-amber-50 border border-amber-200">
                <Briefcase className="h-8 w-8 text-amber-700" />
              </span>
              <h2 className="text-xl font-semibold text-gray-800">Let Us Do It</h2>
            </div>
            <p className="mt-4 text-base text-gray-600 flex-grow">
              Just tell us the requirement, and we’ll take care of everything.
            </p>
            <button
              onClick={() => handleChoose("let-us-do-it")}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 bg-amber-600 text-white text-base font-medium hover:bg-amber-700 transition w-full"
            >
              Continue <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
