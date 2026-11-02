import api from "../../../services/api.js";

// Fetch active organizations available to independent instructors
export const getAvailableOrganizations = async () => {
  const response = await api.get("/organizations/available");

  return response.data;
};