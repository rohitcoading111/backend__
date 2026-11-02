import { useCallback, useEffect, useState } from "react";

import {
  getOrganizationDetails,
} from "../services/organizationAdminService.js";

function useOrganizationDashboard() {
  const [organization, setOrganization] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrganization = useCallback(async ({ silent = false } = {}) => {
    try {
      if (!silent) {
        setIsLoading(true);
      }

      setError("");

      const response = await getOrganizationDetails();

      if (!response?.success) {
        throw new Error(
          response?.message || "Failed to fetch organization details"
        );
      }

      // Supports { data: { organization } }
      // and { data: organization } response formats.
      const organizationData =
        response?.data?.organization ??
        response?.data;

      if (
        !organizationData ||
        typeof organizationData !== "object" ||
        Array.isArray(organizationData)
      ) {
        throw new Error("Invalid organization response");
      }

      setOrganization(organizationData);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to load organization details"
      );
    } finally {
      if (!silent) {
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    fetchOrganization();
  }, [fetchOrganization]);

  return {
    organization,
    isLoading,
    error,
    fetchOrganization,
  };
}

export default useOrganizationDashboard;