import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  ShieldCheck,
  RefreshCw,
  Building2,
  LogOut,
} from "lucide-react";

import AdminStats from "../components/AdminStats.jsx";
import UsersTable from "../components/UsersTable.jsx";
import useAdminUsers from "../hooks/useAdminUsers.js";

import AdminRequestsSection from
  "../components/AdminRequestsSection.jsx";

import { logoutUser } from "../../auth/authThunk/authThunks.js";
import { logout } from "../../auth/authSlices/authSlice.js";

function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const {
    users,
    isLoadingUsers,
    usersError,
    fetchUsers,
  } = useAdminUsers();

  const handleLogout = async () => {
    if (isLoggingOut) return;

    try {
      setIsLoggingOut(true);

      // Backend logout: revoke refresh token / clear cookie.
      await dispatch(logoutUser()).unwrap();

    } catch (error) {
      console.error("Logout request failed:", error);

      // Even if API fails, clear local Redux authentication.
      dispatch(logout());

    } finally {
      navigate("/login", { replace: true });
      setIsLoggingOut(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f4f6fb] px-4 py-6 text-slate-900 sm:px-6 lg:px-8 lg:py-9">
      <div className="mx-auto max-w-[1440px]">

        {/* Header */}
        <header className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-6 py-8 text-white shadow-xl sm:px-9 sm:py-10">

          <div className="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />

          <div className="relative z-10 flex flex-col justify-between gap-7 md:flex-row md:items-center">

            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/10 px-3.5 py-1.5">
                <ShieldCheck size={14} className="text-indigo-300" />

                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-200">
                  Platform Management
                </span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Super Admin Dashboard
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
                Manage organizations, oversee administrator accounts
                and maintain your LearnHub platform.
              </p>
            </div>

            {/* Header Actions */}
            <div className="relative flex flex-wrap items-center gap-3">

              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/20">
                  <ShieldCheck size={17} className="text-indigo-300" />
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-400">
                    Account Type
                  </p>

                  <p className="text-sm font-semibold text-white">
                    Super Admin
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={fetchUsers}
                disabled={isLoadingUsers || isLoggingOut}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-indigo-50 disabled:opacity-50"
              >
                <RefreshCw
                  size={16}
                  className={isLoadingUsers ? "animate-spin" : ""}
                />

                Refresh
              </button>

              {/* Logout */}
              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-200 transition hover:border-red-400/50 hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <LogOut size={16} />

                {isLoggingOut ? "Logging out..." : "Logout"}
              </button>

            </div>
          </div>
        </header>

        {/* Statistics */}
        <section className="mt-7">
          {usersError ? (
            <div className="rounded-2xl border border-red-200 bg-white p-5">
              <p className="text-sm font-medium text-red-600">
                Unable to load dashboard statistics.
              </p>
            </div>
          ) : isLoadingUsers ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-36 animate-pulse rounded-2xl border border-slate-200 bg-white"
                />
              ))}
            </div>
          ) : (
            <AdminStats users={users} />
          )}
        </section>

        {/* Organization Requests */}
        <AdminRequestsSection />

        {/* Organization Administrators */}
        <section className="mt-8 overflow-hidden rounded-[24px] border border-slate-200/80 bg-white shadow-sm">

          <div className="flex flex-col justify-between gap-4 border-b border-slate-100 px-5 py-6 sm:flex-row sm:items-center sm:px-7">

            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50">
                  <Building2 size={18} className="text-indigo-600" />
                </div>

                <h2 className="text-lg font-bold text-slate-900">
                  Organization Administrators
                </h2>
              </div>

              <p className="mt-2 text-sm text-slate-500">
                View and manage approved organization accounts.
              </p>
            </div>

            {!isLoadingUsers && !usersError && (
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-slate-100 px-3.5 py-2 text-xs font-semibold text-slate-600">
                <span className="h-2 w-2 rounded-full bg-indigo-500" />
                {users.length} Admin Accounts
              </span>
            )}
          </div>

          {usersError && (
            <div className="flex flex-wrap items-center justify-between gap-3 p-8">
              <p className="text-sm text-red-600">
                {usersError}
              </p>

              <button
                type="button"
                onClick={fetchUsers}
                className="text-sm font-semibold text-red-700"
              >
                Try Again
              </button>
            </div>
          )}

          {isLoadingUsers ? (
            <div className="p-8 text-sm text-slate-500">
              Loading organization administrators...
            </div>
          ) : usersError ? null : (
            <UsersTable
              users={users}
              onAdminSuspended={fetchUsers}
            />
          )}
        </section>

        {/* Footer */}
        <footer className="mt-7 flex flex-col justify-between gap-2 border-t border-slate-200 pt-5 text-xs text-slate-400 sm:flex-row">
          <p>LearnHub Platform Administration</p>

          <p className="flex items-center gap-1.5">
            <ShieldCheck size={13} />
            Secure Super Admin Panel
          </p>
        </footer>

      </div>
    </main>
  );
}

export default AdminDashboard;