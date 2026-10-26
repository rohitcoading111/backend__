
import AdminStats from "../components/AdminStats.jsx";
import UsersTable from "../components/UsersTable.jsx";
import useAdminUsers from "../hooks/useAdminUsers.js";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  // Get the users list, loading state, errors, and update functions.
  const {
    users,
    isLoadingUsers,
    usersError,
    fetchUsers,
    updateUserInList,
  } = useAdminUsers();
 const navigate = useNavigate();
  return (
    <main className="min-h-screen bg-[#f7f7f5] p-6 sm:p-10">
      <div className="mx-auto max-w-7xl">
        {/* Dashboard heading and refresh button. */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
              Platform management
            </p>

            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              Admin Dashboard
            </h1>

            <p className="mt-2 text-sm text-neutral-500">
              Manage students and instructor accounts.
            </p>
          </div>

         <div className="flex flex-wrap items-center justify-between gap-4">


  <div className="flex flex-wrap gap-3">
    {/* Go to Dashboard button */}
    <button
      type="button"
      onClick={() => navigate("/dashboard")}
      className="rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm font-medium transition hover:bg-neutral-50"
    >
      ← Go to Dashboard
    </button>

    {/* Existing Refresh Users button */}
    <button
      type="button"
      onClick={fetchUsers}
      disabled={isLoadingUsers}
      className="rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm font-medium transition hover:bg-neutral-50 disabled:opacity-50"
    >
      {isLoadingUsers ? "Loading..." : "Refresh users"}
    </button>
  </div>
</div>
        </div>
        

        {/* Show fetch errors and allow retrying. */}
        {usersError && (
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-200 bg-white p-4">
            <p className="text-sm text-red-600">{usersError}</p>

            <button
              type="button"
              onClick={fetchUsers}
              className="text-sm font-semibold text-red-700"
            >
              Try again
            </button>
          </div>
        )}

        {/* Show statistics once users have loaded successfully. */}
        {!usersError && !isLoadingUsers && (
          <div className="mt-8">
            <AdminStats users={users} />
          </div>
        )}

        {/* Users table section. */}
        <section className="mt-8 overflow-hidden rounded-2xl border border-black/[0.07] bg-white">
          <div className="border-b border-black/[0.06] p-5">
            <h2 className="font-semibold">All Users</h2>
            <p className="mt-1 text-sm text-neutral-500">
              Registered LearnHub accounts
            </p>
          </div>

          {isLoadingUsers ? (
            <p className="p-8 text-sm text-neutral-500">
              Loading users...
            </p>
          ) : usersError ? null : (
            <UsersTable
              users={users}
              onUserUpdated={updateUserInList}
            />
          )}
        </section>
      </div>
    </main>
  );
}

export default AdminDashboard;
