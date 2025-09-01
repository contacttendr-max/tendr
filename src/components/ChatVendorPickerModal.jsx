import React, { useEffect } from "react";

/**
 * Centered popup to choose a vendor to chat with.
 * Props:
 *  - open: boolean
 *  - onClose: fn()
 *  - onPick: fn(vendor)
 *  - vendors: Array<{ _id, name, lastMessage?, unreadCount?, approved? }>
 */
export default function ChatVendorPickerModal({ open, onClose, onPick, vendors = [] }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden="true" />

      {/* Dialog */}
      <div className="relative bg-white w-[92vw] max-w-lg rounded-2xl shadow-xl p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Choose a vendor to chat</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100"
            aria-label="Close"
            title="Close"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* List */}
        {vendors.length === 0 ? (
          <div className="p-4 text-sm text-gray-600">No vendors to show.</div>
        ) : (
          <ul className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
            {vendors.map((v) => (
              <li
                key={v._id || v.id}
                className="border rounded-xl p-3 hover:shadow cursor-pointer transition bg-white"
                onClick={() => onPick?.(v)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gray-200" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium truncate">{v.name || "Vendor"}</h3>
                      {v.unreadCount > 0 && (
                        <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 font-semibold">
                          {v.unreadCount} new
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 truncate">{v.lastMessage || "Tap to open chat"}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Footer */}
        <div className="mt-4 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 text-sm rounded-xl border hover:bg-gray-50">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
