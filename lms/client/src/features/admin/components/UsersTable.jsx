
function UsersTable({ users }) {
  if (users.length === 0) {
    return (
      <div className="p-8 text-center text-sm text-neutral-500">
        No users found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[650px] text-left text-sm">
        <thead className="bg-neutral-50 text-xs uppercase tracking-wide text-neutral-500">
          <tr>
            <th className="px-5 py-4 font-medium">User</th>
            <th className="px-5 py-4 font-medium">Email / Mobile</th>
            <th className="px-5 py-4 font-medium">Role</th>
            <th className="px-5 py-4 font-medium">Verified</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-neutral-100">
          {users.map((user) => (
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersTable;
