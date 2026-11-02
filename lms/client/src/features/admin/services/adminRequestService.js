import api from "../../../services/api.js";

const BASE_URL = "/admin-requests";

// Public: Submit organization registration request
export const createAdminRequest = async (payload) => {
  const response = await api.post(BASE_URL, payload);
  return response.data;
};

// Super Admin: Fetch pending and verified requests
export const getPendingAdminRequests = async () => {
  const response = await api.get(BASE_URL);
  return response.data;
};

// Super Admin: Verify request
export const verifyAdminRequest = async (requestId) => {
  const response = await api.patch(
    `${BASE_URL}/${requestId}/verify`
  );

  return response.data;
};

// Super Admin: Approve request
export const approveAdminRequest = async (requestId) => {
  const response = await api.patch(
    `${BASE_URL}/${requestId}/approve`
  );

  return response.data;
};

// Super Admin: Reject request
export const rejectAdminRequest = async (
  requestId,
  rejectionReason
) => {
  const response = await api.patch(
    `${BASE_URL}/${requestId}/reject`,
    { rejectionReason }
  );

  return response.data;
};