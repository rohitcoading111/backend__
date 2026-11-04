
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import LoginForm from "../components/LoginForm";
import AuthLayout from "../components/AuthLayout";
import authService from "../services/authService";

function Login() {
  const handleGoogleLogin = () => {
    window.location.href = authService.getGoogleAuthUrl();
  };

  return (
    <AuthLayout
      eyebrow="Welcome back"
      title="Login to your account"
      description="Enter your credentials to continue learning."
    >
      <LoginForm />

      {/* Divider */}
      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-white/10" />
        <span className="text-[11px] uppercase tracking-wider text-neutral-500">
          Or continue with
        </span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      {/* Google Login */}
      <button
        type="button"
        onClick={handleGoogleLogin}
        className="auth-google-button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <path
            fill="#EA4335"
            d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 3.06 13.22l7.98 6.19C12.93 13.72 18.06 9.5 24 9.5Z"
          />
          <path
            fill="#4285F4"
            d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.76 7.18l7.73 6C44.42 37.98 46.98 31.82 46.98 24.55Z"
          />
          <path
            fill="#FBBC05"
            d="M10.04 28.59A14.4 14.4 0 0 1 9.25 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 2.57 10.78l7.47-6.19Z"
          />
          <path
            fill="#34A853"
            d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.15 1.45-4.89 2.3-8.18 2.3-5.94 0-11.07-4.22-12.96-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
          />
        </svg>

        Continue with Google
        <ArrowRight size={16} />
      </button>

      {/* Register Link */}
      <p className="mt-7 text-center text-sm text-neutral-400">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-semibold text-white underline-offset-4 hover:underline"
        >
          Create account
        </Link>
      </p>

      {/* Organization Registration */}
      <p className="mt-4 text-center text-sm text-neutral-400">
        Managing an organization?{" "}
        <Link
          to="/register-organization"
          className="font-semibold text-white underline-offset-4 hover:underline"
        >
          Register organization
        </Link>
      </p>

      <p className="mt-6 text-center text-[11px] text-neutral-600">
        © 2026 LearnHub. All rights reserved.
      </p>
    </AuthLayout>
  );
}

export default Login;
