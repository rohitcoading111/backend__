import api from "../../../services/api.js";

const unwrapResponse = (response) => response?.data?.data ?? response?.data ?? null;

export const getMyBankDetails = async () => {
  const response = await api.get("/organization-bank-details/my-bank-details");
  return unwrapResponse(response);
};

export const createMyBankDetails = async (payload) => {
  const response = await api.post("/organization-bank-details/my-bank-details", payload);
  return unwrapResponse(response);
};

export const updateMyBankDetails = async (payload) => {
  const response = await api.patch("/organization-bank-details/my-bank-details", payload);
  return unwrapResponse(response);
};

export const getAllOrganizationBankDetails = async () => {
  const response = await api.get("/organization-bank-details/super-admin");
  return unwrapResponse(response);
};

export const getOrganizationBankDetailsById = async (organizationId) => {
  const response = await api.get(`/organization-bank-details/super-admin/${organizationId}`);
  return unwrapResponse(response);
};
