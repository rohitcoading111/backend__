
import { useState } from "react";
import { updateUserRole } from "../services/adminService.js";

function UsersTable({ users, onUserUpdated }) {
  // Stores the ID of the user currently being updated.
  const [updatingUserId, setUpdatingUserId] = useState(null);

  // Stores errors from role updates.
  const [roleUpdateError, setRoleUpdateError] = useState("");

  const handleRoleChange = async (user) => {
    // Decide which role the user should receive next.
    const newRole =
      user.role === "STUDENT" ? "INSTRUCTOR" : "STUDENT";

    // Ask for confirmation before making the API request.
    const confirmed = window.confirm(
      `Change ${user.name || "this user's"} role to ${newRole}?`
    );

    if (!confirmed) return;

    try {
      setUpdatingUserId(user._id);
      setRoleUpdateError("");


const response = await updateUserRole(user._id, newRole);

if (!response?.success) {
  throw new Error(response?.message || "Failed to update role");
}

// Backend se aaya updated user.
const updatedUser = response.data;

// Wahi updatedUser parent ke function ko bhejo.
onUserUpdated?.(updatedUser);

    } catch (error) {
      setRoleUpdateError(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to update user role"
      );
    } finally {
      // Allow buttons to be used again after the request finishes.
      setUpdatingUserId(null);
    }
  };

  return (
    <div>
      {/* Display role-update errors inside the table. */}
      {roleUpdateError && (
        <p className="border-b border-red-100 bg-red-50 p-4 text-sm text-red-600">
          {roleUpdateError}
        </p>
      )}

      {users.length === 0 ? (
        <p className="p-8 text-center text-sm text-neutral-500">
          No users found.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="bg-neutral-50 text-xs uppercase tracking-wide text-neutral-500">
              <tr>
                <th className="px-5 py-4 font-medium">User</th>
                <th className="px-5 py-4 font-medium">Email / Mobile</th>
                <th className="px-5 py-4 font-medium">Role</th>
                <th className="px-5 py-4 font-medium">Verified</th>
                <th className="px-5 py-4 font-medium">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-neutral-100">
              {users.map((user) => {
                const isUpdating = updatingUserId === user._id;
                const isAdmin = user.role === "ADMIN";

                return (
                  <tr key={user._id || user.id}>
                    <td className="px-5 py-4 font-medium">
                      {user.name || "Unnamed user"}
                    </td>

                    <td className="px-5 py-4 text-neutral-600">
                      {user.email || user.mobile || "—"}
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium">
                        {user.role}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-neutral-600">
                      {user.isVerified ? "Verified" : "Not verified"}
                    </td>

                    <td className="px-5 py-4">
                      {isAdmin ? (
                        <span className="text-xs text-neutral-400">
                          Admin account
                        </span>
                      ) : (
                        <button
                          type="button"
                          disabled={Boolean(updatingUserId)}
                          onClick={() => handleRoleChange(user)}
                          className="whitespace-nowrap rounded-lg border border-indigo-200 px-3 py-2 text-xs font-semibold text-indigo-700 transition hover:bg-indigo-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {isUpdating
                            ? "Updating..."
                            : user.role === "STUDENT"
                              ? "Promote to Instructor"
                              : "Change to Student"}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default UsersTable;
