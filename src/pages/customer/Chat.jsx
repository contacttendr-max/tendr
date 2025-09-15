import React, { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Paperclip, X as XIcon, Image as ImageIcon } from "lucide-react";
import logo from "../../assets/logos/tendr-logo-secondary.png";
import user from "../../assets/ui/user-avatar.png";
import partyBackground from "../../assets/ui/party-bg.jpeg";
import BasicSpeedDial from "../../components/BasicSpeedDial";

/* ---------- existing filters compiler (kept) ---------- */
const compileFiltersMessage = (filters = {}) => {
  return `
Guest: ${filters.guest || "N/A"}
Location: ${filters.location || "N/A"}
Date: ${filters.date || "N/A"}
Time: ${filters.time || "N/A"}
Food Type: ${filters.foodType || "N/A"}
Decor Theme: ${filters.decorTheme || "N/A"}

Are you available?
`.trim();
};

/* ---------- NEW: booking header compiler ---------- */
const formatINR = (v) =>
  v == null || v === "" ? "N/A" : `₹${Number(v).toLocaleString("en-IN")}`;

const compileBookingHeader = ({
  formData = {},
  selectedVendors = [],
  bookingType,
  extraRequirements,
  extraRequirementsText = "",
}) => {
  const {
    eventName,
    eventType,
    guests,
    budget,
    location,
    date,
    time,
    additionalInfo,
  } = formData;

  const vendorNames = (selectedVendors || []).map((v) =>
    typeof v === "string" ? v : v?.name || v?.title || v?._id || "Vendor"
  );

  const lines = [
    eventName ? `Event: ${eventName}` : null,
    eventType ? `Type: ${eventType}` : null,
    date ? `Date: ${date}` : null,
    time ? `Time: ${time}` : null,
    guests ? `Guests: ${guests}` : null,
    budget ? `Budget: ${formatINR(budget)}` : null,
    location ? `Location: ${location}` : null,
    vendorNames.length ? `Vendors: ${vendorNames.join(" | ")}` : null,
    bookingType ? `Booking Type: ${bookingType}` : null,
    additionalInfo ? `Notes: ${additionalInfo}` : null,
    extraRequirements && extraRequirementsText
      ? `Extra Requirements: ${extraRequirementsText}`
      : extraRequirements
        ? `Extra Requirements: Yes`
        : null,
  ].filter(Boolean);

  return lines.join("  •  ");
};

const MAX_FILES = 10;
const MAX_MB = 10; // per file
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

