import { Check, X } from "lucide-react";
import { useEffect, useState } from "react";

import {
  getOrganizationBankDetailsById,
  rejectOrganizationBankDetails,
  verifyOrganizationBankDetails,
} from "../services/organizationBankDetailsService.js";
import BankVerificationStatus from "./BankVerificationStatus.jsx";

function BankDetailsModal({ organizationId, onClose, onUpdated }) {
  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const updateDecision = async (action) => {
    try {
      setIsUpdating(true);
      setError("");
      setSuccess("");

      const updatedDetails =
        action === "verify"
          ? await verifyOrganizationBankDetails(organizationId)
          : await rejectOrganizationBankDetails(organizationId, rejectionReason);

      setDetails(updatedDetails);
      setIsRejecting(false);
      setRejectionReason("");
      setSuccess(
        action === "verify"
          ? "Bank details verified successfully."
          : "Bank details rejected successfully."
      );
      await onUpdated?.();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          `Unable to ${action} bank details.`
      );
    } finally {
      setIsUpdating(false);
    }
  };

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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm transition-[background-color,backdrop-filter] duration-300"
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="bank-details-modal-title"
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[28px] border border-white/20 bg-gradient-to-br from-white/[0.08] via-[#111111] to-[#080808] p-6 text-white shadow-[0_0_60px_rgba(255,255,255,0.09)]"
      >
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">Organization bank details</p>
            <h3 id="bank-details-modal-title" className="mt-2 text-2xl font-semibold text-white">{details?.organization?.name || "Bank details"}</h3>
          </div>

          <button type="button" onClick={onClose} className="rounded-xl border border-white/10 bg-white/5 p-2 text-slate-200">
            <X size={18} />
          </button>
        </div>

        {error ? (
          <div role="alert" className="mb-4 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">{error}</div>
        ) : null}
        {success ? (
          <div role="status" className="mb-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-200">{success}</div>
        ) : null}

        {isLoading ? (
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

            {details.verificationStatus === "REJECTED" && details.rejectionReason ? (
              <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
                Rejection reason: {details.rejectionReason}
              </div>
            ) : null}

            {details.verificationStatus === "PENDING" ? (
              <div className="space-y-4 border-t border-white/10 pt-5">
                {isRejecting ? (
                  <label className="block space-y-2 text-sm text-slate-300">
                    <span>Reason for rejection</span>
                    <textarea
                      value={rejectionReason}
                      onChange={(event) => setRejectionReason(event.target.value)}
                      rows={3}
                      maxLength={500}
                      disabled={isUpdating}
                      className="w-full resize-y rounded-xl border border-white/10 bg-[#0d0d0d] px-3 py-3 text-white outline-none transition focus:border-white/20 disabled:opacity-60"
                      placeholder="Explain what needs to be corrected"
                    />
                  </label>
                ) : null}

                <div className="flex flex-wrap justify-end gap-3">
                  {isRejecting ? (
                    <button
                      type="button"
                      onClick={() => {
                        setIsRejecting(false);
                        setRejectionReason("");
                        setError("");
                      }}
                      disabled={isUpdating}
                      className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10 disabled:opacity-60"
                    >
                      Cancel
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setError("");
                        setIsRejecting(true);
                      }}
                      disabled={isUpdating}
                      className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-200 transition hover:bg-red-500/20 disabled:opacity-60"
                    >
                      Reject
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() =>
                      isRejecting
                        ? updateDecision("reject")
                        : updateDecision("verify")
                    }
                    disabled={
                      isUpdating ||
                      (isRejecting && !rejectionReason.trim())
                    }
                    className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${
                      isRejecting
                        ? "bg-red-500 text-white hover:bg-red-400"
                        : "bg-emerald-400 text-slate-950 hover:bg-emerald-300"
                    }`}
                  >
                    {isRejecting ? null : <Check size={16} />}
                    {isUpdating
                      ? "Saving..."
                      : isRejecting
                        ? "Confirm rejection"
                        : "Verify bank details"}
                  </button>
                </div>
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
