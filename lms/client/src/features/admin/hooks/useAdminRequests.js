import { useCallback, useEffect, useState } from "react";

import {
  getPendingAdminRequests,
  verifyAdminRequest,
  approveAdminRequest,
  rejectAdminRequest,
} from "../services/adminRequestService.js";

function useAdminRequests() {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [activeRequestId, setActiveRequestId] = useState(null);
  const [activeAction, setActiveAction] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Initial fetch and background refresh
  const fetchRequests = useCallback(async ({ silent = false } = {}) => {
    try {
      if (!silent) setIsLoading(true);

      setError("");

      const response = await getPendingAdminRequests();

      if (!response?.success) {
        throw new Error(
          response?.message || "Failed to fetch organization requests"
        );
      }

      const fetchedRequests = response?.data?.requests;

      if (!Array.isArray(fetchedRequests)) {
        throw new Error("Invalid organization requests response");
      }

      setRequests(fetchedRequests);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to load organization requests"
      );
    } finally {
      if (!silent) setIsLoading(false);
    }
  }, []);

  // Common action handler
  const executeAction = async (requestId, action, apiFunction) => {
    if (activeRequestId) return false;

    try {
      setActiveRequestId(requestId);
      setActiveAction(action);
      setError("");
      setSuccess("");

      const response = await apiFunction();

      if (response?.success === false) {
        throw new Error(
          response?.message || "Unable to process request"
        );
      }

      setSuccess(
        response?.message || "Request updated successfully"
      );

      await fetchRequests({ silent: true });

      return true;
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to process organization request"
      );

      return false;
    } finally {
      setActiveRequestId(null);
      setActiveAction("");
    }
  };

  const handleVerify = (requestId) =>
    executeAction(requestId, "VERIFY", () =>
      verifyAdminRequest(requestId)
    );

  const handleApprove = (requestId) =>
    executeAction(requestId, "APPROVE", () =>
      approveAdminRequest(requestId)
    );

  const handleReject = (requestId, rejectionReason) =>
    executeAction(requestId, "REJECT", () =>
      rejectAdminRequest(requestId, rejectionReason)
    );

  // Fetch when dashboard opens.
  // Poll every 30 seconds while dashboard remains open.
  // Refresh immediately when user returns to the tab.
  useEffect(() => {
    fetchRequests();

    const intervalId = window.setInterval(() => {
      fetchRequests({ silent: true });
    }, 30000);

    const handleWindowFocus = () => {
      fetchRequests({ silent: true });
    };

    window.addEventListener("focus", handleWindowFocus);

    return () => {
      window.clearInterval(intervalId);
      window.removeEventListener("focus", handleWindowFocus);
    };
  }, [fetchRequests]);

  return {
    requests,
    isLoading,
    activeRequestId,
    activeAction,
    error,
    success,
    fetchRequests,
    handleVerify,
    handleApprove,
    handleReject,
  };
}

export default useAdminRequests;