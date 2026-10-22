
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setGoogleAuth } from "../authSlices/authSlice.js";

function GoogleAuthCallback() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const started = useRef(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    try {
      const params = new URLSearchParams(
        window.location.hash.slice(1)
      );

      const accessToken = params.get("accessToken");
      const userData = params.get("user");

      // Remove callback data from URL
      window.history.replaceState(
        null,
        "",
        window.location.pathname
      );

      if (!accessToken || !userData) {
        throw new Error("Google authentication data missing.");
      }

      const user = JSON.parse(userData);

      dispatch(setGoogleAuth({ user, accessToken }));
      navigate("/dashboard", { replace: true });
    } catch {
      setError("Google login failed. Please try again.");
    }
  }, [dispatch, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
      <div className="text-center">
        {error ? (
          <>
            <p className="text-red-400">{error}</p>
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="mt-4 rounded-lg bg-indigo-600 px-4 py-2"
            >
              Back to Login
            </button>
          </>
        ) : (
          <p>Signing in with Google...</p>
        )}
      </div>
    </div>
  );
}

export default GoogleAuthCallback;
