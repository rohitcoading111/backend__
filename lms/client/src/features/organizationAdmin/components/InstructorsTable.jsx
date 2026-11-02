import {
  Users,
  Mail,
  Copy,
  UserMinus,
  RefreshCw,
  ShieldCheck,
  AlertCircle,
  Building2,
} from "lucide-react";

function InstructorsTable({
  instructors = [],
  isLoading = false,
  error = "",
  activeInstructorId = null,
  activeAction = "",
  onRemoveInstructor,
  onRefresh,
}) {
  const handleRemove = async (instructor) => {
    if (!instructor?._id || !onRemoveInstructor) return;

    const confirmed = window.confirm(
      `Remove ${instructor.name || "this instructor"} from your organization? Their account and Instructor ID will remain active.`
    );

    if (!confirmed) return;

    await onRemoveInstructor(instructor._id);
  };

  const handleCopy = async (code) => {
    if (!code) return;

    try {
      await navigator.clipboard.writeText(code);
    } catch {
      window.alert("Unable to copy Instructor ID.");
    }
  };

  const getInitials = (name = "") =>
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase() || "I";

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:p-6">

        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
            <Users size={21} className="text-emerald-600" />
          </div>

          <div>
            <h2 className="font-bold text-slate-900">
              Organization Instructors
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Manage instructors working in your organization.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="rounded-full bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
            {instructors.length} Instructors
          </span>

          {onRefresh && (
            <button
              type="button"
              onClick={onRefresh}
              disabled={isLoading}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
            >
              <RefreshCw
                size={14}
                className={isLoading ? "animate-spin" : ""}
              />
              Refresh
            </button>
          )}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="m-5 flex items-start gap-2 rounded-xl border border-red-100 bg-red-50 p-3.5 sm:mx-6">
          <AlertCircle
            size={17}
            className="mt-0.5 shrink-0 text-red-500"
          />

          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Loading */}
      {isLoading ? (
        <div className="flex min-h-56 flex-col items-center justify-center gap-3">
          <RefreshCw
            size={24}
            className="animate-spin text-indigo-500"
          />

          <p className="text-sm text-slate-500">
            Loading instructors...
          </p>
        </div>
      ) : instructors.length === 0 ? (
        /* Empty State */
        <div className="flex min-h-64 flex-col items-center justify-center px-5 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
            <Users size={25} className="text-slate-400" />
          </div>

          <h3 className="mt-4 text-base font-semibold text-slate-800">
            No instructors added yet
          </h3>

          <p className="mt-2 max-w-sm text-sm text-slate-400">
            Search for independent instructors and hire them to build
            your organization team.
          </p>
        </div>
      ) : (
        /* Instructor Table */
        <div className="overflow-x-auto">
          <table className="w-full min-w-[780px] text-left">

            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/80">
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Instructor
                </th>

                <th className="px-5 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Instructor ID
                </th>

                <th className="px-5 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Contact
                </th>

                <th className="px-5 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Employment
                </th>

                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {instructors.map((instructor) => {
                const instructorId = instructor._id || instructor.id;

                const isRemoving =
                  activeInstructorId === instructorId &&
                  activeAction === "REMOVE";

                return (
                  <tr
                    key={instructorId}
                    className="transition hover:bg-slate-50/80"
                  >

                    {/* Instructor */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-xs font-bold text-white">
                          {getInitials(instructor.name)}
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-slate-800">
                            {instructor.name || "Instructor"}
                          </p>

                          <p className="mt-1 text-[11px] text-slate-400">
                            Organization Instructor
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Instructor ID */}
                    <td className="px-5 py-5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-indigo-600">
                          {instructor.instructorCode || "—"}
                        </span>

                        {instructor.instructorCode && (
                          <button
                            type="button"
                            onClick={() =>
                              handleCopy(instructor.instructorCode)
                            }
                            title="Copy Instructor ID"
                            className="text-slate-400 hover:text-indigo-600"
                          >
                            <Copy size={14} />
                          </button>
                        )}
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="px-5 py-5">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Mail size={14} className="shrink-0 text-slate-400" />

                        <span>
                          {instructor.email || instructor.mobile || "—"}
                        </span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-5">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-[11px] font-bold text-emerald-700">
                        <ShieldCheck size={13} />
                        {instructor.employmentStatus || "ACTIVE"}
                      </span>
                    </td>

                    {/* Remove */}
                    <td className="px-6 py-5">
                      <button
                        type="button"
                        disabled={
                          Boolean(activeInstructorId) ||
                          !instructorId
                        }
                        onClick={() => handleRemove(instructor)}
                        className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {isRemoving ? (
                          <>
                            <RefreshCw
                              size={14}
                              className="animate-spin"
                            />
                            Removing...
                          </>
                        ) : (
                          <>
                            <UserMinus size={14} />
                            Remove
                          </>
                        )}
                      </button>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Footer */}
      {!isLoading && instructors.length > 0 && (
        <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/50 px-6 py-4">
          <p className="text-xs text-slate-400">
            Showing {instructors.length} organization instructors
          </p>

          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Building2 size={13} />
            Organization Team
          </div>
        </div>
      )}

    </section>
  );
}

export default InstructorsTable;