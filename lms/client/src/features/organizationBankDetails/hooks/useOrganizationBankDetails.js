import { useCallback, useEffect, useState } from "react";

import {
  createMyBankDetails,
  getAllOrganizationBankDetails,
  getMyBankDetails,
  getOrganizationBankDetailsById,
  updateMyBankDetails,
  uploadMyBankProof,
} from "../services/organizationBankDetailsService.js";

function useOrganizationBankDetails({ scope = "mine", organizationId = null } = {}) {
  const [bankDetails, setBankDetails] = useState(null);
  const [bankDetailsList, setBankDetailsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchBankDetails = useCallback(async ({ silent = false } = {}) => {
    try {
      if (!silent) {
        setIsLoading(true);
      }

      setError("");
      setSuccess("");

      if (scope === "all") {
        const payload = await getAllOrganizationBankDetails();
        setBankDetailsList(Array.isArray(payload) ? payload : []);
        setBankDetails(null);
        return;
      }

      if (scope === "single") {
        const payload = await getOrganizationBankDetailsById(organizationId);
        setBankDetails(payload || null);
        setBankDetailsList([]);
        return;
      }

      const payload = await getMyBankDetails();
      setBankDetails(payload || null);
      setBankDetailsList([]);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to load bank details."
      );
    } finally {
      if (!silent) {
        setIsLoading(false);
      }
    }
  }, [organizationId, scope]);

  const submitBankDetails = useCallback(async (payload) => {
    try {
      setError("");
      setSuccess("");

      const normalizedPayload = { ...payload };
      if (normalizedPayload.bankProof?.url === "") {
        delete normalizedPayload.bankProof;
      }

      let result;
      let createdAfterMissingRecord = false;

      if (bankDetails) {
        try {
          result = await updateMyBankDetails(normalizedPayload);
        } catch (err) {
          if (
            err?.response?.status !== 404 ||
            err?.response?.data?.message !== "Bank details not found"
          ) {
            throw err;
          }

          result = await createMyBankDetails(normalizedPayload);
          createdAfterMissingRecord = true;
        }
      } else {
        result = await createMyBankDetails(normalizedPayload);
      }

      setBankDetails(result || null);
      setSuccess(
        bankDetails && !createdAfterMissingRecord
          ? "Bank details updated successfully. Verification is pending again."
          : "Bank details submitted successfully. Verification is pending."
      );

      return result;
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Bank details submission failed.";

      setError(message);
      throw err;
    }
  }, [bankDetails]);

  const uploadBankProof = useCallback(async (file) => {
    const uploadedProof = await uploadMyBankProof(file);

    if (!uploadedProof?.url || !uploadedProof?.fileId) {
      throw new Error("The bank proof upload did not return a file URL.");
    }

    return uploadedProof;
  }, []);

  useEffect(() => {
    fetchBankDetails();
  }, [fetchBankDetails]);

  return {
    bankDetails,
    bankDetailsList,
    isLoading,
    error,
    success,
    fetchBankDetails,
    submitBankDetails,
    uploadBankProof,
    setBankDetails,
  };
}

export default useOrganizationBankDetails;
