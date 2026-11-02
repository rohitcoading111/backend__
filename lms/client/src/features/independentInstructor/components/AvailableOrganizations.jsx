import {
  Building2,
  Mail,
  Search,
  RefreshCw,
  ExternalLink,
  AlertCircle,
  Users,
} from "lucide-react";

function AvailableOrganizations({
  organizations = [],
  filteredOrganizations = [],
  searchTerm = "",
  setSearchTerm,
  isLoading,
  error,
  onRefresh,
}) {
  const createMailLink = (email, organizationName) => {
    const subject = encodeURIComponent(
      `Instructor Partnership Inquiry - ${organizationName}`
    );

    const body = encodeURIComponent(
      `Hello,

I am an independent instructor registered on LearnHub.

I would like to discuss the possibility of joining ${organizationName} as an instructor.

Please let me know if your organization is currently onboarding instructors.

Regards`
    );

    return `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <section className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm">

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:p-6">

        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50">
            <Building2 size={21} className="text-indigo-600" />
          </div>

          <div>
            <h2 className="font-bold text-slate-900">
              Available Organizations
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Discover organizations and contact their administrators.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="rounded-full bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-700">
            {organizations.length} Organizations
          </span>

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
        </div>

      </div>

      {/* Search */}
      <div className="border-b border-slate-100 p-5 sm:px-6">

        <div className="relative">
          <Search
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search organization by name or email..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
          />
        </div>

        {!isLoading && !error && (
          <p className="mt-2 text-xs text-slate-400">
            Showing {filteredOrganizations.length} matching organizations
          </p>
        )}

      </div>

      {/* Loading */}
      {isLoading ? (
        <div className="flex min-h-60 flex-col items-center justify-center gap-3">
          <RefreshCw
            size={24}
            className="animate-spin text-indigo-500"
          />

          <p className="text-sm text-slate-500">
            Loading organizations...
          </p>
        </div>
      ) : error ? (
        /* Error */
        <div className="flex min-h-60 flex-col items-center justify-center px-5 text-center">

          <AlertCircle size={28} className="text-red-500" />

          <h3 className="mt-4 font-semibold text-slate-800">
            Unable to load organizations
          </h3>

          <p className="mt-2 max-w-sm text-xs leading-5 text-red-500">
            {error}
          </p>

          <button
            type="button"
            onClick={onRefresh}
            className="mt-5 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-indigo-500"
          >
            Try Again
          </button>

        </div>
      ) : filteredOrganizations.length === 0 ? (
        /* Empty */
        <div className="flex min-h-60 flex-col items-center justify-center px-5 text-center">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
            <Building2 size={25} className="text-slate-400" />
          </div>

          <h3 className="mt-4 font-semibold text-slate-800">
            {searchTerm
              ? "No matching organizations"
              : "No organizations available"}
          </h3>

          <p className="mt-2 max-w-sm text-xs leading-5 text-slate-400">
            {searchTerm
              ? "Try another organization name or email."
              : "Active organizations will appear here when available."}
          </p>

          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="mt-4 text-xs font-semibold text-indigo-600 hover:text-indigo-700"
            >
              Clear Search
            </button>
          )}

        </div>
      ) : (
        /* Organization Cards */
        <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6 xl:grid-cols-3">

          {filteredOrganizations.map((organization, index) => (
            <article
              key={`${organization.email}-${index}`}
              className="rounded-2xl border border-slate-200 p-5 transition duration-200 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-md"
            >

              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50">
                  <Building2 size={21} className="text-indigo-600" />
                </div>

                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
                  Active
                </span>
              </div>

              <h3 className="mt-5 break-words text-base font-bold text-slate-900">
                {organization.name || "Organization"}
              </h3>

              <div className="mt-3 flex items-start gap-2 text-sm text-slate-500">
                <Mail
                  size={15}
                  className="mt-0.5 shrink-0 text-slate-400"
                />

                <span className="break-all">
                  {organization.email}
                </span>
              </div>

              {organization.email ? (
                <a
                  href={createMailLink(
                    organization.email,
                    organization.name || "Organization"
                  )}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-xs font-semibold text-white transition hover:bg-indigo-500"
                >
                  <Mail size={15} />
                  Contact via Email
                  <ExternalLink size={13} />
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  className="mt-5 w-full rounded-xl bg-slate-100 px-4 py-3 text-xs font-semibold text-slate-400"
                >
                  Email unavailable
                </button>
              )}

            </article>
          ))}

        </div>
      )}

      {/* Footer */}
      {!isLoading && !error && filteredOrganizations.length > 0 && (
        <div className="flex items-center gap-2 border-t border-slate-100 bg-slate-50/50 px-5 py-4 text-xs text-slate-400 sm:px-6">
          <Users size={14} />
          Contact organization administrators directly through email.
        </div>
      )}

    </section>
  );
}

export default AvailableOrganizations;