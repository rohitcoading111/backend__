import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, BarChart3, Building2, CreditCard, Users } from "lucide-react";

import AnalyticsStatCard from "../components/AnalyticsStatCard.jsx";
import CourseAnalyticsTable from "../components/CourseAnalyticsTable.jsx";
import OrganizationAnalyticsCard from "../components/OrganizationAnalyticsCard.jsx";
import useOrganizationAnalytics from "../hooks/useOrganizationAnalytics.js";
import useSuperAdminAnalytics from "../hooks/useSuperAdminAnalytics.js";

function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));
}

function SuperAdminPaymentAnalytics() {
  const navigate = useNavigate();
  const { organizationId } = useParams();

  const { summary, organizations, isLoading, error, fetchAnalytics } = useSuperAdminAnalytics();
  const { analytics, isLoading: isLoadingOrganization, error: organizationError, fetchAnalytics: refetchOrganization } = useOrganizationAnalytics(organizationId);

  if (organizationId) {
    const courseList = analytics?.courses || [];

    return (
      <main className="min-h-screen bg-[#070707] px-4 py-6 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => navigate("/super-admin/payment-analytics")}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white"
            >
              <ArrowLeft size={16} />
              Back to analytics
            </button>
            <Link to="/super-admin-dashboard" className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white">
              Dashboard
            </Link>
          </div>

          <section className="rounded-[28px] border border-white/10 bg-[#111111] p-6 shadow-[0_0_50px_rgba(255,255,255,0.02)]">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                <Building2 size={20} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Organization overview</p>
                <h1 className="mt-1 text-2xl font-bold">{analytics?.organizationName || "Organization insights"}</h1>
              </div>
            </div>

            {organizationError ? (
              <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
                {organizationError}
              </div>
            ) : isLoadingOrganization ? (
              <div className="grid gap-4 md:grid-cols-4">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="h-28 animate-pulse rounded-2xl bg-white/5" />
                ))}
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-4">
                <AnalyticsStatCard label="Students" value={analytics?.totalStudents || 0} accent="slate" />
                <AnalyticsStatCard label="Revenue" value={formatCurrency(analytics?.totalRevenue)} accent="emerald" />
                <AnalyticsStatCard label="Transactions" value={analytics?.totalTransactions || 0} accent="amber" />
                <AnalyticsStatCard label="Courses" value={analytics?.courses?.length || 0} accent="sky" />
              </div>
            )}
          </section>

          <section className="mt-8 rounded-[28px] border border-white/10 bg-[#111111] p-6">
            <div className="mb-5 flex items-center gap-3">
              <BarChart3 size={18} className="text-white" />
              <h2 className="text-xl font-semibold text-white">Course performance</h2>
            </div>
            <CourseAnalyticsTable courses={courseList} />
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#070707] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Payment analytics</p>
            <h1 className="mt-2 text-3xl font-bold text-white">Super Admin Overview</h1>
          </div>
          <Link to="/super-admin-dashboard" className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white">Back to dashboard</Link>
        </div>

        {error ? (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
            {error}
          </div>
        ) : null}

        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="h-28 animate-pulse rounded-2xl bg-white/5" />
            ))}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-4">
            <AnalyticsStatCard label="Total organizations" value={summary.totalOrganizations} accent="slate" />
            <AnalyticsStatCard label="Total students" value={summary.totalStudents} accent="sky" />
            <AnalyticsStatCard label="Total revenue" value={formatCurrency(summary.totalRevenue)} accent="emerald" />
            <AnalyticsStatCard label="Total transactions" value={summary.totalTransactions} accent="amber" />
          </div>
        )}

        <section className="mt-8 space-y-4">
          <div className="flex items-center gap-3">
            <Building2 size={20} className="text-white" />
            <h2 className="text-xl font-semibold text-white">Organization performance</h2>
          </div>

          {!isLoading && organizations.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 bg-[#111111] p-8 text-center text-slate-400">
              No analytics available yet.
            </div>
          ) : (
            <div className="space-y-4">
              {organizations.map((organization) => (
                <OrganizationAnalyticsCard
                  key={organization?.organizationId || organization?.organizationName}
                  organization={organization}
                  onViewDetails={(organizationId) => navigate(`/super-admin/payment-analytics/${organizationId}`)}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default SuperAdminPaymentAnalytics;
