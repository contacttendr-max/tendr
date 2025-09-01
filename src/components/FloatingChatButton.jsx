import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import router from "../router";
import ChatVendorPickerModal from "./ChatVendorPickerModal";

/**
 * Floating Chat Button (no layout required)
 * Behaviour:
 *  - bookingType empty  -> alert to select booking type / fill form
 *  - "you-do-it"       -> open center popup to pick vendor, then /chat with state
 *  - "let-us-do-it"    -> open /chat directly with resolved vendor
 * Auto-hides on /chat and /chats.
 */
export default function FloatingChatButton({
  hideOnRoutes = ["/chat", "/chats"],
}) {
  // Redux reads
  const bookingType = useSelector((s) => s?.eventPlanning?.bookingType) || "";
  const selectedVendors = useSelector((s) => s?.eventPlanning?.selectedVendors) || [];
  const formFilters = useSelector((s) => s?.eventPlanning?.formData) || {};
  const activeVendor = useSelector((s) => s?.chat?.activeVendor) || null;
  const unreadCount = useSelector((s) => s?.chat?.unreadTotal || 0);
  const chatThreads = useSelector((s) => s?.chat?.threads || []); // optional [{vendor, lastMessage, unreadCount}]

  // Path tracking to hide on chat pages
  const [path, setPath] = useState(() => router.state.location.pathname);
  useEffect(() => {
    const unsub = router.subscribe(() => setPath(router.state.location.pathname));
    return unsub;
  }, []);

  const shouldHide = useMemo(
    () => hideOnRoutes.some((base) => path === base || path.startsWith(base + "/")),
    [path, hideOnRoutes]
  );

  // Popup state
  const [pickerOpen, setPickerOpen] = useState(false);

  // Build vendor list for the popup:
  // 1) Prefer chat threads' vendors (with lastMessage/unread)
  // 2) Else use selectedVendors from eventPlanning
  // 3) Else fallback to sample vendors
  const popupVendors = useMemo(() => {
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
    // Fallback sample vendors
    return [
      {
        _id: "sample1",
        name: "Chopra Decors",
        lastMessage: "Floral + lighting within budget.",
        unreadCount: 1,
        approved: true,
      },
      {
        _id: "sample2",
        name: "Zest Caterers",
        lastMessage: "Menu options for 250 pax.",
        unreadCount: 0,
        approved: true,
      },
      {
        _id: "sample3",
        name: "Pixel Photographers",
        lastMessage: "Wedding portfolio sent.",
        unreadCount: 3,
        approved: true,
      },
    ];
  }, [chatThreads, selectedVendors]);

  // Resolve vendor for let-us-do-it
  const resolveActiveVendor = () => {
    if (activeVendor && (activeVendor._id || activeVendor.id)) {
      return { ...activeVendor, approved: activeVendor.approved ?? true };
    }
    if (Array.isArray(selectedVendors) && selectedVendors.length === 1) {
      return { ...selectedVendors[0], approved: true };
    }
    return { _id: "concierge", name: "Tendr Concierge", approved: true };
  };

  // Handlers
  const handleButtonClick = () => {
    if (!bookingType) {
      alert("Please select a booking type or fill the form first.");
      return;
    }

    if (bookingType === "let-us-do-it") {
      const vendor = resolveActiveVendor();
      router.navigate("/chat", { state: { vendor, filters: formFilters } });
      return;
    }

    // "you-do-it" -> open vendor picker modal
    setPickerOpen(true);
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
        className="
          fixed bottom-5 right-5 z-50
          flex items-center gap-2
          rounded-full shadow-lg
          bg-yellow-400 hover:bg-yellow-500 active:scale-95
          text-black
          px-5 py-3
          transition
        "
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

      {/* Centered popup for "you-do-it" */}
      <ChatVendorPickerModal
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onPick={handlePickVendor}
        vendors={popupVendors}
      />
    </>
  );
}
