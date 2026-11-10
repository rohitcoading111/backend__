import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { getOrganizationPolicyStatus } from "../features/organizationPolicies/services/organizationPolicyService.js";

function OrganizationPolicyGuard() {
  const user = useSelector((state) => state.auth?.user);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let isActive = true;

    getOrganizationPolicyStatus()
      .then((policyStatus) => {
        if (isActive) {
          setStatus(policyStatus.accepted ? "accepted" : "required");
        }
      })
      .catch((requestError) => {
        if (isActive) {
          setStatus("error");
          setError(
            requestError.response?.data?.message ||
              requestError.message ||
              "Unable to verify policy acceptance."
          );
        }
      });

    return () => {
      isActive = false;
    };
  }, [attempt]);

  if (status === "loading") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#070707] px-4 text-white">
        <div role="status" className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-5 text-sm text-slate-300">
          Checking organization policies…
        </div>
      </main>
    );
  }

  if (status === "required") {
    return <Navigate to="/organization-policy-acceptance" replace />;
  }

  if (status === "error") {
    if (user?.role === "ADMIN" && !user?.adminStatus) {
      return <Navigate to="/login" replace />;
    }

    return (
      <main className="flex min-h-screen items-center justify-center bg-[#070707] px-4 text-white">
        <section className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#111111] p-6 shadow-[0_0_40px_rgba(255,255,255,0.04)]">
          <h1 className="text-xl font-semibold">Could not verify policy acceptance</h1>
          <p role="alert" className="mt-3 text-sm text-slate-300">{error}</p>
          <button
            type="button"
            onClick={() => {
              setError("");
              setStatus("loading");
              setAttempt((value) => value + 1);
            }}
            className="mt-5 rounded-xl border border-white/20 bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-slate-200"
          >
            Try again
          </button>
        </section>
      </main>
    );
  }

  return <Outlet />;
}

export default OrganizationPolicyGuard;
