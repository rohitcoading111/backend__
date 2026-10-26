
import api from "../../../services/api.js";

// Fetch all registered users from the backend.
export const getAllUsers = async () => {
  const response = await api.get("/admin/users");

  // Return the backend response body to the caller.
  return response.data;
};

// Update a specific user's role.
export const updateUserRole = async (userId, newRole) => {
  const response = await api.patch(
    `/admin/users/${userId}/role`,
    {
      role: newRole,
    }
  );

  // Return the updated user response from the backend.
  return response.data;
};
