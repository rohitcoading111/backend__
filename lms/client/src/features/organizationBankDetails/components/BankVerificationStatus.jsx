function BankVerificationStatus({ status }) {
  const normalizedStatus = String(status || "PENDING").toUpperCase();

  const styles = {
    PENDING: "bg-white/[0.06] text-white/80 border border-white/20",
    VERIFIED: "bg-white/[0.14] text-white border border-white/40 shadow-[0_0_16px_rgba(255,255,255,0.12)]",
    REJECTED: "bg-black/40 text-white/60 border border-white/15",
  };

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${styles[normalizedStatus] || styles.PENDING}`}>
      {normalizedStatus}
    </span>
  );
}

export default BankVerificationStatus;
