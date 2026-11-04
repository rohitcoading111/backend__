
import { useState } from "react";
import {
  Mail,
  Smartphone,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import useVerifyOtp from "../hooks/useVerifyOtp.js";
import AuthLayout from "../components/AuthLayout";

function VerifyOtp() {
  const navigate = useNavigate();

  const {
    flow,
    method,
    identifier,
    otp,
    setOtp,
    onSubmit,
    isSubmitting,
    error,
  } = useVerifyOtp();

  const [localError, setLocalError] = useState("");

  const isEmail = method === "email";

  if (!flow || !identifier || !method) {
    return (
      <AuthLayout
        eyebrow="Verification"
        title="Session not found"
        description="Your OTP verification session is unavailable."
      >
        <button
          type="button"
          onClick={() => navigate("/login", { replace: true })}
          className="auth-primary-button"
        >
          Back to Login
          <ArrowRight size={17} />
        </button>
      </AuthLayout>
    );
  }

  const handleSubmit = (event) => {
    setLocalError("");

    if (!/^\d{6}$/.test(otp)) {
      event.preventDefault();
      setLocalError("Please enter a valid 6-digit OTP.");
      return;
    }

    onSubmit(event);
  };

  return (
    <AuthLayout
      eyebrow="Security verification"
      title={`Verify your ${isEmail ? "email" : "mobile"}`}
      description="Enter the verification code to securely continue."
    >
      {/* OTP Icon */}
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.04] text-white shadow-[0_0_18px_rgba(255,255,255,0.07)]">
        {isEmail ? (
          <Mail size={25} />
        ) : (
          <Smartphone size={25} />
        )}
      </div>

      <div className="mb-6">
        <p className="text-sm text-neutral-400">
          Enter the OTP sent to:
        </p>

        <p className="mt-2 break-all text-sm font-semibold text-white">
          {identifier}
        </p>

        <p className="mt-3 text-xs text-neutral-500">
          {flow === "login"
            ? "Complete login verification."
            : "Complete your account registration."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="otp"
            className="mb-2 block text-sm font-medium text-neutral-300"
          >
            6-digit verification code
          </label>

          <div className="auth-input-wrapper">
            <ShieldCheck
              size={19}
              className="shrink-0 text-neutral-400"
            />

            <input
              id="otp"
              name="otp"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              required
              value={otp}
              onChange={(event) => {
                setOtp(
                  event.target.value.replace(/\D/g, "").slice(0, 6)
                );
                setLocalError("");
              }}
              placeholder="000000"
              className="auth-input text-center text-xl tracking-[0.5em]"
            />
          </div>
        </div>

        {(localError || error) && (
          <p
            role="alert"
            className="rounded-xl border border-red-500/20 bg-red-500/[0.06] px-3 py-2 text-sm text-red-400"
          >
            {localError || error}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="auth-primary-button"
        >
          {isSubmitting ? "Verifying..." : "Verify OTP"}

          {!isSubmitting && <ArrowRight size={17} />}
        </button>
      </form>

      <p className="mt-7 text-center text-xs text-neutral-500">
        Need to start again?{" "}
        <Link
          to="/login"
          className="font-semibold text-white hover:underline"
        >
          Back to login
        </Link>
      </p>

      <p className="mt-6 text-center text-[11px] text-neutral-600">
        Your verification is protected by LearnHub.
      </p>
    </AuthLayout>
  );
}

export default VerifyOtp;
