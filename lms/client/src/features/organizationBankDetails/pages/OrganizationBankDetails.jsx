import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import BankDetailsCard from "../components/BankDetailsCard.jsx";
import BankDetailsForm from "../components/BankDetailsForm.jsx";
import BankVerificationStatus from "../components/BankVerificationStatus.jsx";
import useOrganizationBankDetails from "../hooks/useOrganizationBankDetails.js";

function OrganizationBankDetails() {
  const { bankDetails, isLoading, error, success, fetchBankDetails, submitBankDetails } = useOrganizationBankDetails();
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (payload) => {
    try {
      setIsSubmitting(true);
      await submitBankDetails(payload);
      setIsEditing(false);
    } catch (error) {
      // error is already surfaced in hook state
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#070707] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Link to="/organization-admin-dashboard" className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white">
            <ArrowLeft size={16} />
            Back to dashboard
          </Link>

          <button
            type="button"
            onClick={() => fetchBankDetails({ silent: false })}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white"
          >
            Refresh
          </button>
        </div>

        <section className="rounded-[28px] border border-white/10 bg-[#111111] p-6 shadow-[0_0_40px_rgba(255,255,255,0.02)]">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">Organization admin</p>
              <h1 className="mt-2 text-3xl font-bold text-white">Bank details</h1>
            </div>

            {bankDetails?.verificationStatus ? (
              <BankVerificationStatus status={bankDetails.verificationStatus} />
            ) : null}
          </div>

          {isLoading ? (
            <div className="h-72 animate-pulse rounded-2xl bg-white/5" />
          ) : bankDetails && !isEditing ? (
            <BankDetailsCard details={bankDetails} onEdit={() => setIsEditing(true)} />
          ) : (
            <BankDetailsForm
              initialValues={bankDetails || null}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              error={error}
              success={success}
            />
          )}

          {!isLoading && bankDetails && isEditing ? (
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white"
              >
                Cancel
              </button>
            </div>
          ) : null}
        </section>
      </div>
    </main>
  );
}

export default OrganizationBankDetails;
