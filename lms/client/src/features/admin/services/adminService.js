
import api from "../../../services/api";

// Get all users
export const getAllUsers = async () => {
  const response = await api.get("/admin/users");
  return response.data;
};

// Update a user's role
export const updateUserRole = async (userId, role) => {
  const response = await api.patch(`/admin/users/${userId}/role`, {
    role,
  });

  return response.data;
};
