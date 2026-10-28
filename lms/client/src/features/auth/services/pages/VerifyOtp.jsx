
import { useState } from "react";
import { Mail, ArrowRight, Smartphone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useVerifyOtp from "../hooks/useVerifyOtp.js";

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

  if (!flow || !identifier || !method) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-950 p-6 text-white">
        <p>OTP verification session not found.</p>

        <button
          onClick={() => navigate("/login", { replace: true })}
          className="rounded-xl bg-indigo-600 px-5 py-2 hover:bg-indigo-500"
        >
          Back to Login
        </button>
      </div>
    );
  }

  const isEmail = method === "email";

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
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/15">
          {isEmail ? (
            <Mail size={26} className="text-indigo-400" />
          ) : (
            <Smartphone size={26} className="text-indigo-400" />
          )}
        </div>

        <h1 className="text-2xl font-bold">
          Verify your {isEmail ? "email" : "mobile"}
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Enter the OTP sent to{" "}
          <span className="break-all text-slate-200">
            {identifier}
          </span>
        </p>

        <p className="mt-2 text-xs text-slate-500">
          {flow === "login"
            ? "Complete login verification."
            : "Complete your account registration."}
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label
            htmlFor="otp"
            className="block text-sm font-medium text-slate-200"
          >
            6-digit OTP
          </label>

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
            placeholder="Enter OTP"
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-center text-xl tracking-[0.5em] outline-none focus:border-indigo-500"
          />

          {(localError || error) && (
            <p role="alert" className="text-sm text-red-400">
              {localError || error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 font-semibold hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Verifying..." : "Verify OTP"}
            {!isSubmitting && <ArrowRight size={17} />}
          </button>
        </form>
      </div>
    </div>
  );
}

export default VerifyOtp;
