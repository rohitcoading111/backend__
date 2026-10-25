import AdminStats from "../components/AdminStats.jsx";
import UsersTable from "../components/UsersTable.jsx";
import useAdminUsers from "../hooks/useAdminUsers.js";

function AdminDashboard() {
  const { users, loading, error, refreshUsers,updateUserInList } = useAdminUsers();

  return (
    <main className="min-h-screen bg-[#f7f7f5] p-6 sm:p-10">
      <div className="mx-auto max-w-7xl">
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

          <button
            type="button"
            onClick={refreshUsers}
            disabled={loading}
            className="rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm font-medium transition hover:bg-neutral-50 disabled:opacity-50"
          >
            {loading ? "Loading..." : "Refresh users"}
          </button>
        </div>

        {error && (
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-200 bg-white p-4">
            <p className="text-sm text-red-600">{error}</p>
            <button
              type="button"
              onClick={refreshUsers}
              className="text-sm font-semibold text-red-700"
            >
              Try again
            </button>
          </div>
        )}

        {!error && !loading && (
          <div className="mt-8">
            <AdminStats users={users} />
          </div>
        )}

        <section className="mt-8 overflow-hidden rounded-2xl border border-black/[0.07] bg-white">
          <div className="border-b border-black/[0.06] p-5">
            <h2 className="font-semibold">All Users</h2>
            <p className="mt-1 text-sm text-neutral-500">
              Registered LearnHub accounts
            </p>
          </div>

          {loading ? (
            <p className="p-8 text-sm text-neutral-500">
              Loading users...
            </p>
          ) : error ? null : (
            <UsersTable
                users={users}
                onRoleUpdated={updateUserInList}
                />
          )}
        </section>
      </div>
    </main>
  );
}

export default AdminDashboard;
