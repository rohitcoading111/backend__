import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import AnalyticsStatCard from "../components/AnalyticsStatCard.jsx";
import CourseAnalyticsTable from "../components/CourseAnalyticsTable.jsx";
import useOrganizationAnalytics from "../hooks/useOrganizationAnalytics.js";

function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(value || 0));
}

function OrganizationPaymentAnalytics() {
  const { analytics, isLoading, error, fetchAnalytics } = useOrganizationAnalytics();

  return (
    <main className="min-h-screen bg-[#070707] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Link to="/organization-admin-dashboard" className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white">
            <ArrowLeft size={16} />
            Back to dashboard
          </Link>
          <button
            type="button"
            onClick={() => fetchAnalytics({ silent: false })}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white"
          >
            Refresh
          </button>
        </div>

        <section className="rounded-[28px] border border-white/10 bg-[#111111] p-6 shadow-[0_0_50px_rgba(255,255,255,0.02)]">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Organization analytics</p>
              <h1 className="mt-2 text-3xl font-bold text-white">{analytics?.organizationName || "Your organization"}</h1>
            </div>
          </div>

          {error ? (
            <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
              {error}
            </div>
          ) : null}

          {isLoading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4, 5, 6, 7].map((item) => (
                <div key={item} className="h-28 animate-pulse rounded-2xl bg-white/5" />
              ))}
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <AnalyticsStatCard label="Students" value={analytics?.totalStudents || 0} accent="slate" />
              <AnalyticsStatCard label="Gross revenue" value={formatCurrency(analytics?.grossRevenue)} accent="emerald" />
              <AnalyticsStatCard label="GST (18% of gross)" value={formatCurrency(analytics?.gstDeduction)} accent="amber" />
              <AnalyticsStatCard label="Razorpay fee (2% of gross)" value={formatCurrency(analytics?.razorpayFee)} accent="amber" />
              <AnalyticsStatCard
                label="Payable amount"
                value={formatCurrency(analytics?.payableAmount)}
                subtitle="Gross less GST and Razorpay fee. Display only; no automatic transfer."
                accent="sky"
              />
              <AnalyticsStatCard label="Transactions" value={analytics?.totalTransactions || 0} accent="amber" />
              <AnalyticsStatCard label="Courses" value={analytics?.courses?.length || 0} accent="sky" />
            </div>
          )}
        </section>

        <section className="mt-8 rounded-[28px] border border-white/10 bg-[#111111] p-6">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-white">Course-wise performance</h2>
              <p className="mt-1 text-xs text-slate-400">
                Payable estimate = gross course revenue − 18% GST − 2% Razorpay fee. No platform fee is deducted.
              </p>
            </div>
          </div>

          {!isLoading ? <CourseAnalyticsTable courses={analytics?.courses || []} /> : null}
        </section>
      </div>
    </main>
  );
}

export default OrganizationPaymentAnalytics;
