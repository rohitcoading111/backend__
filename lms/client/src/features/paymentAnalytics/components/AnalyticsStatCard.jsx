function AnalyticsStatCard({ label, value, subtitle, accent = "white" }) {
  const accentStyles = {
    white: "bg-white text-slate-900 border-white/10",
    slate: "bg-white/5 text-white border-white/10",
    emerald: "bg-emerald-500/10 text-emerald-200 border-emerald-400/20",
    amber: "bg-amber-500/10 text-amber-200 border-amber-400/20",
    sky: "bg-sky-500/10 text-sky-200 border-sky-400/20",
  };

  return (
    <div className={`rounded-2xl border p-5 shadow-sm ${accentStyles[accent] || accentStyles.white}`}>
      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">{label}</p>
      <div className="mt-5 flex items-end justify-between gap-4">
        <div>
          <h3 className="text-3xl font-bold tracking-tight">{value}</h3>
          {subtitle ? <p className="mt-2 text-xs text-slate-400">{subtitle}</p> : null}
        </div>
      </div>
    </div>
  );
}

export default AnalyticsStatCard;
