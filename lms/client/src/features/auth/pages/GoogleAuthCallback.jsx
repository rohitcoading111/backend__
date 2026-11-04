import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import authService from "../services/authService";
import { setGoogleAuth } from "../authSlices/authSlice.js";
import { getDashboardPath } from "../utils/getDashboardPath.js";

function GoogleAuthCallback() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const started = useRef(false);
  const [error, setError] = useState("");
  const [registrationCode, setRegistrationCode] = useState("");
  const [selectedRole, setSelectedRole] = useState("STUDENT");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const finishGoogleLogin = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");
        const registrationRequired =
          params.get("registration") === "1";

        window.history.replaceState(
          null,
          "",
          window.location.pathname
        );

        if (!code) {
          throw new Error("Google authorization code missing.");
        }

        if (registrationRequired) {
          setRegistrationCode(code);
          return;
        }

        const result =
          await authService.exchangeGoogleAuthCode(code);

        const response = result?.data ?? result;

        if (!response?.user || !response?.accessToken) {
          throw new Error(
            "Google authentication response is incomplete."
          );
        }

        dispatch(
          setGoogleAuth({
            user: response.user,
            accessToken: response.accessToken,
          })
        );

        navigate(getDashboardPath(response.user), {
          replace: true,
        });
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Google login failed. Please try again."
        );
      }
    };

    finishGoogleLogin();
  }, [dispatch, navigate]);

  const handleGoogleRegistration = async () => {
    setIsSubmitting(true);
    setError("");

    try {
      const result = await authService.completeGoogleRegistration({
        code: registrationCode,
        role: selectedRole,
      });
      const response = result?.data ?? result;

      if (!response?.user || !response?.accessToken) {
        throw new Error(
          "Google registration response is incomplete."
        );
      }

      dispatch(
        setGoogleAuth({
          user: response.user,
          accessToken: response.accessToken,
        })
      );

      navigate(getDashboardPath(response.user), {
        replace: true,
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Google registration failed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
      {registrationCode ? (
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
          <h1 className="text-2xl font-bold">Choose your account type</h1>
          <p className="mt-2 text-sm text-neutral-400">
            Select how you want to use LearnHub.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            {[
              { value: "STUDENT", label: "Student" },
              { value: "INSTRUCTOR", label: "Instructor" },
            ].map((role) => (
              <button
                key={role.value}
                type="button"
                aria-pressed={selectedRole === role.value}
                onClick={() => setSelectedRole(role.value)}
                className={`rounded-xl border px-4 py-3 font-semibold ${
                  selectedRole === role.value
                    ? "border-indigo-400 bg-indigo-500/20 text-white"
                    : "border-white/10 text-neutral-300"
                }`}
              >
                {role.label}
              </button>
            ))}
          </div>

          {selectedRole === "INSTRUCTOR" && (
            <p className="mt-3 text-left text-xs text-neutral-400">
              You will get an independent instructor account. Organization access requires assignment by an Organization Admin.
            </p>
          )}

          {error && (
            <p role="alert" className="mt-4 text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="button"
            onClick={handleGoogleRegistration}
            disabled={isSubmitting}
            className="mt-6 w-full rounded-xl bg-indigo-600 px-4 py-3 font-semibold disabled:opacity-60"
          >
            {isSubmitting ? "Creating account..." : "Continue"}
          </button>
        </div>
      ) : error ? (
        <div className="text-center">
          <p className="text-red-400">{error}</p>

          <button
            onClick={() => navigate("/login")}
            className="mt-4 rounded-lg bg-indigo-600 px-4 py-2"
          >
            Back to Login
          </button>
        </div>
      ) : (
        <p>Signing in with Google...</p>
      )}
    </div>
  );
}

export default GoogleAuthCallback;