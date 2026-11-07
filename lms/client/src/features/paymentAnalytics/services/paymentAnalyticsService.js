import api from "../../../services/api.js";

const unwrapResponse = (response) => response?.data?.data ?? response?.data ?? {};

export const getSuperAdminPaymentAnalytics = async () => {
  const response = await api.get("/payment-analytics/super-admin");
  return unwrapResponse(response);
};

export const getOrganizationAdminPaymentAnalytics = async () => {
  const response = await api.get("/payment-analytics/organization");
  return unwrapResponse(response);
};

export const getOrganizationPaymentAnalytics = async (organizationId) => {
  const response = await api.get(`/payment-analytics/organization/${organizationId}`);
  return unwrapResponse(response);
};
