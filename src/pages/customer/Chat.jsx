import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/logos/tendr-logo-secondary.png";
import user from "../../assets/ui/user-avatar.png";
import partyBackground from "../../assets/ui/party-bg.jpeg";
import BasicSpeedDial from "../../components/BasicSpeedDial";

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

const Chat = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // fallback so /chat works even without state
  const fallbackVendor = { _id: "concierge", name: "Tendr Concierge", approved: true };
  const { vendor: navVendor, filters: navFilters } = location.state || {};
  const vendor = navVendor || fallbackVendor;
  const filters = navFilters || {};
  const vendorApproved = vendor?.approved || false;

  const [message, setMessage] = useState("");
  const [isVendorTyping, setIsVendorTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const [hasSentInitialMessage, setHasSentInitialMessage] = useState(false);

  useEffect(() => {
    if (filters && !hasSentInitialMessage && Object.keys(filters).length > 0) {
      const initialMessage = { text: compileFiltersMessage(filters), sender: "user" };
      setMessages([initialMessage]);
      setHasSentInitialMessage(true);
    }
  }, [hasSentInitialMessage, filters]);

  const handleUserTyping = (e) => {
    setMessage(e.target.value);
    clearTimeout(window.vendorTypingTimeout);
    window.vendorTypingTimeout = setTimeout(() => {
      setIsVendorTyping(true);
    }, 1000);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!vendorApproved) return;

    if (message.trim()) {
      const userMessage = { text: message, sender: "user" };
      setMessages((prev) => [...prev, userMessage]);
      setMessage("");

      setIsVendorTyping(true);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            text: "Thank you for your message! I'll get back to you shortly with a detailed response.",
            sender: "vendor",
          },
        ]);
        setIsVendorTyping(false);
      }, 2000);
    }
  };

  return (
    <div
      className="w-full min-h-screen flex flex-col"
      style={{
        backgroundImage: `url(${partyBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
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

      {/* Chat Section */}
      <div className="flex-1 flex flex-col p-4 overflow-y-auto space-y-4 bg-white bg-opacity-40 rounded-t-2xl shadow-lg mb-20">
        <div className="self-center text-sm text-gray-700">
          Chatting with <b>{vendor?.name || "Vendor"}</b>
        </div>

        {messages.map((msg, idx) => (
          <div key={idx} className={`${msg.sender === "user" ? "self-end" : "self-start"} mb-4`}>
            <div
              className={`${msg.sender === "user" ? "bg-yellow-100" : "bg-white"} p-3 rounded-2xl shadow-md max-w-xs`}
            >
              <p className="text-sm text-gray-700 whitespace-pre-line">{msg.text}</p>
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

      {/* Chat Input */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-inner p-4 z-50">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <input
            type="text"
            placeholder={vendorApproved ? "Write your requirements" : "Waiting for vendor approval..."}
            value={message}
            onChange={handleUserTyping}
            disabled={!vendorApproved}
            className={`flex-1 p-3 rounded-full border ${
              vendorApproved ? "border-gray-300" : "border-gray-200 bg-gray-100"
            } focus:outline-none focus:ring-2 ${vendorApproved ? "focus:ring-yellow-400" : ""} text-sm`}
          />
          <button
            type="submit"
            disabled={!vendorApproved}
            className={`${
              vendorApproved ? "bg-yellow-400 hover:bg-yellow-500" : "bg-gray-300 cursor-not-allowed"
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
