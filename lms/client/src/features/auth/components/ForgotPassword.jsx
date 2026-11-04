
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Mail,
  ShieldCheck,
  LockKeyhole,
  CheckCircle2,
  Loader2,
  KeyRound,
} from "lucide-react";

import useForgotPassword from "../hooks/useForgotPassword.js";

function ForgotPassword() {
  const navigate = useNavigate();

  const {
    step,
    identifier,
    setIdentifier,
    code,
    setCode,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    loading,
    error,
    message,
    handleRequestOtp,
    handleVerifyOtp,
    handleResetPassword,
    handleResendOtp,
    goBackToOtp,
  } = useForgotPassword();

  const steps = [
    "Email",
    "Verify OTP",
    "New Password",
  ];

  const isCompleted = step === 4;

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20";

  const buttonClass =
    "flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50";

  const renderHeader = () => (
    <div className="mb-8 text-center">
      <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-indigo-400/20 bg-indigo-500/10 text-indigo-400">
        {step === 1 && <Mail size={25} />}
        {step === 2 && <ShieldCheck size={25} />}
        {step === 3 && <LockKeyhole size={25} />}
        {step === 4 && <CheckCircle2 size={25} />}
      </div>

      <h1 className="text-2xl font-bold text-white">
        {step === 1 && "Forgot Password?"}
        {step === 2 && "Verify OTP"}
        {step === 3 && "Create New Password"}
        {step === 4 && "Password Updated!"}
      </h1>

      <p className="mt-2 text-sm text-slate-400">
        {step === 1 &&
          "Enter your registered identifier to receive a reset OTP."}

        {step === 2 &&
          `Enter the verification code sent to your registered account.`}

        {step === 3 &&
          "Create a new password for your LearnHub account."}

        {step === 4 &&
          "Your password has been changed successfully. You can now log in."}
      </p>
    </div>
  );

  const renderProgress = () => (
    <div className="mb-8 flex items-center justify-between">
      {steps.map((item, index) => {
        const currentStep = index + 1;
        const active = step >= currentStep;

        return (
          <div key={item} className="flex flex-1 items-center">
            <div className="flex flex-col items-center gap-2">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold ${
                  active
                    ? "bg-indigo-600 text-white"
                    : "border border-white/10 bg-white/5 text-slate-500"
                }`}
              >
                {step > currentStep ? (
                  <CheckCircle2 size={17} />
                ) : (
                  currentStep
                )}
              </div>

              <span
                className={`text-[10px] sm:text-xs ${
                  active ? "text-indigo-300" : "text-slate-500"
                }`}
              >
                {item}
              </span>
            </div>

            {index !== 2 && (
              <div
                className={`mx-2 mb-6 h-px flex-1 ${
                  step > currentStep
                    ? "bg-indigo-500"
                    : "bg-white/10"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#080b14] px-4 py-10 text-white">
      <div className="w-full max-w-md">

        <div className="mb-8 text-center">
          <Link to="/login" className="text-2xl font-black tracking-tight">
            <span className="text-white">Learn</span>
            <span className="text-indigo-400">Hub</span>
          </Link>

          <p className="mt-2 text-xs tracking-widest text-slate-500">
            ACCOUNT RECOVERY
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#101522] p-6 shadow-2xl sm:p-8">

          {!isCompleted && renderProgress()}

          {renderHeader()}

          {error && (
            <div
              role="alert"
              className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300"
            >
              {error}
            </div>
          )}

          {message && (
            <div
              role="status"
              className="mb-5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300"
            >
              {message}
            </div>
          )}

          {/* STEP 1: IDENTIFIER */}
          {step === 1 && (
            <form onSubmit={handleRequestOtp} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Registered email or identifier
                </label>

                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Enter your registered identifier"
                  autoComplete="username"
                  required
                  className={inputClass}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={buttonClass}
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  <>
                    Send Reset OTP
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>
          )}

          {/* STEP 2: VERIFY OTP */}
          {step === 2 && (
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Verification Code
                </label>

                <input
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  value={code}
                  onChange={(e) =>
                    setCode(e.target.value.replace(/\D/g, ""))
                  }
                  placeholder="Enter OTP"
                  required
                  className={`${inputClass} text-center text-xl tracking-[0.4em]`}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={buttonClass}
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    Verify OTP
                    <ShieldCheck size={18} />
                  </>
                )}
              </button>

              <div className="flex items-center justify-between gap-3 text-sm">
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={loading}
                  className="text-indigo-400 hover:text-indigo-300 disabled:opacity-50"
                >
                  Resend OTP
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setCode("");
                  }}
                  className="text-slate-400 hover:text-white"
                >
                  Clear OTP
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: NEW PASSWORD */}
          {step === 3 && (
            <form onSubmit={handleResetPassword} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  New Password
                </label>

                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  autoComplete="new-password"
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Confirm New Password
                </label>

                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  autoComplete="new-password"
                  required
                  className={inputClass}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={buttonClass}
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Updating Password...
                  </>
                ) : (
                  <>
                    Reset Password
                    <KeyRound size={18} />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={goBackToOtp}
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 text-sm text-slate-400 hover:text-white"
              >
                <ArrowLeft size={16} />
                Back to OTP
              </button>
            </form>
          )}

          {/* STEP 4: SUCCESS */}
          {step === 4 && (
            <div className="space-y-5">
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-center">
                <CheckCircle2
                  size={42}
                  className="mx-auto mb-3 text-emerald-400"
                />

                <p className="text-sm text-emerald-300">
                  Your new password is ready to use.
                </p>
              </div>

              <button
                type="button"
                onClick={() => navigate("/login", { replace: true })}
                className={buttonClass}
              >
                Continue to Login
                <ArrowRight size={18} />
              </button>
            </div>
          )}

          {step !== 4 && (
            <div className="mt-7 border-t border-white/10 pt-5 text-center">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-indigo-400"
              >
                <ArrowLeft size={15} />
                Back to Login
              </Link>
            </div>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-slate-600">
          © {new Date().getFullYear()} LearnHub. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
