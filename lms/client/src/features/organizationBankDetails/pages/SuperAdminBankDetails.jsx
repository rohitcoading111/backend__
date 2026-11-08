import { useState } from "react";
import { ArrowLeft, Building2 } from "lucide-react";
import { Link } from "react-router-dom";

import BankDetailsModal from "../components/BankDetailsModal.jsx";
import BankVerificationStatus from "../components/BankVerificationStatus.jsx";
import useOrganizationBankDetails from "../hooks/useOrganizationBankDetails.js";

function formatDate(dateString) {
  if (!dateString) return "—";

  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function SuperAdminBankDetails() {
  const { bankDetailsList, isLoading, error, fetchBankDetails } = useOrganizationBankDetails({ scope: "all" });
  const [selectedOrganizationId, setSelectedOrganizationId] = useState(null);

  return (
    <main className="min-h-screen bg-[#070707] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Super admin</p>
            <h1 className="mt-2 text-3xl font-bold text-white">Organization bank details</h1>
          </div>
          <Link to="/super-admin-dashboard" className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white">
            <span className="inline-flex items-center gap-2">
              <ArrowLeft size={16} />
              Dashboard
            </span>
          </Link>
        </div>

        <section className="rounded-[28px] border border-white/10 bg-[#111111] p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5">
              <Building2 size={18} />
            </div>
            <h2 className="text-xl font-semibold text-white">All organizations</h2>
          </div>

          {error ? (
            <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">{error}</div>
          ) : null}

          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((item) => (
                <div key={item} className="h-24 animate-pulse rounded-2xl bg-white/5" />
              ))}
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0d]">
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm text-white">
                  <thead className="bg-white/5 text-[10px] uppercase tracking-[0.18em] text-slate-400">
                    <tr>
                      <th className="px-5 py-4">Organization</th>
                      <th className="px-5 py-4">Account holder</th>
                      <th className="px-5 py-4">Bank</th>
                      <th className="px-5 py-4">Account</th>
                      <th className="px-5 py-4">IFSC</th>
                      <th className="px-5 py-4">Type</th>
                      <th className="px-5 py-4">Status</th>
                      <th className="px-5 py-4">Date</th>
                      <th className="px-5 py-4">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {bankDetailsList.length === 0 ? (
                      <tr>
                        <td colSpan="9" className="px-5 py-8 text-center text-slate-400">
                          No bank details submitted yet.
                        </td>
                      </tr>
                    ) : (
                      bankDetailsList.map((record) => (
                        <tr key={record?.id || record?.organization?._id} className="hover:bg-white/5">
                          <td className="px-5 py-4 font-medium">{record?.organization?.name || "—"}</td>
                          <td className="px-5 py-4">{record?.accountHolderName || "—"}</td>
                          <td className="px-5 py-4">{record?.bankName || "—"}</td>
                          <td className="px-5 py-4">{record?.accountNumber || "—"}</td>
                          <td className="px-5 py-4">{record?.ifscCode || "—"}</td>
                          <td className="px-5 py-4">{record?.accountType || "—"}</td>
                          <td className="px-5 py-4"><BankVerificationStatus status={record?.verificationStatus} /></td>
                          <td className="px-5 py-4">{formatDate(record?.createdAt)}</td>
                          <td className="px-5 py-4">
                            <button
                              type="button"
                              onClick={() => setSelectedOrganizationId(record?.organization?._id || record?.organization)}
                              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-white transition hover:bg-white/10"
                            >
                              View details
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
      </div>

      {selectedOrganizationId ? (
        <BankDetailsModal
          organizationId={selectedOrganizationId}
          onClose={() => setSelectedOrganizationId(null)}
          onUpdated={() => fetchBankDetails({ silent: true })}
        />
      ) : null}
    </main>
  );
}

export default SuperAdminBankDetails;
