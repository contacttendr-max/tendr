// src/components/FloatingChatButton.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import router from "../router";
import ChatVendorPickerModal from "./ChatVendorPickerModal";
import useConversations from "../hooks/useConversations";

function SimpleChoiceModal({ open, onClose, onPick }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center" aria-modal="true" role="dialog">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden="true" />
      <div className="relative z-[61] w-[92%] max-w-sm rounded-2xl bg-white p-5 shadow-2xl border border-gray-200">
        <div className="text-lg font-semibold mb-3">Start a chat</div>
        <div className="text-sm text-gray-600 mb-5">Who would you like to chat with?</div>

        <div className="space-y-3">
          <button
            onClick={() => onPick("vendor")}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-left hover:bg-gray-50 active:scale-[.99] transition"
          >
            <div className="font-medium">Vendor chat</div>
            <div className="text-xs text-gray-500">Talk directly with a vendor about your event.</div>
          </button>

        <button
            onClick={() => onPick("support")}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-left hover:bg-gray-50 active:scale-[.99] transition"
          >
            <div className="font-medium">Support</div>
            <div className="text-xs text-gray-500">Chat with Tendr Support / Concierge.</div>
          </button>
        </div>

        <button onClick={onClose} className="mt-4 w-full text-center text-sm text-gray-500 hover:text-gray-700">
          Cancel
        </button>
      </div>
    </div>
  );
}

export default function FloatingChatButton({ hideOnRoutes = ["/chat", "/chats"] }) {
  const bookingType = useSelector((s) => s?.eventPlanning?.bookingType) || "";
  const selectedVendors = useSelector((s) => s?.eventPlanning?.selectedVendors) || [];
  const formFilters = useSelector((s) => s?.eventPlanning?.formData) || {};
  const activeVendor = useSelector((s) => s?.chat?.activeVendor) || null;
  const unreadCount = useSelector((s) => s?.chat?.unreadTotal || 0);
  const chatThreads = useSelector((s) => s?.chat?.threads || []);

  // Load conversations from API (now safe if 404)
  const { vendors: apiVendors } = useConversations({ enabled: true });

  const [path, setPath] = useState(() => router.state.location.pathname);
  useEffect(() => {
    const unsub = router.subscribe(() => setPath(router.state.location.pathname));
    return unsub;
  }, []);
  const shouldHide = useMemo(
    () => hideOnRoutes.some((base) => path === base || path.startsWith(base + "/")),
    [path, hideOnRoutes]
  );

  const [choiceOpen, setChoiceOpen] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);

  // Prefer server vendors, then existing chat threads, then selected vendors
  const popupVendors = useMemo(() => {
    if (Array.isArray(apiVendors) && apiVendors.length) return apiVendors;

    if (Array.isArray(chatThreads) && chatThreads.length) {
      return chatThreads.map((t) => ({
        _id: t.vendor?._id ?? t.vendorId ?? t.id,
        name: t.vendor?.name ?? t.name ?? "Vendor",
        lastMessage: t.lastMessage ?? "",
        unreadCount: t.unreadCount ?? 0,
        approved: t.vendor?.approved ?? true,
      }));
    }

    if (Array.isArray(selectedVendors) && selectedVendors.length) {
      return selectedVendors.map((v) => ({
        _id: v._id || v.id,
        name: v.name || "Vendor",
        lastMessage: "",
        unreadCount: 0,
        approved: true,
      }));
    }

    return [];
  }, [apiVendors, chatThreads, selectedVendors]);

  const resolveActiveVendor = () => {
    if (activeVendor && (activeVendor._id || activeVendor.id)) {
      return { ...activeVendor, approved: activeVendor.approved ?? true };
    }
    if (Array.isArray(selectedVendors) && selectedVendors.length === 1) {
      return { ...selectedVendors[0], approved: true };
    }
    return { _id: "concierge", name: "Tendr Concierge", approved: true };
  };

  const handleButtonClick = () => setChoiceOpen(true);

  const handlePickChoice = (choice) => {
    setChoiceOpen(false);

    if (choice === "support") {
      const vendor = { _id: "concierge", name: "Tendr Support", approved: true };
      router.navigate("/chat", { state: { vendor, filters: formFilters } });
      return;
    }

    if (!bookingType) {
      alert("Please select a booking type or fill the form first.");
      return;
    }

    if (bookingType === "let-us-do-it") {
      const vendor = resolveActiveVendor();
      router.navigate("/chat", { state: { vendor, filters: formFilters } });
      return;
    }

    setPickerOpen(true); // "you-do-it" → open vendor picker
  };

  const handlePickVendor = (vendor) => {
    setPickerOpen(false);
    router.navigate("/chat", { state: { vendor: { ...vendor, approved: true }, filters: formFilters } });
  };

  if (shouldHide) return null;

  return (
    <>
      <button
        aria-label="Open chat"
        onClick={handleButtonClick}
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full shadow-lg bg-yellow-400 hover:bg-yellow-500 active:scale-95 text-black px-5 py-3 transition"
        style={{ boxShadow: "0 12px 28px rgba(0,0,0,0.18)" }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M21 12c0 4.418-4.03 8-9 8-1.071 0-2.097-.162-3.05-.464L3 21l1.55-4.05C4.2 15.97 4 14.999 4 14c0-4.418 4.03-8 9-8s8 3.582 8 6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="font-semibold">Chat</span>

        {unreadCount > 0 && (
          <span className="ml-1 inline-flex items-center justify-center text-xs font-bold bg-red-500 text-white rounded-full w-5 h-5">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      <SimpleChoiceModal open={choiceOpen} onClose={() => setChoiceOpen(false)} onPick={handlePickChoice} />

      <ChatVendorPickerModal
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onPick={handlePickVendor}
        vendors={popupVendors}
      />
    </>
  );
}
