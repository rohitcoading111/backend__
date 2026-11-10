import api from "../../../services/api.js";

const unwrapResponse = (response) => response?.data?.data ?? response?.data ?? {};

export const getOrganizationPolicyStatus = async () => {
  const response = await api.get("/organization-policies/current");
  return unwrapResponse(response);
};

export const acceptOrganizationPolicies = async () => {
  const response = await api.post("/organization-policies/accept", {});
  return unwrapResponse(response);
};
