import {
  Search,
  UserRound,
  Mail,
  Copy,
  UserPlus,
  LoaderCircle,
  CheckCircle2,
  AlertCircle,
  X,
} from "lucide-react";

import { useState } from "react";
import useInstructorSearch from "../hooks/useInstructorSearch.js";

function InstructorSearch({
  onHireInstructor,
  activeInstructorId,
}) {
  const {
    identifier,
    setIdentifier,
    instructor,
    isSearching,
    error,
    hasSearched,
    handleSearch,
    clearSearch,
  } = useInstructorSearch();

  const [isHiring, setIsHiring] = useState(false);
  const [hireMessage, setHireMessage] = useState("");

  const handleHire = async () => {
    if (!instructor?._id || !onHireInstructor) return;

    const confirmed = window.confirm(
      `Are you sure you want to hire ${instructor.name} into your organization?`
    );

    if (!confirmed) return;

    try {
      setIsHiring(true);
      setHireMessage("");

      const success = await onHireInstructor(instructor._id);

      if (success) {
        setHireMessage("Instructor hired successfully.");
        clearSearch();
      }
    } finally {
      setIsHiring(false);
    }
  };

  const handleCopyCode = async () => {
    if (!instructor?.instructorCode) return;

    try {
      await navigator.clipboard.writeText(
        instructor.instructorCode
      );
    } catch {
      // Clipboard may be unavailable in some browser contexts.
    }
  };

  const isActionRunning =
    isHiring ||
    activeInstructorId === instructor?._id;

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}
      <div className="border-b border-slate-100 p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50">
            <UserPlus size={21} className="text-indigo-600" />
          </div>

          <div>
            <h2 className="font-bold text-slate-900">
              Add Instructor
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Find independent instructors using their ID or email.
            </p>
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6">

        {/* Search Form */}
        <form
          onSubmit={handleSearch}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={identifier}
              onChange={(event) => {
                setIdentifier(event.target.value);
              }}
              placeholder="Enter Instructor ID or email..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-10 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
            />

            {identifier && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={isSearching || !identifier.trim()}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSearching ? (
              <>
                <LoaderCircle size={16} className="animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search size={16} />
                Search
              </>
            )}
          </button>
        </form>

        {/* Error */}
        {error && (
          <div className="mt-4 flex items-start gap-2 rounded-xl border border-red-100 bg-red-50 p-3.5">
            <AlertCircle
              size={17}
              className="mt-0.5 shrink-0 text-red-500"
            />

            <p className="text-sm text-red-700">
              {error}
            </p>
          </div>
        )}

        {/* Search Result */}
        {instructor && (
          <div className="mt-5 rounded-2xl border border-indigo-100 bg-indigo-50/40 p-4 sm:p-5">

            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">

              {/* Instructor Info */}
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-lg font-bold text-indigo-700">
                  {instructor.name?.charAt(0)?.toUpperCase() || "I"}
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">
                    {instructor.name || "Instructor"}
                  </h3>

                  <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                    <Mail size={13} />
                    {instructor.email || "Email unavailable"}
                  </div>

                  {instructor.mobile && (
                    <p className="mt-1 text-xs text-slate-500">
                      {instructor.mobile}
                    </p>
                  )}
                </div>
              </div>

              {/* Employment Status */}
              <span className="w-fit rounded-full bg-emerald-100 px-3 py-1.5 text-[11px] font-bold text-emerald-700">
                {instructor.employmentStatus || "INDEPENDENT"}
              </span>

            </div>

            {/* Instructor Code */}
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-indigo-100 bg-white p-3.5">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Instructor ID
                </p>

                <p className="mt-1 text-sm font-bold text-indigo-700">
                  {instructor.instructorCode || "Not available"}
                </p>
              </div>

              <button
                type="button"
                onClick={handleCopyCode}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-indigo-600"
                title="Copy Instructor ID"
              >
                <Copy size={16} />
              </button>
            </div>

            {/* Hire Button */}
            <button
              type="button"
              onClick={handleHire}
              disabled={isActionRunning || Boolean(activeInstructorId)}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isActionRunning ? (
                <>
                  <LoaderCircle size={16} className="animate-spin" />
                  Hiring Instructor...
                </>
              ) : (
                <>
                  <UserPlus size={16} />
                  Hire Instructor
                </>
              )}
            </button>

          </div>
        )}

        {/* Not Found */}
        {!instructor && hasSearched && !error && (
          <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
            <p className="text-sm font-medium text-slate-700">
              No independent instructor found.
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Check the Instructor ID or registered email.
            </p>
          </div>
        )}

        {/* Helper */}
        {!hasSearched && !instructor && !error && (
          <p className="mt-4 text-xs text-slate-400">
            Only independent instructors can be hired into your organization.
          </p>
        )}

      </div>
    </section>
  );
}

export default InstructorSearch;