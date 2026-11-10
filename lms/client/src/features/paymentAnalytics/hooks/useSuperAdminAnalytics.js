import { useCallback, useEffect, useState } from "react";

import {
  getSuperAdminPaymentAnalytics,
} from "../services/paymentAnalyticsService.js";

function useSuperAdminAnalytics() {
  const [summary, setSummary] = useState({
    totalOrganizations: 0,
    totalStudents: 0,
    totalRevenue: 0,
    grossRevenue: 0,
    gstDeduction: 0,
    razorpayFee: 0,
    platformFee: 0,
    totalDeductions: 0,
    payableAmount: 0,
    totalTransactions: 0,
  });
  const [organizations, setOrganizations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAnalytics = useCallback(async ({ silent = false } = {}) => {
    try {
      if (!silent) {
        setIsLoading(true);
      }

      setError("");

      const payload = await getSuperAdminPaymentAnalytics();

      const normalizedSummary = payload?.summary || {};
      const normalizedOrganizations = Array.isArray(payload?.organizations)
        ? payload.organizations
        : [];

      setSummary({
        totalOrganizations: normalizedSummary.totalOrganizations || 0,
        totalStudents: normalizedSummary.totalStudents || 0,
        totalRevenue: normalizedSummary.totalRevenue || 0,
        grossRevenue:
          normalizedSummary.grossRevenue ??
          normalizedSummary.totalRevenue ??
          0,
        gstDeduction: normalizedSummary.gstDeduction ?? 0,
        razorpayFee: normalizedSummary.razorpayFee ?? 0,
        platformFee: normalizedSummary.platformFee ?? 0,
        totalDeductions: normalizedSummary.totalDeductions ?? 0,
        payableAmount: normalizedSummary.payableAmount ?? 0,
        totalTransactions: normalizedSummary.totalTransactions || 0,
      });
      setOrganizations(normalizedOrganizations);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to load payment analytics."
      );
    } finally {
      if (!silent) {
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  return {
    summary,
    organizations,
    isLoading,
    error,
    fetchAnalytics,
  };
}

export default useSuperAdminAnalytics;
