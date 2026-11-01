import { useCallback, useEffect, useState } from "react";
import { getAllUsers } from "../services/adminService.js";

function useAdminUsers() {
  const [users, setUsers] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [usersError, setUsersError] = useState("");

  const fetchUsers = useCallback(async () => {
    try {
      setIsLoadingUsers(true);
      setUsersError("");

      const response = await getAllUsers();

      if (!response?.success) {
        throw new Error(
          response?.message || "Failed to fetch organization admins"
        );
      }

      const fetchedUsers = response?.data?.users;

      if (!Array.isArray(fetchedUsers)) {
        throw new Error("Invalid organization admins response");
      }

      setUsers(fetchedUsers);
    } catch (error) {
      setUsersError(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to load organization admins"
      );
    } finally {
      setIsLoadingUsers(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    isLoadingUsers,
    usersError,
    fetchUsers,
  };
}

export default useAdminUsers;