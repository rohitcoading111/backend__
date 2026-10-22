
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function GoogleAuthCallback() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    // Backend abhi frontend par redirect nahi karta.
    // Isliye bina response ke auth state update nahi kar sakte.
    setError(
      "Google callback integration is not connected yet."
    );
  }, []);

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
