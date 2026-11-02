import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Building2,
  Users,
  UserCheck,
  ShieldCheck,
  RefreshCw,
  LogOut,
  GraduationCap,
} from "lucide-react";

import InstructorSearch from "../components/InstructorSearch.jsx";
import InstructorsTable from "../components/InstructorsTable.jsx";

import useOrganizationInstructors from "../hooks/useOrganizationInstructors.js";

import { logoutUser } from "../../auth/authThunk/authThunks.js";
import { logout } from "../../auth/authSlices/authSlice.js";

function OrganizationAdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth?.user);

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const {
    instructors,
    isLoading,
    error,
    success,
    activeInstructorId,
    activeAction,
    fetchInstructors,
    handleHireInstructor,
    handleRemoveInstructor,
  } = useOrganizationInstructors();

  const organizationName =
    typeof user?.organizationId === "object"
      ? user.organizationId?.name
      : null;

  const handleLogout = async () => {
    if (isLoggingOut) return;

    try {
      setIsLoggingOut(true);

      await dispatch(logoutUser()).unwrap();
    } catch (err) {
      console.error("Logout failed:", err);

      // Clear local authentication even if logout API fails.
      dispatch(logout());
    } finally {
      navigate("/login", { replace: true });
      setIsLoggingOut(false);
    }
  };

  const handleHire = async (userId) => {
    return handleHireInstructor(userId);
  };

  const handleRemove = async (instructorId) => {
    return handleRemoveInstructor(instructorId);
  };

  const activeInstructors = instructors.filter(
    (instructor) => instructor.employmentStatus === "ACTIVE"
  ).length;

  return (
    <main className="min-h-screen bg-[#f4f6fb] px-4 py-6 text-slate-900 sm:px-6 lg:px-8 lg:py-9">
      <div className="mx-auto max-w-[1440px]">

        {/* Header */}
        <header className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-6 py-8 text-white shadow-xl sm:px-9 sm:py-10">

          <div className="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />

          <div className="relative z-10 flex flex-col justify-between gap-7 md:flex-row md:items-center">

            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/10 px-3.5 py-1.5">
                <Building2 size={14} className="text-indigo-300" />

                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-200">
                  Organization Workspace
                </span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Organization Dashboard
              </h1>

              <p className="mt-3 text-sm text-slate-300 sm:text-base">
                {organizationName || "Manage your organization and instructor team."}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3">

                <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-medium text-slate-200">
                  <ShieldCheck size={15} className="text-emerald-300" />
                  Organization Admin
                </span>

                <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-medium text-slate-200">
                  <GraduationCap size={15} className="text-indigo-300" />
                  Instructor Management
                </span>

              </div>
            </div>

            {/* Actions */}
            <div className="relative flex flex-wrap items-center gap-3">

              <button
                type="button"
                onClick={fetchInstructors}
                disabled={isLoading || isLoggingOut}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-indigo-50 disabled:opacity-50"
              >
                <RefreshCw
                  size={16}
                  className={isLoading ? "animate-spin" : ""}
                />

                Refresh
              </button>

              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-200 transition hover:bg-red-500/20 disabled:opacity-50"
              >
                <LogOut size={16} />

                {isLoggingOut ? "Logging out..." : "Logout"}
              </button>

            </div>
          </div>
        </header>

        {/* Stats */}
        <section className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">
                Total Instructors
              </p>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50">
                <Users size={21} className="text-indigo-600" />
              </div>
            </div>

            <p className="mt-4 text-3xl font-bold text-slate-900">
              {isLoading ? "—" : instructors.length}
            </p>

            <p className="mt-2 text-xs text-slate-400">
              Instructors in your organization
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">
                Active Instructors
              </p>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
                <UserCheck size={21} className="text-emerald-600" />
              </div>
            </div>

            <p className="mt-4 text-3xl font-bold text-slate-900">
              {isLoading ? "—" : activeInstructors}
            </p>

            <p className="mt-2 text-xs text-slate-400">
              Currently active team members
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">
                Organization Status
              </p>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                <Building2 size={21} className="text-blue-600" />
              </div>
            </div>

            <p className="mt-4 text-2xl font-bold text-emerald-600">
              Active
            </p>

            <p className="mt-2 text-xs text-slate-400">
              Organization workspace
            </p>
          </div>

        </section>

        {/* Hire Instructor */}
        <section className="mt-8">
          <InstructorSearch
            onHireInstructor={handleHire}
            activeInstructorId={activeInstructorId}
          />
        </section>

        {/* Action Feedback */}
        {success && (
          <div className="mt-5 rounded-xl border border-emerald-100 bg-emerald-50 p-4 text-sm font-medium text-emerald-700">
            {success}
          </div>
        )}

        {error && (
          <div className="mt-5 rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Instructors */}
        <section className="mt-8">
          <InstructorsTable
            instructors={instructors}
            isLoading={isLoading}
            error=""
            activeInstructorId={activeInstructorId}
            activeAction={activeAction}
            onRemoveInstructor={handleRemove}
            onRefresh={fetchInstructors}
          />
        </section>

        {/* Footer */}
        <footer className="mt-8 flex flex-col justify-between gap-2 border-t border-slate-200 pt-5 text-xs text-slate-400 sm:flex-row">
          <p>LearnHub Organization Management</p>

          <p>Secure Organization Workspace</p>
        </footer>

      </div>
    </main>
  );
}

export default OrganizationAdminDashboard;