const Chat = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // state from navigation (supports both flows)
  const {
    vendor: navVendor,
    filters: navFilters,
    from, // "booking" when coming from the booking button
    bookingType,
    formData,
    selectedVendors,
    extraRequirements,
    extraRequirementsText,
  } = location.state || {};

  // fallback vendor so /chat works even without state
  const fallbackVendor = { _id: "concierge", name: "Tendr Concierge", approved: true };
  const vendor = navVendor || fallbackVendor;
  const vendorApproved = vendor?.approved || false;

  // keep old filters behaviour
  const filters = navFilters || {};

  const [message, setMessage] = useState("");
  const [isVendorTyping, setIsVendorTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const [hasSentInitialMessage, setHasSentInitialMessage] = useState(false);

  // NEW: attachments selected but not yet sent
  const [pendingAttachments, setPendingAttachments] = useState([]); // [{url, file, name, size, type, id}]
  const fileInputRef = useRef(null);

  // Prepare booking header (sticky)
  const bookingHeader = useMemo(() => {
    if (from !== "booking") return "";
    return compileBookingHeader({
      formData,
      selectedVendors,
      bookingType,
      extraRequirements,
      extraRequirementsText,
    });
  }, [
    from,
    formData,
    selectedVendors,
    bookingType,
    extraRequirements,
    extraRequirementsText,
  ]);

  // Initial message ONLY for filters flow (kept as-is)
  useEffect(() => {
    if (from === "booking") return; // don't auto-send a message for booking; header is enough
    if (filters && !hasSentInitialMessage && Object.keys(filters).length > 0) {
      const initialMessage = { text: compileFiltersMessage(filters), sender: "user" };
      setMessages([initialMessage]);
      setHasSentInitialMessage(true);
    }
  }, [hasSentInitialMessage, filters, from]);

  // Cleanup object URLs when component unmounts
  useEffect(() => {
    return () => {
      pendingAttachments.forEach((a) => URL.revokeObjectURL(a.url));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUserTyping = (e) => {
    setMessage(e.target.value);
    clearTimeout(window.vendorTypingTimeout);
    window.vendorTypingTimeout = setTimeout(() => {
      setIsVendorTyping(true);
    }, 1000);
  };

  const openFilePicker = () => {
    if (!fileInputRef.current) return;
    fileInputRef.current.click();
  };

  const handleFilesChosen = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    // basic validations
    const currentCount = pendingAttachments.length;
    const availableSlots = Math.max(0, MAX_FILES - currentCount);
    const slice = files.slice(0, availableSlots);

    const rejected = [];
    const accepted = [];

    slice.forEach((file) => {
      const tooBig = file.size > MAX_MB * 1024 * 1024;
      const badType = !ACCEPTED_TYPES.includes(file.type);
      if (tooBig || badType) {
        rejected.push({ name: file.name, reason: tooBig ? `>${MAX_MB}MB` : "type" });
        return;
      }
      const url = URL.createObjectURL(file);
      accepted.push({
        id: `${file.name}-${file.size}-${Date.now()}`,
        url,
        file,
        name: file.name,
        size: file.size,
        type: file.type,
      });
    });

    if (rejected.length) {
      const msg = rejected
        .map((r) => `• ${r.name} (${r.reason})`)
        .join("\n");
      alert(
        `Some files were not added:\n${msg}\n\nAllowed: JPG/PNG/WebP/GIF, up to ${MAX_MB}MB each.`
      );
    }

    if (currentCount + accepted.length >= MAX_FILES) {
      alert(`You can attach up to ${MAX_FILES} images per message.`);
    }

    setPendingAttachments((prev) => [...prev, ...accepted]);
    // reset input so selecting same file again retriggers onChange
    e.target.value = "";
  };

  const removePendingAttachment = (id) => {
    setPendingAttachments((prev) => {
      const found = prev.find((p) => p.id === id);
      if (found) URL.revokeObjectURL(found.url);
      return prev.filter((p) => p.id !== id);
    });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!vendorApproved) return;

    const trimmed = message.trim();
    const hasImages = pendingAttachments.length > 0;

    if (!trimmed && !hasImages) return;

    const userMessage = {
      text: trimmed || "",
      sender: "user",
      attachments: hasImages
        ? pendingAttachments.map((a) => ({
          url: a.url,
          name: a.name,
          type: a.type,
          size: a.size,
        }))
        : undefined,
      ts: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");

    // Clear pending attachments (keep object URLs alive in the message UI)
    setPendingAttachments([]);

    // Simulated vendor reply
    setIsVendorTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text:
            "Thanks! Got your details" +
            (hasImages ? " and photos" : "") +
            ". I’ll revert shortly.",
          sender: "vendor",
          ts: Date.now(),
        },
      ]);
      setIsVendorTyping(false);
    }, 1500);
  };

  return (
    <div
      className="w-full min-h-screen flex flex-col"
      style={{
        backgroundImage: `url(${partyBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundColor: "#fdf6f3", // fallback matching the image tone
      }}
    >
      <BasicSpeedDial />

      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-white sticky top-0 z-50">
        <img
          src={logo}
          alt="logo"
          className="w-40 md:w-48 cursor-pointer"
          onClick={() => navigate("/")}
        />
        <div className="flex items-center space-x-8">
          <button
            className="font-semibold text-sm text-gray-700"
            onClick={() => navigate("/plan-event")}
          >
            Group Planning
          </button>
          <img
            src={user}
            alt="User Profile"
            className="w-9 h-9 object-cover rounded-full border border-gray-300"
          />
        </div>
      </nav>

      {/* Sticky Booking Header (only when from === "booking") */}
      {bookingHeader && (
        <div className="sticky top-[64px] z-40 bg-[#fff7f3] border-b border-[#ffd7c7]">
          <div className="max-w-5xl mx-auto px-4 py-3 text-sm text-gray-800">
            <span className="font-semibold text-[#ea7e53] mr-2">Booking Details:</span>
            <span className="whitespace-pre-wrap">{bookingHeader}</span>
          </div>
        </div>
      )}

      {/* Chat Section */}
      <div className="flex-1 flex flex-col p-4 overflow-y-auto space-y-4 bg-white bg-opacity-40 rounded-t-2xl shadow-lg mb-28">
        <div className="self-center text-sm text-gray-700">
          Chatting with <b>{vendor?.name || "Vendor"}</b>
        </div>

        {messages.map((msg, idx) => (
          <div key={msg.ts || idx} className={`${msg.sender === "user" ? "self-end" : "self-start"} mb-2`}>
            <div
              className={`${msg.sender === "user" ? "bg-yellow-100" : "bg-white"
                } p-3 rounded-2xl shadow-md max-w-xs`}
            >
              {!!msg.text && (
                <p className="text-sm text-gray-700 whitespace-pre-line">{msg.text}</p>
              )}

              {/* Render attachments if any */}
              {Array.isArray(msg.attachments) && msg.attachments.length > 0 && (
                <div className={`mt-2 grid gap-2 ${msg.attachments.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
                  {msg.attachments.map((att, i) => (
                    <a
                      key={i}
                      href={att.url}
                      target="_blank"
                      rel="noreferrer"
                      className="block"
                      title={att.name}
                    >
                      <img
                        src={att.url}
                        alt={att.name || "attachment"}
                        className="w-full h-28 object-cover rounded-xl border"
                      />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {isVendorTyping && (
          <div className="self-start flex items-center space-x-1">
            <div className="w-2 h-2 bg-gray-600 rounded-full animate-ping"></div>
            <div className="w-2 h-2 bg-gray-600 rounded-full animate-ping delay-200"></div>
            <div className="w-2 h-2 bg-gray-600 rounded-full animate-ping delay-400"></div>
            <p className="text-sm text-gray-600">Vendor is typing...</p>
          </div>
        )}
      </div>

      {/* Pending attachment previews (above input) */}
      {pendingAttachments.length > 0 && (
        <div className="fixed bottom-20 left-0 right-0 z-50">
          <div className="mx-auto max-w-3xl px-4">
            <div className="bg-white rounded-2xl shadow-lg p-3 border">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <ImageIcon className="w-4 h-4" />
                  <span>Attachments ({pendingAttachments.length}/{MAX_FILES})</span>
                </div>
                <span className="text-[11px] text-gray-500">
                  Allowed: JPG/PNG/WebP/GIF • up to {MAX_MB}MB each
                </span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {pendingAttachments.map((att) => (
                  <div key={att.id} className="relative group">
                    <img
                      src={att.url}
                      alt={att.name}
                      className="w-full h-24 object-cover rounded-xl border"
                    />
                    <button
                      type="button"
                      onClick={() => removePendingAttachment(att.id)}
                      className="absolute -top-2 -right-2 bg-black/70 hover:bg-black text-white rounded-full p-1"
                      aria-label="Remove"
                      title="Remove"
                    >
                      <XIcon className="w-3 h-3" />
                    </button>
                    <div className="mt-1 text-[11px] text-gray-600 truncate" title={att.name}>
                      {att.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Input */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-inner p-3 z-50">
        <form onSubmit={handleSendMessage} className="mx-auto max-w-3xl flex items-center gap-2">
          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            multiple
            onChange={handleFilesChosen}
            className="hidden"
          />

          {/* Attach button */}
          <button
            type="button"
            onClick={openFilePicker}
            className={`flex items-center justify-center shrink-0 rounded-full border px-3 py-3 ${vendorApproved ? "border-gray-300 hover:bg-gray-50" : "border-gray-200 bg-gray-100 cursor-not-allowed"
              }`}
            disabled={!vendorApproved}
            title="Attach photos"
            aria-label="Attach photos"
          >
            <Paperclip className="w-5 h-5" />
          </button>

          {/* Message input */}
          <input
            type="text"
            placeholder={vendorApproved ? "Write your requirements" : "Waiting for vendor approval..."}
            value={message}
            onChange={handleUserTyping}
            disabled={!vendorApproved}
            className={`flex-1 p-3 rounded-full border ${vendorApproved ? "border-gray-300" : "border-gray-200 bg-gray-100"
              } focus:outline-none focus:ring-2 ${vendorApproved ? "focus:ring-yellow-400" : ""
              } text-sm`}
          />

          {/* Send button */}
          <button
            type="submit"
            disabled={!vendorApproved}
            className={`shrink-0 ${vendorApproved ? "bg-yellow-400 hover:bg-yellow-500" : "bg-gray-300 cursor-not-allowed"
              } text-white font-semibold px-6 py-3 rounded-full text-sm`}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
