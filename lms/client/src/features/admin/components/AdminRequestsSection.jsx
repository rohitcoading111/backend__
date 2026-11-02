import {
  Building2,
  Mail,
  Phone,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Clock3,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";

import useAdminRequests from "../hooks/useAdminRequests.js";

function AdminRequestsSection() {
  const {
    requests,
    isLoading,
    activeRequestId,
    activeAction,
    error,
    success,
    fetchRequests,
    handleVerify,
    handleApprove,
    handleReject,
  } = useAdminRequests();

  const onVerify = async (request) => {
    const confirmed = window.confirm(
      `Verify the email of ${request.name || "this applicant"}?`
    );

    if (!confirmed) return;

    await handleVerify(request._id);
  };

  const onApprove = async (request) => {
    const confirmed = window.confirm(
      `Approve ${request.organizationName}? This will create its Organization Admin account.`
    );

    if (!confirmed) return;

    await handleApprove(request._id);
  };

  const onReject = async (request) => {
    const rejectionReason = window.prompt(
      `Enter rejection reason for ${request.organizationName}:`
    );

    if (rejectionReason === null) return;

    if (!rejectionReason.trim()) {
      window.alert("Rejection reason is required.");
      return;
    }

    await handleReject(request._id, rejectionReason.trim());
  };

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <section className="mt-8 overflow-hidden rounded-[24px] border border-slate-200/80 bg-white shadow-sm">

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-slate-100 px-5 py-6 sm:flex-row sm:items-center sm:px-7">

        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50">
              <Building2 size={20} className="text-amber-600" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Organization Requests
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Review, verify and approve new organization applications.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700">
            {requests.length} Requests
          </span>

          <button
            type="button"
            onClick={fetchRequests}
            disabled={isLoading}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
          >
            <RefreshCw
              size={14}
              className={isLoading ? "animate-spin" : ""}
            />

            Refresh
          </button>
        </div>
      </div>

      {/* Feedback */}
      {(error || success) && (
        <div className="space-y-2 px-5 pt-5 sm:px-7">
          {error && (
            <div className="flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 p-3 text-sm text-red-700">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          {success && (
            <div className="flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 p-3 text-sm text-emerald-700">
              <CheckCircle2 size={16} />
              {success}
            </div>
          )}
        </div>
      )}

      {/* Loading */}
      {isLoading ? (
        <div className="flex min-h-56 flex-col items-center justify-center gap-3">
          <RefreshCw
            size={24}
            className="animate-spin text-indigo-500"
          />

          <p className="text-sm text-slate-500">
            Loading organization requests...
          </p>
        </div>
      ) : requests.length === 0 ? (
        /* Empty state */
        <div className="flex min-h-64 flex-col items-center justify-center px-5 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
            <Building2 size={25} className="text-slate-400" />
          </div>

          <h3 className="mt-4 text-base font-semibold text-slate-800">
            No pending requests
          </h3>

          <p className="mt-2 max-w-sm text-sm text-slate-400">
            New organization applications will appear here when submitted.
          </p>
        </div>
      ) : (
        /* Request cards */
        <div className="grid gap-4 p-5 sm:p-7 lg:grid-cols-2">

          {requests.map((request) => {
            const isProcessing =
              activeRequestId === request._id;

            const isVerified = request.status === "VERIFIED";

            return (
              <article
                key={request._id}
                className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-indigo-200 hover:shadow-md"
              >

                {/* Organization heading */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50">
                      <Building2
                        size={21}
                        className="text-indigo-600"
                      />
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-900">
                        {request.organizationName || "Unnamed Organization"}
                      </h3>

                      <p className="mt-1 text-xs text-slate-500">
                        {request.organizationType || "Organization"}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-3 py-1.5 text-[10px] font-bold ${
                      isVerified
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {request.status || "PENDING"}
                  </span>
                </div>

                {/* Applicant details */}
                <div className="mt-5 space-y-3 border-t border-slate-100 pt-4">

                  <div className="flex items-center gap-2.5 text-sm text-slate-600">
                    <ShieldCheck
                      size={15}
                      className="shrink-0 text-slate-400"
                    />

                    <span>
                      {request.name || "Applicant name unavailable"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 text-sm text-slate-600">
                    <Mail
                      size={15}
                      className="shrink-0 text-slate-400"
                    />

                    <span className="break-all">
                      {request.email || "Email unavailable"}
                    </span>
                  </div>

                  {request.mobile && (
                    <div className="flex items-center gap-2.5 text-sm text-slate-600">
                      <Phone
                        size={15}
                        className="shrink-0 text-slate-400"
                      />

                      {request.mobile}
                    </div>
                  )}

                  <div className="flex items-center gap-2.5 text-xs text-slate-400">
                    <Clock3 size={14} />

                    Submitted: {formatDate(request.createdAt)}
                  </div>
                </div>

                {/* Description */}
                {request.description && (
                  <p className="mt-4 line-clamp-3 rounded-xl bg-slate-50 p-3 text-xs leading-5 text-slate-600">
                    {request.description}
                  </p>
                )}

                {/* Actions */}
                <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-100 pt-4">

                  {!isVerified && (
                    <button
                      type="button"
                      disabled={isProcessing || Boolean(activeRequestId)}
                      onClick={() => onVerify(request)}
                      className="inline-flex items-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 px-3.5 py-2.5 text-xs font-semibold text-indigo-700 transition hover:bg-indigo-100 disabled:opacity-50"
                    >
                      {isProcessing && activeAction === "VERIFY" ? (
                        <RefreshCw size={14} className="animate-spin" />
                      ) : (
                        <CheckCircle2 size={14} />
                      )}

                      Verify
                    </button>
                  )}

                  {isVerified && (
                    <button
                      type="button"
                      disabled={Boolean(activeRequestId)}
                      onClick={() => onApprove(request)}
                      className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-3.5 py-2.5 text-xs font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50"
                    >
                      {isProcessing && activeAction === "APPROVE" ? (
                        <RefreshCw size={14} className="animate-spin" />
                      ) : (
                        <CheckCircle2 size={14} />
                      )}

                      Approve Organization
                    </button>
                  )}

                  <button
                    type="button"
                    disabled={Boolean(activeRequestId)}
                    onClick={() => onReject(request)}
                    className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                  >
                    {isProcessing && activeAction === "REJECT" ? (
                      <RefreshCw size={14} className="animate-spin" />
                    ) : (
                      <XCircle size={14} />
                    )}

                    Reject
                  </button>
                </div>
              </article>
            );
          })}

        </div>
      )}
    </section>
  );
}

export default AdminRequestsSection;