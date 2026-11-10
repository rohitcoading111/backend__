import { Building2, CheckCheck, ShieldAlert } from "lucide-react";

import BankVerificationStatus from "./BankVerificationStatus.jsx";

function BankDetailsCard({ details, onEdit }) {
  if (!details) return null;

  return (
    <div className="group relative isolate overflow-hidden rounded-[28px] border border-white/15 bg-gradient-to-br from-white/[0.08] via-[#111111] to-[#080808] p-6 shadow-[0_0_48px_rgba(255,255,255,0.07)] transition duration-300 hover:border-white/25 hover:shadow-[0_0_58px_rgba(255,255,255,0.11)]">
      <div className="pointer-events-none absolute -right-10 -top-12 -z-10 h-40 w-40 rounded-full bg-white/10 blur-3xl transition duration-300 group-hover:scale-125" />
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/20 bg-white/[0.08] shadow-[0_0_24px_rgba(255,255,255,0.08)]">
            <Building2 size={20} className="text-white" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">Bank account</p>
            <h3 className="mt-1 text-xl font-semibold text-white">{details.accountHolderName}</h3>
          </div>
        </div>

        <BankVerificationStatus status={details.verificationStatus} />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-4 shadow-[0_0_22px_rgba(255,255,255,0.035)]">
          <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">Bank name</p>
          <p className="mt-2 text-lg font-semibold text-white">{details.bankName}</p>
        </div>
        <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-4 shadow-[0_0_22px_rgba(255,255,255,0.035)]">
          <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">Account number</p>
          <p className="mt-2 text-lg font-semibold text-white">{details.accountNumber || "XXXX XXXX 0000"}</p>
        </div>
        <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-4 shadow-[0_0_22px_rgba(255,255,255,0.035)]">
          <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">IFSC</p>
          <p className="mt-2 text-lg font-semibold text-white">{details.ifscCode}</p>
        </div>
        <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-4 shadow-[0_0_22px_rgba(255,255,255,0.035)]">
          <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">Account type</p>
          <p className="mt-2 text-lg font-semibold text-white">{details.accountType}</p>
        </div>
      </div>

      {details.bankProof?.url ? (
        <div className="mt-6 rounded-2xl border border-white/15 bg-white/[0.04] p-4 shadow-[0_0_22px_rgba(255,255,255,0.035)]">
          <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">Bank proof</p>
          <a href={details.bankProof.url} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 text-sm text-white underline decoration-white/30">
            {details.bankProof.url}
          </a>
        </div>
      ) : null}

      {details.verificationStatus === "REJECTED" && details.rejectionReason ? (
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
          <ShieldAlert size={18} className="mt-0.5" />
          <span>{details.rejectionReason}</span>
        </div>
      ) : null}

      {details.verificationStatus === "VERIFIED" ? (
        <div className="mt-6 flex items-center gap-2 text-sm text-emerald-200">
          <CheckCheck size={16} />
          Verified by system review
        </div>
      ) : null}

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={onEdit}
          className="rounded-xl border border-white/25 bg-white px-4 py-2 text-sm font-semibold text-black shadow-[0_0_22px_rgba(255,255,255,0.12)] transition hover:bg-slate-200"
        >
          Update details
        </button>
      </div>
    </div>
  );
}

export default BankDetailsCard;
