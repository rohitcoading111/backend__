
import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, ArrowRight, Smartphone } from "lucide-react";
import useLoginForm from "../hooks/useLoginForm";

function LoginForm() {
  const [identifier, setIdentifier] = useState("");

  // Detect whether the user is entering a mobile number
  const isPhone =
    /^[0-9+ ]*$/.test(identifier) && identifier.length > 0;

  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    serverError,
    rememberMe,
    setRememberMe,
  } = useLoginForm();

  return (
    <div className="w-full max-w-md">
      <div className="mb-5"></div>

      <form
        className="space-y-4"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        {/* Email or Mobile */}
        <div>
          <label
            htmlFor="identifier"
            className="mb-1.5 block text-xs font-medium text-slate-200"
          >
            Email or Mobile Number
          </label>

          <div className="flex items-center gap-2.5 rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20">
            {isPhone ? (
              <Smartphone
                size={18}
                className="shrink-0 text-indigo-400"
              />
            ) : (
              <Mail size={18} className="shrink-0 text-slate-400" />
            )}

            {/* Fixed +91 prefix for mobile; email input remains unchanged */}
            {isPhone ? (
              <>
                <span className="shrink-0 text-sm text-slate-300">
                  +91
                </span>

                <input
                  id="identifier"
                  type="tel"
                  autoComplete="tel-national"
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  {...register("identifier", {
                    required: "Mobile number is required",
                    validate: (value) =>
                      /^[6-9]\d{9}$/.test(value) ||
                      "Enter a valid 10-digit Indian mobile number",
                  })}
                  onChange={(event) => {
                    const value = event.target.value.replace(/\D/g, "");
                    event.target.value = value;
                    setIdentifier(value);
                  }}
                  className="w-full bg-transparent py-2.5 text-sm text-white outline-none placeholder:text-slate-500"
                />
              </>
            ) : (
              <input
                id="identifier"
                type="text"
                autoComplete="username"
                placeholder="Email or mobile number"
                {...register("identifier", {
                  required: "Email or mobile number is required",
                  validate: (value) => {
                    const input = value.trim();

                    const isEmail =
                      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);

                    const isPhone = /^\+?[0-9]{10,15}$/.test(input);

                    return (
                      isEmail ||
                      isPhone ||
                      "Enter a valid email or mobile number"
                    );
                  },
                  onChange: (event) => {
                    setIdentifier(event.target.value);
                  },
                })}
                className="w-full bg-transparent py-2.5 text-sm text-white outline-none placeholder:text-slate-500"
              />
            )}
          </div>

          {errors.identifier && (
            <p className="mt-1.5 text-xs text-red-400">
              {errors.identifier.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="mb-1.5 block text-xs font-medium text-slate-200"
          >
            Password
          </label>

          <div className="flex items-center gap-2.5 rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20">
            <Lock size={18} className="shrink-0 text-slate-400" />

            <input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
              })}
              className="w-full bg-transparent py-2.5 text-sm text-white outline-none placeholder:text-slate-500"
            />
          </div>

          {errors.password && (
            <p className="mt-1.5 text-xs text-red-400">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between gap-2 text-xs">
          <label className="flex items-center gap-2 text-slate-400">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-3.5 w-3.5 rounded accent-indigo-500"
            />
            Remember me
          </label>

          <Link
            to="/forgot-password"
            className="font-medium text-indigo-400 hover:text-indigo-300"
          >
            Forgot password?
          </Link>
        </div>

        {/* Backend Error */}
        {serverError && (
          <p role="alert" className="text-sm text-red-400">
            {typeof serverError === "string"
              ? serverError
              : "Login failed. Please try again."}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Logging in..." : "Login"}
          {!isSubmitting && <ArrowRight size={16} />}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
