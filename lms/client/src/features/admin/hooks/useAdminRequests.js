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

  // Fetch requests
  const fetchRequests = useCallback(async () => {
    try {
      setIsLoading(true);
      setError("");

      const response = await getPendingAdminRequests();

      if (!response?.success) {
        throw new Error(
          response?.message || "Failed to fetch requests"
        );
      }

      const fetchedRequests = response?.data?.requests;

      if (!Array.isArray(fetchedRequests)) {
        throw new Error("Invalid admin requests response");
      }

      setRequests(fetchedRequests);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to load organization requests"
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Common action handler
  const executeAction = async (
    requestId,
    actionName,
    actionFunction
  ) => {
    try {
      setActiveRequestId(requestId);
      setActiveAction(actionName);
      setError("");
      setSuccess("");

      const response = await actionFunction();

      if (response?.success === false) {
        throw new Error(
          response.message || "Request action failed"
        );
      }

      setSuccess(
        response?.message || "Request updated successfully"
      );

      await fetchRequests();

      return true;
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to process request"
      );

      return false;
    } finally {
      setActiveRequestId(null);
      setActiveAction("");
    }
  };

  // Verify
  const handleVerify = (requestId) =>
    executeAction(requestId, "VERIFY", () =>
      verifyAdminRequest(requestId)
    );

  // Approve
  const handleApprove = (requestId) =>
    executeAction(requestId, "APPROVE", () =>
      approveAdminRequest(requestId)
    );

  // Reject
  const handleReject = (requestId, rejectionReason) =>
    executeAction(requestId, "REJECT", () =>
      rejectAdminRequest(requestId, rejectionReason)
    );

  useEffect(() => {
    fetchRequests();
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