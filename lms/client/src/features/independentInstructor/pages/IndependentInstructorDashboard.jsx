import { useSelector } from "react-redux";

import {
  GraduationCap,
  ShieldCheck,
  UserRound,
  Mail,
  Building2,
} from "lucide-react";

import InstructorIdCard from "../components/InstructorIdCard.jsx";
import AvailableOrganizations from "../components/AvailableOrganizations.jsx";

import useAvailableOrganizations from "../hooks/useAvailableOrganizations.js";

function IndependentInstructorDashboard() {
  const user = useSelector((state) => state.auth?.user);
  console.log("INSTRUCTOR REDUX USER:", user);

  const {
    organizations,
    filteredOrganizations,
    searchTerm,
    setSearchTerm,
    isLoading,
    error,
    fetchOrganizations,
  } = useAvailableOrganizations();

  return (
    <main className="min-h-screen bg-[#f4f6fb] px-4 py-7 text-slate-900 sm:px-6 lg:px-8 lg:py-9">

      <div className="mx-auto max-w-[1200px]">

        {/* Header */}
        <header className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-6 text-white shadow-xl sm:p-9">

          <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-center">

            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/10 px-3.5 py-1.5">
                <GraduationCap
                  size={15}
                  className="text-indigo-300"
                />

                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-indigo-200">
                  Independent Instructor Workspace
                </span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Welcome, {user?.name || "Instructor"}
              </h1>

              <p className="mt-3 max-w-lg text-sm leading-6 text-slate-300">
                Discover organizations, connect with administrators
                and explore opportunities to join an instructor team.
              </p>
            </div>

            <div className="relative flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15">
                <ShieldCheck
                  size={21}
                  className="text-emerald-300"
                />
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400">
                  Employment Status
                </p>

                <p className="mt-1 text-sm font-bold text-emerald-300">
                  Independent
                </p>
              </div>
            </div>

          </div>
        </header>

        {/* Profile Overview */}
        <section className="mt-7 grid gap-5 lg:grid-cols-2">

          {/* Permanent Instructor ID */}
          <InstructorIdCard user={user} />

          {/* Account Information */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50">
                <UserRound
                  size={21}
                  className="text-violet-600"
                />
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  Account Information
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Your instructor profile
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-5">

              <div>
                <p className="text-xs font-medium text-slate-400">
                  Full Name
                </p>

                <p className="mt-1.5 text-sm font-semibold text-slate-800">
                  {user?.name || "Not available"}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-400">
                  Registered Email
                </p>

                <div className="mt-1.5 flex items-center gap-2">
                  <Mail size={15} className="shrink-0 text-slate-400" />

                  <p className="break-all text-sm font-semibold text-slate-800">
                    {user?.email || "Not available"}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-400">
                  Account Role
                </p>

                <p className="mt-1.5 text-sm font-semibold text-slate-800">
                  {user?.role || "INSTRUCTOR"}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-400">
                  Organization
                </p>

                <div className="mt-1.5 flex items-center gap-2">
                  <Building2
                    size={15}
                    className="text-slate-400"
                  />

                  <p className="text-sm font-semibold text-slate-800">
                    Not hired yet
                  </p>
                </div>
              </div>

            </div>
          </section>

        </section>

        {/* Available Organizations */}
        <section className="mt-8">

          <AvailableOrganizations
            organizations={organizations}
            filteredOrganizations={filteredOrganizations}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            isLoading={isLoading}
            error={error}
            onRefresh={fetchOrganizations}
          />

        </section>

        {/* Footer */}
        <footer className="mt-8 flex flex-col justify-between gap-2 border-t border-slate-200 pt-5 text-xs text-slate-400 sm:flex-row">
          <p>LearnHub Instructor Workspace</p>

          <p>Independent Instructor Portal</p>
        </footer>

      </div>
    </main>
  );
}

export default IndependentInstructorDashboard;