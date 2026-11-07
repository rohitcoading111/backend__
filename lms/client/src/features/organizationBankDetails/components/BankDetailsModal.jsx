import { X } from "lucide-react";
import { useEffect, useState } from "react";

import { getOrganizationBankDetailsById } from "../services/organizationBankDetailsService.js";
import BankVerificationStatus from "./BankVerificationStatus.jsx";

function BankDetailsModal({ organizationId, onClose }) {
  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!organizationId) return;

    let isMounted = true;

    const fetchDetails = async () => {
      try {
        setIsLoading(true);
        setError("");

        const response = await getOrganizationBankDetailsById(organizationId);
        if (isMounted) {
          setDetails(response || null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err?.response?.data?.message || err?.message || "Unable to load bank details.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchDetails();

    return () => {
      isMounted = false;
    };
  }, [organizationId]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[28px] border border-white/10 bg-[#111111] p-6 text-white shadow-[0_0_60px_rgba(0,0,0,0.4)]">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">Organization bank details</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">{details?.organization?.name || "Bank details"}</h3>
          </div>

          <button type="button" onClick={onClose} className="rounded-xl border border-white/10 bg-white/5 p-2 text-slate-200">
            <X size={18} />
          </button>
        </div>

        {error ? (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">{error}</div>
        ) : isLoading ? (
          <div className="h-52 animate-pulse rounded-2xl bg-white/5" />
        ) : details ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">Account holder</p>
                <p className="mt-2 text-lg font-semibold text-white">{details.accountHolderName}</p>
              </div>
              <BankVerificationStatus status={details.verificationStatus} />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">Bank</p>
                <p className="mt-2 text-base font-semibold text-white">{details.bankName}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">Masked account number</p>
                <p className="mt-2 text-base font-semibold text-white">{details.accountNumber || "XXXX XXXX 0000"}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">IFSC</p>
                <p className="mt-2 text-base font-semibold text-white">{details.ifscCode}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">Account type</p>
                <p className="mt-2 text-base font-semibold text-white">{details.accountType}</p>
              </div>
            </div>

            {details.bankProof?.url ? (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">Bank proof</p>
                <a href={details.bankProof.url} target="_blank" rel="noreferrer" className="mt-3 inline-flex text-sm text-white underline decoration-white/30">
                  Open proof
                </a>
              </div>
            ) : null}

            {details.submittedBy ? (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
                Submitted: {new Date(details.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
              </div>
            ) : null}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-8 text-center text-slate-400">
            No bank details found for this organization.
          </div>
        )}
      </div>
    </div>
  );
}

export default BankDetailsModal;
