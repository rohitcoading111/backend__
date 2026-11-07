function TransactionSummary({ title, value, subtitle }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#111111] p-5">
      <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">{title}</p>
      <p className="mt-4 text-2xl font-bold text-white">{value}</p>
      {subtitle ? <p className="mt-2 text-xs text-slate-400">{subtitle}</p> : null}
    </div>
  );
}

export default TransactionSummary;
