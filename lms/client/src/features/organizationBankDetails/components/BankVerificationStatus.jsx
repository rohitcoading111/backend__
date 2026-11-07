function BankVerificationStatus({ status }) {
  const normalizedStatus = String(status || "PENDING").toUpperCase();

  const styles = {
    PENDING: "bg-amber-500/10 text-amber-200 border border-amber-400/30",
    VERIFIED: "bg-emerald-500/10 text-emerald-200 border border-emerald-400/30",
    REJECTED: "bg-red-500/10 text-red-200 border border-red-400/30",
  };

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${styles[normalizedStatus] || styles.PENDING}`}>
      {normalizedStatus}
    </span>
  );
}

export default BankVerificationStatus;
