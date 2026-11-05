import { useMemo, useState } from "react";

import {
  Search,
  Building2,
  Mail,
  ShieldCheck,
  ShieldAlert,
  Ban,
  AlertCircle,
  LoaderCircle,
} from "lucide-react";

import {
  suspendOrganizationAdmin,
} from "../services/adminService.js";

function UsersTable({ users = [], onAdminSuspended }) {
  const [search, setSearch] = useState("");
  const [updatingUserId, setUpdatingUserId] = useState(null);
  const [actionError, setActionError] = useState("");

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return users;

    return users.filter((user) => {
      const organization =
        user.organizationId &&
        typeof user.organizationId === "object"
          ? user.organizationId
          : null;

      return [
        user.name,
        user.email,
        user.mobile,
        organization?.name,
        organization?.organizationType,
      ]
        .filter(Boolean)
        .some((value) =>
          String(value).toLowerCase().includes(query)
        );
    });
  }, [users, search]);

  const handleSuspend = async (user) => {
    const confirmed = window.confirm(
      `Are you sure you want to suspend ${user.name || user.email || "this admin"} and their organization?`
    );

    if (!confirmed) return;

    try {
      setUpdatingUserId(user._id);
      setActionError("");

      const response = await suspendOrganizationAdmin(user._id);

      if (response?.success === false) {
        throw new Error(
          response.message || "Unable to suspend organization"
        );
      }

      await onAdminSuspended?.();

    } catch (error) {
      setActionError(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to suspend organization admin"
      );
    } finally {
      setUpdatingUserId(null);
    }
  };

  return (
    <div>

      {/* Search and count */}
      <div className="flex flex-col gap-4 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">

        <div>
          <p className="text-sm font-semibold text-slate-800">
            All Administrators
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Search and manage organization accounts.
          </p>
        </div>

        <div className="relative w-full sm:max-w-xs">
          <Search
            size={17}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search admin or organization..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
          />
        </div>

      </div>

      {/* Error */}
      {actionError && (
        <div className="mx-5 mt-5 flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 p-4 sm:mx-7">
          <AlertCircle size={18} className="mt-0.5 shrink-0 text-red-500" />

          <p className="text-sm text-red-700">
            {actionError}
          </p>
        </div>
      )}

      {/* Empty State */}
      {filteredUsers.length === 0 ? (
        <div className="flex min-h-64 flex-col items-center justify-center px-5 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
            <Building2 size={25} className="text-slate-400" />
          </div>

          <h3 className="mt-4 text-base font-semibold text-slate-800">
            {search ? "No matching administrators" : "No administrators yet"}
          </h3>

          <p className="mt-2 max-w-sm text-sm text-slate-400">
            {search
              ? "Try searching with another name, email or organization."
              : "Approved organization administrator accounts will appear here."}
          </p>
        </div>
      ) : (

        /* Table */
        <div
          className="max-w-full overflow-x-auto overscroll-x-contain"
          role="region"
          aria-label="Organization administrator accounts"
          tabIndex={0}
        >
          <table className="w-full min-w-[950px] text-left">

            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/80">
                <th className="px-7 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Administrator
                </th>

                <th className="px-5 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Contact
                </th>

                <th className="px-5 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Organization
                </th>

                <th className="px-5 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Verification
                </th>

                <th className="px-5 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Status
                </th>

                <th className="px-7 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">

              {filteredUsers.map((user) => {
                const organization =
                  user.organizationId &&
                  typeof user.organizationId === "object"
                    ? user.organizationId
                    : null;

                const hasOrganization = Boolean(user.organizationId);

                const isSuspended =
                  user.adminStatus === "SUSPENDED" ||
                  organization?.status === "SUSPENDED";

                const needsSetup = !hasOrganization;

                const isUpdating = updatingUserId === user._id;

                const initials =
                  user.name
                    ?.trim()
                    ?.split(/\s+/)
                    ?.slice(0, 2)
                    ?.map((part) => part[0])
                    ?.join("")
                    ?.toUpperCase() ||
                  user.email?.[0]?.toUpperCase() ||
                  "A";

                return (
                  <tr
                    key={user._id || user.id}
                    className="group transition hover:bg-slate-50/80"
                  >

                    {/* Admin */}
                    <td className="px-7 py-5">
                      <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-sm font-bold text-white shadow-sm">
                          {initials}
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-slate-800">
                            {user.name || "Admin name unavailable"}
                          </p>

                          <p className="mt-1 text-[11px] text-slate-400">
                            Organization Admin
                          </p>
                        </div>

                      </div>
                    </td>

                    {/* Contact */}
                    <td className="px-5 py-5">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Mail size={14} className="shrink-0 text-slate-400" />

                        {user.email || user.mobile || "Not available"}
                      </div>
                    </td>

                    {/* Organization */}
                    <td className="px-5 py-5">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                          <Building2 size={16} className="text-slate-500" />
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-slate-700">
                            {organization?.name ||
                              (hasOrganization
                                ? "Organization details unavailable"
                                : "Not linked")}
                          </p>

                          <p className="mt-1 text-[11px] text-slate-400">
                            {organization?.organizationType || "Organization"}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Verification */}
                    <td className="px-5 py-5">
                      {user.isVerified ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700">
                          <ShieldCheck size={15} />
                          Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-700">
                          <AlertCircle size={15} />
                          Not verified
                        </span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="px-5 py-5">
                      {isSuspended ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-red-100 bg-red-50 px-3 py-1.5 text-[11px] font-bold text-red-700">
                          <ShieldAlert size={13} />
                          Suspended
                        </span>
                      ) : needsSetup ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-100 bg-amber-50 px-3 py-1.5 text-[11px] font-bold text-amber-700">
                          <AlertCircle size={13} />
                          Setup Required
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-[11px] font-bold text-emerald-700">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          Active
                        </span>
                      )}
                    </td>

                    {/* Action */}
                    <td className="px-7 py-5">
                      <button
                        type="button"
                        disabled={
                          isSuspended ||
                          needsSetup ||
                          Boolean(updatingUserId)
                        }
                        title={
                          needsSetup
                            ? "Link an organization before suspending this account"
                            : ""
                        }
                        onClick={() => handleSuspend(user)}
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-red-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-red-600 transition hover:border-red-300 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        {isUpdating ? (
                          <>
                            <LoaderCircle size={14} className="animate-spin" />
                            Suspending
                          </>
                        ) : isSuspended ? (
                          <>
                            <ShieldAlert size={14} />
                            Suspended
                          </>
                        ) : needsSetup ? (
                          <>
                            <AlertCircle size={14} />
                            Link Organization
                          </>
                        ) : (
                          <>
                            <Ban size={14} />
                            Suspend
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

      {/* Bottom */}
      {filteredUsers.length > 0 && (
        <div className="flex flex-col justify-between gap-2 border-t border-slate-100 bg-slate-50/50 px-5 py-4 text-xs text-slate-400 sm:flex-row sm:items-center sm:px-7">
          <p>
            Showing{" "}
            <span className="font-semibold text-slate-600">
              {filteredUsers.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-600">
              {users.length}
            </span>{" "}
            administrators
          </p>

          <p>Organization management</p>
        </div>
      )}

    </div>
  );
}

export default UsersTable;