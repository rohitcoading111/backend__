import {
  GraduationCap,
  ShieldCheck,
  UserRound,
  Mail,
  Building2,
  LogOut,
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
} from "lucide-react";

import InstructorIdCard from "../components/InstructorIdCard.jsx";
import AvailableOrganizations from "../components/AvailableOrganizations.jsx";

import useIndependentInstructorDashboard from "../hooks/useIndependentInstructorDashboard.js";

function InfoCard({ icon: Icon, label, value }) {
  return (
    <div className="premium-card rounded-2xl p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/70">
        <Icon size={19} />
      </div>

      <p className="mt-4 text-xs font-medium uppercase tracking-wider text-white/35">
        {label}
      </p>

      <p className="mt-1.5 break-words text-sm font-semibold text-white/85">
        {value || "Not available"}
      </p>
    </div>
  );
}

function MembershipCard({ onOpenOrganization }) {
  return (
    <section className="premium-card rounded-3xl p-6 sm:p-8">
      <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.06] text-white">
            <Building2 size={23} />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-bold text-white">
                Organization Membership
              </h2>

              <CheckCircle2 size={17} className="text-white/60" />
            </div>

            <p className="mt-2 max-w-xl text-sm leading-6 text-white/45">
              Your instructor account is connected to an organization.
              Open your organization workspace to explore shared courses,
              modules and lectures.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenOrganization}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-neutral-200 active:scale-[0.98]"
        >
          Open Organization
          <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
}

function IndependentNotice() {
  return (
    <section className="premium-card rounded-2xl p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/[0.05] text-white/80">
          <BriefcaseBusiness size={19} />
        </div>

        <div>
          <h3 className="text-sm font-bold text-white">
            Independent Instructor Account
          </h3>

          <p className="mt-1 text-xs text-white/40">
            Explore organizations and connect with administrators.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function IndependentInstructorDashboard() {
  const {
    user,
    instructorName,
    employmentLabel,

    isIndependent,
    isHired,
    isOrganizationMember,

    organizations,
    filteredOrganizations,
    searchTerm,
    setSearchTerm,
    isLoading,
    error,
    refreshOrganizations,

    loggingOut,
    handleLogout,
    handleOpenOrganization,
  } = useIndependentInstructorDashboard();

  return (
    <main className="premium-dashboard px-4 py-7 sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-[1250px] space-y-7">

        {/* Premium Header */}
        <header className="premium-card overflow-hidden rounded-[30px] p-6 sm:p-9 lg:p-10">
          <div className="pointer-events-none absolute -right-20 -top-28 h-80 w-80 rounded-full border-[45px] border-white/[0.025]" />

          <div className="pointer-events-none absolute -bottom-28 right-1/3 h-64 w-64 rounded-full bg-white/[0.035] blur-3xl" />

          <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.045] px-4 py-2">
                <GraduationCap size={16} className="text-white/80" />

                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/65">
                  LearnHub Instructor Workspace
                </span>
              </div>

              <p className="text-sm font-medium text-white/40">
                Welcome back
              </p>

              <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                {instructorName}
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-7 text-white/45">
                Manage your instructor profile, explore your workspace
                and stay connected with the LearnHub ecosystem.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row lg:flex-col lg:items-end">
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-white/80">
                  <ShieldCheck size={22} />
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-white/35">
                    Employment status
                  </p>

                  <p className="mt-1 text-sm font-bold text-white/85">
                    {employmentLabel}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white/75 transition hover:border-white/35 hover:bg-white/[0.10] hover:text-white disabled:opacity-40"
              >
                <LogOut size={17} />
                {loggingOut ? "Logging out..." : "Logout"}
              </button>
            </div>
          </div>
        </header>

        {/* Profile and Account Information */}
        <section className="grid gap-6 lg:grid-cols-2">

          {/* Instructor ID */}
          <div className="premium-card rounded-3xl p-5 sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/75">
                <GraduationCap size={20} />
              </div>

              <div>
                <h2 className="font-bold text-white">
                  Instructor Identity
                </h2>

                <p className="mt-1 text-xs text-white/35">
                  Your permanent instructor credentials
                </p>
              </div>
            </div>

            <InstructorIdCard user={user} />
          </div>

          {/* Account Information */}
          <section className="premium-card rounded-3xl p-6 sm:p-7">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/75">
                <UserRound size={20} />
              </div>

              <div>
                <h2 className="font-bold text-white">
                  Account Information
                </h2>

                <p className="mt-1 text-xs text-white/35">
                  Your registered instructor profile
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <InfoCard
                icon={UserRound}
                label="Full Name"
                value={user?.name}
              />

              <InfoCard
                icon={Mail}
                label="Registered Email"
                value={user?.email}
              />

              <InfoCard
                icon={ShieldCheck}
                label="Account Role"
                value={user?.role}
              />

              <InfoCard
                icon={Building2}
                label="Organization"
                value={
                  isHired
                    ? "Organization linked"
                    : "Not hired yet"
                }
              />
            </div>
          </section>
        </section>

        {/* Hired Instructor */}
        {(isHired || (isOrganizationMember && !isIndependent)) && (
          <MembershipCard
            onOpenOrganization={handleOpenOrganization}
          />
        )}

        {/* Independent Instructor */}
        {isIndependent && <IndependentNotice />}

        {/* Available Organizations */}
        {isIndependent && (
          <section className="premium-card rounded-3xl p-5 sm:p-7">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/80">
                <Building2 size={21} />
              </div>

              <div>
                <h2 className="text-xl font-bold tracking-tight text-white">
                  Explore Organizations
                </h2>

                <p className="mt-1 text-sm text-white/40">
                  Discover organizations and connect with their administrators.
                </p>
              </div>
            </div>

            <AvailableOrganizations
              organizations={organizations}
              filteredOrganizations={filteredOrganizations}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              isLoading={isLoading}
              error={error}
              onRefresh={refreshOrganizations}
            />
          </section>
        )}

        {/* Footer */}
        <footer className="flex flex-col justify-between gap-3 border-t border-white/10 px-2 py-5 text-xs text-white/30 sm:flex-row">
          <p>© LearnHub Instructor Workspace</p>

          <p>
            {isHired
              ? "Organization Instructor Portal"
              : "Independent Instructor Portal"}
          </p>
        </footer>
      </div>
    </main>
  );
}