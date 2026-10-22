import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import authService from "../services/authService";
import { setGoogleAuth } from "../authSlices/authSlice.js";

function GoogleAuthCallback() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const started = useRef(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const finishGoogleLogin = async () => {
      try {
        const params = new URLSearchParams(
          window.location.search
        );
        const code = params.get("code");

        window.history.replaceState(
          null,
          "",
          window.location.pathname
        );

        if (!code) {
          throw new Error("Google authorization code missing.");
        }

        const result =
          await authService.exchangeGoogleAuthCode(code);

        const response = result?.data ?? result;

        if (!response?.user || !response?.accessToken) {
          throw new Error("Google authentication response is incomplete.");
        }

        dispatch(
          setGoogleAuth({
            user: response.user,
            accessToken: response.accessToken,
          })
        );

        navigate("/dashboard", { replace: true });
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

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
      {error ? (
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