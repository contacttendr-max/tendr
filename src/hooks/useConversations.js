// src/hooks/useConversations.js
import { useEffect, useMemo, useState, useCallback } from "react";
import { fetchConversations, mapConversationsToVendors } from "../apis/conversationsApi";

export default function useConversations({ enabled = true } = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [conversations, setConversations] = useState([]);

  const refetch = useCallback(async (signal) => {
    try {
      setLoading(true);
      setError("");
      const list = await fetchConversations({ signal });
      setConversations(Array.isArray(list) ? list : []);
    } catch (e) {
      const status = e?.status ?? e?.response?.status;
      const msg = e?.message || String(e) || "";
      // Treat 404 like "no conversations yet" (don’t leak dev-ish text into UI)
      if (status === 404 || (/\/conversations/.test(msg) && /404/.test(msg))) {
        setConversations([]);
        setError("");
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const ctrl = new AbortController();
    refetch(ctrl.signal);
    return () => ctrl.abort();
  }, [enabled, refetch]);

  const vendors = useMemo(
    () => mapConversationsToVendors(conversations || []),
    [conversations]
  );

  // Public API
  const reload = useCallback(() => refetch(), [refetch]);

  return { loading, error, conversations, vendors, reload };
}
