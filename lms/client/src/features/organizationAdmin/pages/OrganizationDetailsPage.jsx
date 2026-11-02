import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  ArrowLeft,
  Building2,
  ShieldCheck,
  Mail,
  UserRound,
  CalendarDays,
  RefreshCw,
  AlertCircle,
  Image as ImageIcon,
} from "lucide-react";

import useOrganizationDashboard from "../hooks/useOrganizationDashboard.js";

function OrganizationDetailsPage() {
  const user = useSelector((state) => state.auth?.user);

  const {
    organization,
    isLoading,
    error,
    fetchOrganization,
  } = useOrganizationDashboard();

  const formatDate = (date) => {
    if (!date) return "—";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return "—";

    return parsedDate.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f4f6fb]">
        <div className="flex items-center gap-3 text-sm font-medium text-slate-500">
          <RefreshCw size={20} className="animate-spin text-indigo-500" />
          Loading organization details...
        </div>
      </main>
    );
  }

  if (error || !organization) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f4f6fb] p-5">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-7 text-center shadow-sm">
          <AlertCircle size={30} className="mx-auto text-red-500" />

          <h2 className="mt-4 text-lg font-bold text-slate-900">
            Unable to load organization
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            {error || "Organization information is unavailable."}
          </p>

          <button
            type="button"
            onClick={fetchOrganization}
            className="mt-5 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500"
          >
            Try Again
          </button>

          <div>
            <Link
              to="/organization-admin-dashboard"
              className="mt-4 inline-block text-sm font-medium text-indigo-600 hover:text-indigo-700"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const logoUrl = organization.logo?.url;

  const description =
    organization.description || organization.desc;

  const organizationStatus =
    organization.status || "ACTIVE";

  return (
    <main className="min-h-screen bg-[#f4f6fb] px-4 py-7 text-slate-900 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-5xl">

        {/* Back */}
        <Link
          to="/organization-admin-dashboard"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-indigo-600"
        >
          <ArrowLeft size={17} />
          Back to Organization Dashboard
        </Link>

        {/* Header */}
        <header className="mt-6 overflow-hidden rounded-[26px] bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-6 text-white shadow-xl sm:p-9">

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">

            <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/10">
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt={`${organization.name || "Organization"} logo`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <Building2 size={34} className="text-indigo-300" />
              )}
            </div>

            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-300">
                Organization Profile
              </p>

              <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
                {organization.name || "Organization"}
              </h1>

              <p className="mt-2 text-sm text-slate-300">
                {organization.organizationType || "Organization"}
              </p>

              <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold text-emerald-300">
                <ShieldCheck size={14} />
                {organizationStatus}
              </span>
            </div>

            <button
              type="button"
              onClick={fetchOrganization}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/15"
            >
              <RefreshCw size={15} />
              Refresh
            </button>

          </div>
        </header>

        {/* Main Information */}
        <section className="mt-7 grid gap-5 lg:grid-cols-2">

          {/* Organization Information */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">
                <Building2 size={19} className="text-indigo-600" />
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  Organization Information
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  Registered organization details
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-5">

              <InfoRow
                label="Organization Name"
                value={organization.name}
              />

              <InfoRow
                label="Organization Type"
                value={organization.organizationType}
              />

              <InfoRow
                label="Organization ID"
                value={organization._id}
                breakAll
              />

              <InfoRow
                label="Organization Status"
                value={organizationStatus}
              />

              <InfoRow
                label="Registration Date"
                value={formatDate(organization.createdAt)}
              />

            </div>
          </div>

          {/* Admin Information */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50">
                <UserRound size={19} className="text-violet-600" />
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  Administrator Information
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  Logged-in organization owner
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-5">

              <InfoRow
                label="Admin Name"
                value={user?.name}
              />

              <InfoRow
                label="Admin Email"
                value={user?.email}
                icon={<Mail size={14} />}
              />

              <InfoRow
                label="Admin Type"
                value={user?.adminType}
              />

              <InfoRow
                label="Account Verification"
                value={user?.isVerified ? "Verified" : "Not verified"}
              />

            </div>
          </div>

        </section>

        {/* Description */}
        <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50">
              <ImageIcon size={19} className="text-amber-600" />
            </div>

            <div>
              <h2 className="font-bold text-slate-900">
                About Organization
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Organization description
              </p>
            </div>
          </div>

          <p className="mt-5 whitespace-pre-wrap text-sm leading-7 text-slate-600">
            {description || "No organization description provided."}
          </p>

        </section>

      </div>
    </main>
  );
}


// Reusable information row
function InfoRow({ label, value, icon, breakAll = false }) {
  return (
    <div>
      <p className="text-xs font-medium text-slate-400">
        {label}
      </p>

      <div className="mt-1.5 flex items-center gap-2">
        {icon && (
          <span className="text-slate-400">
            {icon}
          </span>
        )}

        <p
          className={`text-sm font-semibold text-slate-800 ${
            breakAll ? "break-all" : "break-words"
          }`}
        >
          {value || "Not available"}
        </p>
      </div>
    </div>
  );
}

export default OrganizationDetailsPage;