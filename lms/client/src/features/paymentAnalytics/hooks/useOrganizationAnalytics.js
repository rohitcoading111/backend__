import { useCallback, useEffect, useState } from "react";

import {
  getOrganizationAdminPaymentAnalytics,
  getOrganizationPaymentAnalytics,
} from "../services/paymentAnalyticsService.js";

function useOrganizationAnalytics(organizationId) {
  const [analytics, setAnalytics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAnalytics = useCallback(async ({ silent = false } = {}) => {
    try {
      if (!silent) {
        setIsLoading(true);
      }

      setError("");

      const payload = organizationId
        ? await getOrganizationPaymentAnalytics(organizationId)
        : await getOrganizationAdminPaymentAnalytics();

      const normalizedAnalytics = payload?.data || payload || null;

      setAnalytics(normalizedAnalytics);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to load organization analytics."
      );
    } finally {
      if (!silent) {
        setIsLoading(false);
      }
    }
  }, [organizationId]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  return {
    analytics,
    isLoading,
    error,
    fetchAnalytics,
  };
}

export default useOrganizationAnalytics;
