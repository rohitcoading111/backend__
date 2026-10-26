
import { useCallback, useEffect, useState } from "react";
import {
  getAllUsers,
} from "../services/adminService.js";

function useAdminUsers() {
  // Stores the complete list of users displayed in the dashboard.
  const [users, setUsers] = useState([]);

  // Tracks whether the user list is loading.
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);

  // Stores errors related to fetching users.
  const [usersError, setUsersError] = useState("");

  // Fetch the latest users list from the backend.
  const fetchUsers = useCallback(async () => {
    try {
      setIsLoadingUsers(true);
      setUsersError("");

      const response = await getAllUsers();

      if (!response?.success) {
        throw new Error(
          response?.message || "Failed to fetch users"
        );
      }

      // Expected response: { success: true, data: { users: [] } }
      const fetchedUsers = response?.data?.users;

      if (!Array.isArray(fetchedUsers)) {
        throw new Error("Invalid users response");
      }

      setUsers(fetchedUsers);
    } catch (error) {
      setUsersError(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to load users"
      );
    } finally {
      setIsLoadingUsers(false);
    }
  }, []);

  // Replace the matching user with the updated user from the API.

const updateUserInList = (updatedUser) => {
  // Updated user ki ID backend response se nikaalo.
  const updatedUserId = updatedUser._id || updatedUser.id;

  // Existing users list ko latest state se read karo.
  setUsers((previousUsers) => {
    return previousUsers.map((currentUser) => {
      const currentUserId = currentUser._id || currentUser.id;

      // Agar ID match hai, toh updated user ka data use karo.
      if (currentUserId === updatedUserId) {
        return {
          ...currentUser,
          ...updatedUser,
        };
      }

      // Baaki users ko unchanged rakho.
      return currentUser;
    });
  });
};


  // Fetch users when the dashboard first mounts.
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Expose state and functions to the dashboard.
  return {
    users,
    isLoadingUsers,
    usersError,
    fetchUsers,
    updateUserInList,
  };
}

export default useAdminUsers;
