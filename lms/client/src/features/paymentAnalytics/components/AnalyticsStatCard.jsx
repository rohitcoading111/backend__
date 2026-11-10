function AnalyticsStatCard({ label, value, subtitle, accent = "white" }) {
  const accentStyles = {
    white: {
      card: "border-white/20 bg-gradient-to-br from-white/15 via-white/[0.04] to-[#0b0b0d] text-white hover:border-white/40 hover:shadow-[0_0_34px_rgba(255,255,255,0.16)]",
      glow: "bg-white/15",
      label: "text-slate-300",
    },
    slate: {
      card: "border-slate-400/20 bg-gradient-to-br from-slate-400/15 via-white/[0.03] to-[#0b0b0d] text-white hover:border-slate-300/40 hover:shadow-[0_0_34px_rgba(148,163,184,0.16)]",
      glow: "bg-slate-300/15",
      label: "text-slate-300",
    },
    emerald: {
      card: "border-emerald-400/20 bg-gradient-to-br from-emerald-500/15 via-white/[0.03] to-[#0b0b0d] text-white hover:border-emerald-300/40 hover:shadow-[0_0_34px_rgba(16,185,129,0.18)]",
      glow: "bg-emerald-400/15",
      label: "text-emerald-200",
    },
    amber: {
      card: "border-amber-400/20 bg-gradient-to-br from-amber-500/15 via-white/[0.03] to-[#0b0b0d] text-white hover:border-amber-300/40 hover:shadow-[0_0_34px_rgba(245,158,11,0.18)]",
      glow: "bg-amber-300/15",
      label: "text-amber-200",
    },
    sky: {
      card: "border-sky-400/20 bg-gradient-to-br from-sky-500/15 via-white/[0.03] to-[#0b0b0d] text-white hover:border-sky-300/40 hover:shadow-[0_0_34px_rgba(14,165,233,0.18)]",
      glow: "bg-sky-300/15",
      label: "text-sky-200",
    },
  };
  const styles = accentStyles[accent] || accentStyles.white;

  return (
    <div className={`group relative isolate overflow-hidden rounded-2xl border p-5 shadow-[0_12px_40px_rgba(0,0,0,0.25)] transition duration-300 hover:-translate-y-1 ${styles.card}`}>
      <div className={`pointer-events-none absolute -right-8 -top-10 -z-10 h-32 w-32 rounded-full blur-3xl transition duration-300 group-hover:scale-150 ${styles.glow}`} />
      <div className="relative z-10 mt-0">
        <p className={`text-[11px] font-medium uppercase tracking-[0.18em] ${styles.label}`}>{label}</p>
        <div className="mt-5 flex items-end justify-between gap-4">
        <div>
          <h3 className="text-3xl font-bold tracking-tight">{value}</h3>
          {subtitle ? <p className="mt-2 text-xs text-slate-400">{subtitle}</p> : null}
        </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsStatCard;
