
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Mail, ArrowRight } from "lucide-react";

function VerifyOtp() {
  const location = useLocation();
  const navigate = useNavigate();

  const { flow, email } = location.state || {};

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (!/^\d{6}$/.test(otp)) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    // Next step: backend OTP verification API call.
    console.log("OTP:", otp);
    console.log("Flow:", flow);
    console.log("Email:", email);
  };

  if (!flow || !email) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-slate-950 p-6 text-white">
        <p>OTP verification session not found.</p>
        <button
          onClick={() => navigate("/login")}
          className="rounded-xl bg-indigo-600 px-5 py-2"
        >
          Back to Login
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/15">
          <Mail size={26} className="text-indigo-400" />
        </div>

        <h1 className="text-2xl font-bold">
          Verify your email
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Enter the OTP sent to{" "}
          <span className="text-slate-200">{email}</span>
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
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            value={otp}
            onChange={(event) =>
              setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))
            }
            placeholder="Enter OTP"
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-center text-xl tracking-[0.5em] outline-none focus:border-indigo-500"
          />

          {error && (
            <p role="alert" className="text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 font-semibold hover:bg-indigo-500"
          >
            Verify OTP
            <ArrowRight size={17} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default VerifyOtp;
