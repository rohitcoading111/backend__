import { useEffect, useMemo, useRef, useState } from "react";
import { UploadCloud, X } from "lucide-react";

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

function BankDetailsForm({
  initialValues,
  onSubmit,
  onUploadBankProof,
  incompleteRecord = false,
  isSubmitting,
  error,
  success,
}) {
  const [form, setForm] = useState(emptyForm);
  const [formErrors, setFormErrors] = useState({});
  const [isUploadingProof, setIsUploadingProof] = useState(false);
  const [proofUploadError, setProofUploadError] = useState("");
  const [proofFileName, setProofFileName] = useState("");
  const fileInputRef = useRef(null);

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

  const handleProofFileChange = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setProofUploadError("");

    try {
      setIsUploadingProof(true);
      const uploadedProof = await onUploadBankProof(file);
      setForm((previous) => ({
        ...previous,
        bankProofUrl: uploadedProof.url,
        bankProofFileId: uploadedProof.fileId,
      }));
      setProofFileName(file.name);
    } catch (uploadError) {
      setProofUploadError(
        uploadError?.response?.data?.message ||
          uploadError?.message ||
          "Unable to upload bank proof."
      );
    } finally {
      setIsUploadingProof(false);
    }
  };

  const removeProof = () => {
    setForm((previous) => ({
      ...previous,
      bankProofUrl: "",
      bankProofFileId: "",
    }));
    setProofFileName("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isUploadingProof) return;

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
    <form onSubmit={handleSubmit} className="rounded-[28px] border border-white/15 bg-gradient-to-br from-white/[0.06] via-[#111111] to-[#080808] p-6 shadow-[0_0_42px_rgba(255,255,255,0.06)]">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">Bank details</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">
            {incompleteRecord
              ? "Complete bank information"
              : initialValues
                ? "Update bank information"
                : "Submit bank information"}
          </h3>
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

        <div className="space-y-3 text-sm text-slate-300 md:col-span-2">
          <p>Bank proof (optional)</p>
          <div className="flex flex-wrap items-center gap-3">
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
              onChange={handleProofFileChange}
              className="sr-only"
              aria-label="Choose bank proof file"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploadingProof || isSubmitting}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <UploadCloud size={17} />
              {isUploadingProof ? "Uploading..." : "Choose file"}
            </button>
            <span className="text-xs text-slate-400">
              PDF, JPG or PNG up to 5 MB
            </span>
          </div>

          {proofFileName ? (
            <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
              <span className="truncate text-xs text-slate-300">{proofFileName}</span>
              <button
                type="button"
                onClick={removeProof}
                disabled={isSubmitting || isUploadingProof}
                aria-label="Remove uploaded bank proof"
                className="rounded-lg p-1 text-slate-400 hover:bg-white/10 hover:text-white disabled:opacity-50"
              >
                <X size={15} />
              </button>
            </div>
          ) : null}

          {form.bankProofUrl ? (
            <a
              href={form.bankProofUrl}
              target="_blank"
              rel="noreferrer"
              className="block truncate text-xs text-cyan-300 underline"
            >
              View current bank proof
            </a>
          ) : null}

          {proofUploadError ? (
            <p role="alert" className="text-xs text-red-300">
              {proofUploadError}
            </p>
          ) : null}

          <label className="block space-y-2 text-xs text-slate-400">
            <span>Or provide a bank proof URL</span>
            <input
              value={form.bankProofUrl}
              onChange={(event) => {
                handleChange("bankProofUrl", event.target.value);
                handleChange("bankProofFileId", "");
                setProofFileName("");
              }}
              type="url"
              className="w-full rounded-xl border border-white/10 bg-[#0d0d0d] px-3 py-3 text-sm text-white outline-none transition focus:border-white/20"
              placeholder="https://example.com/bank-proof.pdf"
            />
          </label>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button
          type="submit"
          disabled={isSubmitting || isUploadingProof}
          className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting
            ? "Submitting..."
            : incompleteRecord
              ? "Save bank details"
              : initialValues
                ? "Update details"
                : "Submit details"}
        </button>
      </div>
    </form>
  );
}

export default BankDetailsForm;
