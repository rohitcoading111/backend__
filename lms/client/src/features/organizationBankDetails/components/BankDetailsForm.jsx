import { useEffect, useMemo, useState } from "react";

const emptyForm = {
  accountHolderName: "",
  bankName: "",
  accountNumber: "",
  confirmAccountNumber: "",
  ifscCode: "",
  accountType: "SAVINGS",
  bankProofUrl: "",
  bankProofFileId: "",
};

function BankDetailsForm({ initialValues, onSubmit, isSubmitting, error, success }) {
  const [form, setForm] = useState(emptyForm);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (!initialValues) return;

    setForm({
      accountHolderName: initialValues.accountHolderName || "",
      bankName: initialValues.bankName || "",
      accountNumber: "",
      confirmAccountNumber: "",
      ifscCode: initialValues.ifscCode || "",
      accountType: initialValues.accountType || "SAVINGS",
      bankProofUrl: initialValues.bankProof?.url || "",
      bankProofFileId: initialValues.bankProof?.fileId || "",
    });
  }, [initialValues]);

  const validationErrors = useMemo(() => {
    const nextErrors = {};

    if (!form.accountHolderName.trim()) {
      nextErrors.accountHolderName = "Account holder name is required.";
    }
    if (!form.bankName.trim()) {
      nextErrors.bankName = "Bank name is required.";
    }
    if (!/^\d{9,18}$/.test(form.accountNumber.replace(/\s/g, ""))) {
      nextErrors.accountNumber = "Account number must contain 9 to 18 digits.";
    }
    if (form.accountNumber !== form.confirmAccountNumber) {
      nextErrors.confirmAccountNumber = "Account numbers do not match.";
    }
    if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test((form.ifscCode || "").toUpperCase())) {
      nextErrors.ifscCode = "Please provide a valid IFSC code.";
    }
    if (!form.accountType) {
      nextErrors.accountType = "Account type is required.";
    }

    return nextErrors;
  }, [form]);

  const handleChange = (field, value) => {
    setForm((previous) => ({ ...previous, [field]: value }));
    setFormErrors((previous) => ({ ...previous, [field]: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validationErrors;
    setFormErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const payload = {
      accountHolderName: form.accountHolderName.trim(),
      bankName: form.bankName.trim(),
      accountNumber: form.accountNumber.replace(/\s/g, ""),
      confirmAccountNumber: form.confirmAccountNumber.replace(/\s/g, ""),
      ifscCode: form.ifscCode.toUpperCase(),
      accountType: form.accountType,
      bankProof: {
        url: form.bankProofUrl?.trim() || undefined,
        fileId: form.bankProofFileId?.trim() || undefined,
      },
    };

    await onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-[28px] border border-white/10 bg-[#111111] p-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">Bank details</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">{initialValues ? "Update bank information" : "Submit bank information"}</h3>
        </div>
      </div>

      {(error || success) && (
        <div className={`mb-5 rounded-2xl border p-3 text-sm ${error ? "border-red-500/30 bg-red-500/10 text-red-200" : "border-emerald-500/30 bg-emerald-500/10 text-emerald-200"}`}>
          {error || success}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm text-slate-300">
          <span>Account Holder Name</span>
          <input
            value={form.accountHolderName}
            onChange={(event) => handleChange("accountHolderName", event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-[#0d0d0d] px-3 py-3 text-white outline-none transition focus:border-white/20"
            placeholder="John Doe"
          />
          {formErrors.accountHolderName ? <span className="text-xs text-red-300">{formErrors.accountHolderName}</span> : null}
        </label>

        <label className="space-y-2 text-sm text-slate-300">
          <span>Bank Name</span>
          <input
            value={form.bankName}
            onChange={(event) => handleChange("bankName", event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-[#0d0d0d] px-3 py-3 text-white outline-none transition focus:border-white/20"
            placeholder="HDFC Bank"
          />
          {formErrors.bankName ? <span className="text-xs text-red-300">{formErrors.bankName}</span> : null}
        </label>

        <label className="space-y-2 text-sm text-slate-300">
          <span>Account Number</span>
          <input
            value={form.accountNumber}
            onChange={(event) => handleChange("accountNumber", event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-[#0d0d0d] px-3 py-3 text-white outline-none transition focus:border-white/20"
            placeholder="1234567890"
          />
          {formErrors.accountNumber ? <span className="text-xs text-red-300">{formErrors.accountNumber}</span> : null}
        </label>

        <label className="space-y-2 text-sm text-slate-300">
          <span>Confirm Account Number</span>
          <input
            value={form.confirmAccountNumber}
            onChange={(event) => handleChange("confirmAccountNumber", event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-[#0d0d0d] px-3 py-3 text-white outline-none transition focus:border-white/20"
            placeholder="1234567890"
          />
          {formErrors.confirmAccountNumber ? <span className="text-xs text-red-300">{formErrors.confirmAccountNumber}</span> : null}
        </label>

        <label className="space-y-2 text-sm text-slate-300">
          <span>IFSC Code</span>
          <input
            value={form.ifscCode}
            onChange={(event) => handleChange("ifscCode", event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-[#0d0d0d] px-3 py-3 text-white outline-none transition focus:border-white/20"
            placeholder="HDFC0001234"
          />
          {formErrors.ifscCode ? <span className="text-xs text-red-300">{formErrors.ifscCode}</span> : null}
        </label>

        <label className="space-y-2 text-sm text-slate-300">
          <span>Account Type</span>
          <select
            value={form.accountType}
            onChange={(event) => handleChange("accountType", event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-[#0d0d0d] px-3 py-3 text-white outline-none transition focus:border-white/20"
          >
            <option value="SAVINGS">Savings</option>
            <option value="CURRENT">Current</option>
          </select>
        </label>

        <label className="space-y-2 text-sm text-slate-300 md:col-span-2">
          <span>Bank Proof URL or File ID (optional)</span>
          <input
            value={form.bankProofUrl}
            onChange={(event) => handleChange("bankProofUrl", event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-[#0d0d0d] px-3 py-3 text-white outline-none transition focus:border-white/20"
            placeholder="https://example.com/bank-proof.jpg"
          />
        </label>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Submitting..." : initialValues ? "Update details" : "Submit details"}
        </button>
      </div>
    </form>
  );
}

export default BankDetailsForm;
