import { ArrowRight, Building2, CreditCard, Users } from "lucide-react";

function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));
}

function OrganizationAnalyticsCard({ organization, onViewDetails }) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-[#121212] p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] transition duration-200 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]">
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

      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-white/10 bg-white/3 p-3">
          <div className="flex items-center gap-2 text-slate-400">
            <Users size={14} />
            <span className="text-[10px] uppercase tracking-[0.18em]">Students</span>
          </div>
          <p className="mt-3 text-xl font-bold text-white">{organization?.totalStudents || 0}</p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/3 p-3">
          <div className="flex items-center gap-2 text-slate-400">
            <CreditCard size={14} />
            <span className="text-[10px] uppercase tracking-[0.18em]">Revenue</span>
          </div>
          <p className="mt-3 text-xl font-bold text-white">{formatCurrency(organization?.totalRevenue)}</p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/3 p-3">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="text-[10px] uppercase tracking-[0.18em]">Txns</span>
          </div>
          <p className="mt-3 text-xl font-bold text-white">{organization?.totalTransactions || 0}</p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/3 p-3">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="text-[10px] uppercase tracking-[0.18em]">Courses</span>
          </div>
          <p className="mt-3 text-xl font-bold text-white">{organization?.courses?.length || 0}</p>
        </div>
      </div>
    </div>
  );
}

export default OrganizationAnalyticsCard;
