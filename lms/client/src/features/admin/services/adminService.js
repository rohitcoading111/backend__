import api from "../../../services/api.js";

// Fetch Organization Admins for Super Admin
export const getAllUsers = async () => {
  const response = await api.get("/admin/users");
  return response.data;
};

// Suspend Organization Admin and its Organization
export const suspendOrganizationAdmin = async (userId) => {
  const response = await api.patch(
    `/admin/users/${userId}/suspend`
  );

  return response.data;
};