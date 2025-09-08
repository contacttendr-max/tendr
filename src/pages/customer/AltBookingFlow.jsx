import React from "react";
import BasicSpeedDial from "../../components/BasicSpeedDial";

export default function AltBookingFlow() {
  return (
    <div className="min-h-screen bg-[#FFF9F0] flex items-center justify-center px-4">
      <BasicSpeedDial/>
      <div className="max-w-xl w-full rounded-3xl bg-white border border-amber-200 p-8 text-center">
        <h1 className="text-3xl font-extrabold text-[#6B3A1E]">
          Booking Type B
        </h1>
        <p className="mt-3 text-[#6B3A1E]/80">
          This is a placeholder for your second booking flow (e.g., corporate /
          quick booking). Plug your components here.
        </p>
      </div>
    </div>
  );
}
