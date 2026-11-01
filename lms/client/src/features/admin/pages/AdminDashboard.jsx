import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  RefreshCw,
  Building2,
  ArrowUpRight,
  LockKeyhole,
} from "lucide-react";

import AdminStats from "../components/AdminStats.jsx";
import UsersTable from "../components/UsersTable.jsx";
import useAdminUsers from "../hooks/useAdminUsers.js";

function AdminDashboard() {
  const {
    users,
    isLoadingUsers,
    usersError,
    fetchUsers,
  } = useAdminUsers();

  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-[#f4f6fb] px-4 py-6 text-slate-900 sm:px-6 lg:px-8 lg:py-9">
      <div className="mx-auto max-w-[1440px]">

        {/* Premium Header */}
        <header className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-6 py-8 text-white shadow-xl shadow-slate-900/10 sm:px-9 sm:py-10">

          {/* Background decoration */}
          <div className="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-40 right-1/3 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />

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

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2">
                  <Building2 size={15} className="text-indigo-300" />
                  <span className="text-xs font-medium text-slate-200">
                    Organization Management
                  </span>
                </div>

                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2">
                  <LockKeyhole size={15} className="text-indigo-300" />
                  <span className="text-xs font-medium text-slate-200">
                    Restricted Admin Access
                  </span>
                </div>
              </div>
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
                disabled={isLoadingUsers}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-lg transition hover:bg-indigo-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <RefreshCw
                  size={16}
                  className={isLoadingUsers ? "animate-spin" : ""}
                />

                {isLoadingUsers ? "Refreshing..." : "Refresh Data"}
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

        {/* Organization Admins */}
        <section className="mt-8 overflow-hidden rounded-[24px] border border-slate-200/80 bg-white shadow-sm shadow-slate-900/[0.03]">

          {/* Section Header */}
          <div className="flex flex-col justify-between gap-4 border-b border-slate-100 px-5 py-6 sm:flex-row sm:items-center sm:px-7">

            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50">
                  <Building2 size={18} className="text-indigo-600" />
                </div>

                <h2 className="text-lg font-bold tracking-tight text-slate-900">
                  Organization Administrators
                </h2>
              </div>

              <p className="mt-2 text-sm text-slate-500">
                View and manage approved organization accounts.
              </p>
            </div>

            {!isLoadingUsers && !usersError && (
              <div className="inline-flex w-fit items-center gap-2 rounded-full bg-slate-100 px-3.5 py-2">
                <span className="h-2 w-2 rounded-full bg-indigo-500" />

                <span className="text-xs font-semibold text-slate-600">
                  {users.length} Admin Accounts
                </span>
              </div>
            )}
          </div>

          {/* Error */}
          {usersError && (
            <div className="flex flex-wrap items-center justify-between gap-3 p-8">
              <p className="text-sm text-red-600">{usersError}</p>

              <button
                type="button"
                onClick={fetchUsers}
                className="rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-100"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Loading */}
          {isLoadingUsers && (
            <div className="flex min-h-64 flex-col items-center justify-center gap-3">
              <RefreshCw size={25} className="animate-spin text-indigo-500" />

              <p className="text-sm font-medium text-slate-500">
                Loading organization administrators...
              </p>
            </div>
          )}

          {/* Table */}
          {!isLoadingUsers && !usersError && (
            <UsersTable
              users={users}
              onAdminSuspended={fetchUsers}
            />
          )}
        </section>

        {/* Footer */}
        <footer className="mt-7 flex flex-col justify-between gap-2 border-t border-slate-200 pt-5 text-xs text-slate-400 sm:flex-row sm:items-center">
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