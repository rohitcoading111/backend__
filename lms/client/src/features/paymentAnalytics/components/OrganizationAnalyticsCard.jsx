import { ArrowRight, Building2, CreditCard, Users } from "lucide-react";

function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(value || 0));
}

function OrganizationAnalyticsCard({ organization, onViewDetails }) {
  return (
    <div className="group relative isolate overflow-hidden rounded-2xl border border-indigo-400/20 bg-gradient-to-br from-indigo-500/10 via-[#121212] to-[#09090b] p-5 shadow-[0_12px_40px_rgba(0,0,0,0.28)] transition duration-300 hover:-translate-y-1 hover:border-indigo-300/40 hover:shadow-[0_0_34px_rgba(99,102,241,0.14)]">
      <div className="pointer-events-none absolute -right-12 -top-12 -z-10 h-40 w-40 rounded-full bg-indigo-400/10 blur-3xl transition duration-300 group-hover:scale-125" />
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white">
            <Building2 size={18} />
          </div>
          <div>
            <p className="text-lg font-semibold text-white">{organization?.organizationName || "Organization"}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-400">{organization?.status || "ACTIVE"}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onViewDetails?.(organization?.organizationId)}
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-white transition hover:bg-white/10"
        >
          View Details
          <ArrowRight size={14} />
        </button>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        <div className="rounded-xl border border-sky-400/15 bg-sky-500/[0.06] p-3 shadow-[0_0_20px_rgba(14,165,233,0.04)]">
          <div className="flex items-center gap-2 text-sky-200">
            <Users size={14} />
            <span className="text-[10px] uppercase tracking-[0.18em]">Students</span>
          </div>
          <p className="mt-3 text-xl font-bold text-white">{organization?.totalStudents || 0}</p>
        </div>

        <div className="rounded-xl border border-violet-400/15 bg-violet-500/[0.06] p-3 shadow-[0_0_20px_rgba(139,92,246,0.04)]">
          <div className="flex items-center gap-2 text-violet-200">
            <CreditCard size={14} />
            <span className="text-[10px] uppercase tracking-[0.18em]">Gross revenue</span>
          </div>
          <p className="mt-3 text-xl font-bold text-white">{formatCurrency(organization?.grossRevenue)}</p>
        </div>

        <div className="rounded-xl border border-emerald-400/20 bg-emerald-500/[0.07] p-3 shadow-[0_0_22px_rgba(16,185,129,0.06)]">
          <div className="flex items-center gap-2 text-emerald-200">
            <CreditCard size={14} />
            <span className="text-[10px] uppercase tracking-[0.18em]">Payable amount</span>
          </div>
          <p className="mt-3 text-xl font-bold text-white">{formatCurrency(organization?.payableAmount)}</p>
        </div>

        <div className="rounded-xl border border-amber-400/15 bg-amber-500/[0.06] p-3 shadow-[0_0_20px_rgba(245,158,11,0.04)]">
          <div className="flex items-center gap-2 text-amber-200">
            <span className="text-[10px] uppercase tracking-[0.18em]">Txns</span>
          </div>
          <p className="mt-3 text-xl font-bold text-white">{organization?.totalTransactions || 0}</p>
        </div>

        <div className="rounded-xl border border-fuchsia-400/15 bg-fuchsia-500/[0.06] p-3 shadow-[0_0_20px_rgba(217,70,239,0.04)]">
          <div className="flex items-center gap-2 text-fuchsia-200">
            <span className="text-[10px] uppercase tracking-[0.18em]">Courses</span>
          </div>
          <p className="mt-3 text-xl font-bold text-white">{organization?.courses?.length || 0}</p>
        </div>
      </div>
    </div>
  );
}

export default OrganizationAnalyticsCard;
