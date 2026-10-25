import { useCallback, useEffect, useState } from "react";
import { getAllUsers } from "../services/adminService.js";

function useAdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAllUsers();

      if (!response?.success) {
        throw new Error(response?.message || "Failed to fetch users");
      }

      if (!Array.isArray(response?.data?.users)) {
        throw new Error("Invalid users response");
      }

      setUsers(response.data.users);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to load users"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);


const updateUserInList = (updatedUser) => {
  const newUsers = [];

  for (const user of users) {
    if (user._id === updatedUser.id) {
      newUsers.push({ ...user, ...updatedUser });
    } else {
      newUsers.push(user);
    }
  }

  setUsers(newUsers);
};


  return { users, loading, error, refreshUsers: fetchUsers ,updateUserInList};
}

export default useAdminUsers;
