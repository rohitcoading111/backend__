
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Lock,
  ArrowRight,
  Smartphone,
} from "lucide-react";

import useLoginForm from "../hooks/useLoginForm";

function LoginForm() {
  const [identifier, setIdentifier] = useState("");

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

  const identifierField = register("identifier", {
    required: "Email or mobile number is required",

    validate: (value) => {
      const input = value.trim();

      const isEmail =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);

      const isPhone =
        /^[6-9]\d{9}$/.test(input);

      return (
        isEmail ||
        isPhone ||
        "Enter a valid email or 10-digit mobile number"
      );
    },

    onChange: (event) => {
      setIdentifier(event.target.value);
    },
  });

  return (
    <div className="w-full max-w-md">

      <form
        className="space-y-4"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >

        {/* Email or Mobile */}

        <div>
          <label
            htmlFor="identifier"
            className="mb-2 block text-xs font-medium text-slate-200"
          >
            Email or Mobile Number
          </label>

          <div className="auth-field">

            {isPhone ? (
              <Smartphone
                size={19}
                className="shrink-0 text-slate-400"
              />
            ) : (
              <Mail
                size={19}
                className="shrink-0 text-slate-400"
              />
            )}

            {isPhone && (
              <span className="shrink-0 text-sm text-slate-300">
                +91
              </span>
            )}

            <input
              id="identifier"
              type={isPhone ? "tel" : "text"}
              inputMode={isPhone ? "numeric" : "text"}
              autoComplete="username"
              placeholder={
                isPhone
                  ? "10-digit mobile number"
                  : "Email or mobile number"
              }
              maxLength={isPhone ? 10 : undefined}
              {...identifierField}
              onChange={(event) => {
                if (isPhone) {
                  const value = event.target.value
                    .replace(/\D/g, "")
                    .slice(0, 10);

                  event.target.value = value;
                  identifierField.onChange(event);
                } else {
                  identifierField.onChange(event);
                }
              }}
              className="auth-input"
            />

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
            className="mb-2 block text-xs font-medium text-slate-200"
          >
            Password
          </label>

          <div className="auth-field">

            <Lock
              size={19}
              className="shrink-0 text-slate-400"
            />

            <input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
              })}
              className="auth-input"
            />

          </div>

          {errors.password && (
            <p className="mt-1.5 text-xs text-red-400">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Remember Me & Forgot Password */}

        <div className="flex items-center justify-between gap-3 text-xs">

          <label className="flex items-center gap-2 text-slate-400 cursor-pointer">

            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(event) =>
                setRememberMe(event.target.checked)
              }
              className="h-4 w-4 accent-white"
            />

            Remember me

          </label>

          <Link
            to="/forgot-password"
            className="font-medium text-slate-300 transition hover:text-white"
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
          className="auth-primary-button"
        >
          {isSubmitting ? "Logging in..." : "Login"}

          {!isSubmitting && <ArrowRight size={17} />}
        </button>

      </form>

    </div>
  );
}

export default LoginForm;
