import {
  UserRound,
  Mail,
  Smartphone,
  Lock,
  Building2,
  FileText,
  ArrowRight,
  CheckCircle2,
  Copy,
  AlertCircle,
} from "lucide-react";

import { Link } from "react-router-dom";

import useCreateAdminRequest from "../hooks/useCreateAdminRequest.js";

function OrganizationRequestForm() {
  const {
    register,
    handleSubmit,
    errors,
    password,
    mobileField,

    isSubmitting,
    error,
    successData,
    isCopied,

    onSubmit,
    handleCopyRequestId,
  } = useCreateAdminRequest();

  // ==========================================
  // SUCCESS SCREEN
  // ==========================================

  if (successData) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-7 text-center shadow-2xl sm:p-9">

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10">
          <CheckCircle2
            size={32}
            className="text-emerald-400"
          />
        </div>

        <h2 className="mt-6 text-2xl font-bold text-white">
          Request Submitted!
        </h2>

        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-400">
          Your organization application has been submitted successfully.
          Your request will go through the Super Admin approval process.
        </p>

        {/* Request ID */}
        <div className="mt-7 rounded-2xl border border-slate-700 bg-slate-800/70 p-5 text-left">

          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
            Request ID
          </p>

          <div className="mt-2 flex items-center justify-between gap-3">

            <p className="break-all text-sm font-semibold text-indigo-300">
              {successData.requestId}
            </p>

            <button
              type="button"
              onClick={handleCopyRequestId}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-lg p-2 text-slate-400 transition hover:bg-slate-700 hover:text-white"
              title={isCopied ? "Copied!" : "Copy request ID"}
            >
              {isCopied ? (
                <>
                  <CheckCircle2 size={16} />
                  <span className="text-xs">Copied</span>
                </>
              ) : (
                <Copy size={16} />
              )}
            </button>

          </div>

          {/* Status */}
          <div className="mt-5 flex items-center justify-between border-t border-slate-700 pt-4">

            <span className="text-xs text-slate-400">
              Application Status
            </span>

            <span className="rounded-full bg-amber-500/10 px-3 py-1.5 text-xs font-semibold text-amber-300">
              {successData.status || "PENDING"}
            </span>

          </div>
        </div>

        <p className="mt-5 text-xs leading-5 text-slate-500">
          Your Organization Admin account will be created after approval.
          You can use the login page once your account is approved.
        </p>

        <Link
          to="/login"
          className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
        >
          Go to Login
          <ArrowRight size={16} />
        </Link>

      </div>
    );
  }

  // ==========================================
  // REGISTRATION FORM
  // ==========================================

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-5"
    >

      {/* ======================================
          APPLICANT DETAILS
      ====================================== */}

      <div>

        <div className="mb-4 flex items-center gap-2">
          <UserRound
            size={17}
            className="text-indigo-400"
          />

          <h3 className="text-sm font-semibold text-white">
            Applicant Details
          </h3>
        </div>

        <div className="space-y-4">

          {/* Full Name */}
          <div>

            <label
              htmlFor="name"
              className="mb-1.5 block text-xs font-medium text-slate-300"
            >
              Full Name
            </label>

            <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 transition focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20">

              <UserRound
                size={17}
                className="shrink-0 text-slate-400"
              />

              <input
                id="name"
                type="text"
                placeholder="Enter your full name"
                autoComplete="name"
                {...register("name", {
                  required: "Name is required",

                  minLength: {
                    value: 2,
                    message: "Name must contain at least 2 characters",
                  },

                  maxLength: {
                    value: 50,
                    message: "Name cannot exceed 50 characters",
                  },
                })}
                className="w-full bg-transparent py-3 text-sm text-white outline-none placeholder:text-slate-500"
              />

            </div>

            {errors.name && (
              <p className="mt-1.5 text-xs text-red-400">
                {errors.name.message}
              </p>
            )}

          </div>

          {/* Email */}
          <div>

            <label
              htmlFor="email"
              className="mb-1.5 block text-xs font-medium text-slate-300"
            >
              Email Address
            </label>

            <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 transition focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20">

              <Mail
                size={17}
                className="shrink-0 text-slate-400"
              />

              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                {...register("email", {
                  required: "Email address is required",

                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
                className="w-full bg-transparent py-3 text-sm text-white outline-none placeholder:text-slate-500"
              />

            </div>

            {errors.email && (
              <p className="mt-1.5 text-xs text-red-400">
                {errors.email.message}
              </p>
            )}

          </div>

          {/* Mobile */}
          <div>

            <label
              htmlFor="mobile"
              className="mb-1.5 block text-xs font-medium text-slate-300"
            >
              Mobile Number
            </label>

            <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 transition focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20">

              <Smartphone
                size={17}
                className="shrink-0 text-slate-400"
              />

              <span className="border-r border-slate-600 pr-3 text-sm text-slate-300">
                +91
              </span>

              <input
                id="mobile"
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                placeholder="10-digit mobile number"
                maxLength={10}
                {...mobileField}
                onChange={(event) => {
                  event.target.value = event.target.value
                    .replace(/\D/g, "")
                    .slice(0, 10);

                  mobileField.onChange(event);
                }}
                className="w-full bg-transparent py-3 text-sm text-white outline-none placeholder:text-slate-500"
              />

            </div>

            {errors.mobile && (
              <p className="mt-1.5 text-xs text-red-400">
                {errors.mobile.message}
              </p>
            )}

          </div>

        </div>
      </div>

      {/* ======================================
          ORGANIZATION DETAILS
      ====================================== */}

      <div className="border-t border-slate-800 pt-5">

        <div className="mb-4 flex items-center gap-2">

          <Building2
            size={17}
            className="text-indigo-400"
          />

          <h3 className="text-sm font-semibold text-white">
            Organization Details
          </h3>

        </div>

        <div className="space-y-4">

          {/* Organization Name */}
          <div>

            <label
              htmlFor="organizationName"
              className="mb-1.5 block text-xs font-medium text-slate-300"
            >
              Organization Name
            </label>

            <input
              id="organizationName"
              type="text"
              placeholder="Enter organization name"
              {...register("organizationName", {
                required: "Organization name is required",

                minLength: {
                  value: 2,
                  message: "Name must contain at least 2 characters",
                },

                maxLength: {
                  value: 150,
                  message: "Name cannot exceed 150 characters",
                },
              })}
              className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 py-3 text-sm text-white outline-none placeholder:text-slate-500 transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />

            {errors.organizationName && (
              <p className="mt-1.5 text-xs text-red-400">
                {errors.organizationName.message}
              </p>
            )}

          </div>

          {/* Organization Type */}
          <div>

            <label
              htmlFor="organizationType"
              className="mb-1.5 block text-xs font-medium text-slate-300"
            >
              Organization Type
            </label>

            <select
              id="organizationType"
              {...register("organizationType", {
                required: "Select your organization type",
              })}
              className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 py-3 text-sm text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value="" className="bg-slate-900">
                Select organization type
              </option>

              <option
                value="INDIVIDUAL"
                className="bg-slate-900"
              >
                Individual
              </option>

              <option
                value="COMPANY"
                className="bg-slate-900"
              >
                Company
              </option>

              <option
                value="INSTITUTE"
                className="bg-slate-900"
              >
                Institute / Educational Organization
              </option>

            </select>

            {errors.organizationType && (
              <p className="mt-1.5 text-xs text-red-400">
                {errors.organizationType.message}
              </p>
            )}

          </div>

          {/* Description */}
          <div>

            <label
              htmlFor="description"
              className="mb-1.5 flex items-center gap-2 text-xs font-medium text-slate-300"
            >
              <FileText size={14} />

              Organization Description

              <span className="font-normal text-slate-500">
                (Optional)
              </span>
            </label>

            <textarea
              id="description"
              rows={4}
              maxLength={1000}
              placeholder="Tell us about your organization..."
              {...register("description", {
                maxLength: {
                  value: 1000,
                  message: "Description cannot exceed 1000 characters",
                },
              })}
              className="w-full resize-y rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 py-3 text-sm text-white outline-none placeholder:text-slate-500 transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />

            {errors.description && (
              <p className="mt-1.5 text-xs text-red-400">
                {errors.description.message}
              </p>
            )}

          </div>

        </div>
      </div>

      {/* ======================================
          ADMIN LOGIN CREDENTIALS
      ====================================== */}

      <div className="border-t border-slate-800 pt-5">

        <div className="mb-4 flex items-center gap-2">

          <Lock
            size={17}
            className="text-indigo-400"
          />

          <h3 className="text-sm font-semibold text-white">
            Admin Login Credentials
          </h3>

        </div>

        <div className="space-y-4">

          {/* Password */}
          <div>

            <label
              htmlFor="password"
              className="mb-1.5 block text-xs font-medium text-slate-300"
            >
              Create Password
            </label>

            <input
              id="password"
              type="password"
              autoComplete="new-password"
              placeholder="Minimum 8 characters"
              {...register("password", {
                required: "Password is required",

                minLength: {
                  value: 8,
                  message: "Password must contain at least 8 characters",
                },
              })}
              className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 py-3 text-sm text-white outline-none placeholder:text-slate-500 transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />

            {errors.password && (
              <p className="mt-1.5 text-xs text-red-400">
                {errors.password.message}
              </p>
            )}

          </div>

          {/* Confirm Password */}
          <div>

            <label
              htmlFor="confirmPassword"
              className="mb-1.5 block text-xs font-medium text-slate-300"
            >
              Confirm Password
            </label>

            <input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              placeholder="Re-enter your password"
              {...register("confirmPassword", {
                required: "Please confirm your password",

                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className="w-full rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 py-3 text-sm text-white outline-none placeholder:text-slate-500 transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />

            {errors.confirmPassword && (
              <p className="mt-1.5 text-xs text-red-400">
                {errors.confirmPassword.message}
              </p>
            )}

          </div>

        </div>
      </div>

      {/* ======================================
          BACKEND ERROR
      ====================================== */}

      {error && (
        <div className="flex items-start gap-2 rounded-xl border border-red-500/20 bg-red-500/10 p-3.5">

          <AlertCircle
            size={17}
            className="mt-0.5 shrink-0 text-red-400"
          />

          <p className="text-sm leading-5 text-red-300">
            {error}
          </p>

        </div>
      )}

      {/* ======================================
          SUBMIT BUTTON
      ====================================== */}

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? (
          "Submitting Application..."
        ) : (
          <>
            Submit Organization Request

            <ArrowRight size={17} />
          </>
        )}
      </button>

      <p className="text-center text-xs leading-5 text-slate-500">
        Submitting this application does not immediately create an
        Organization Admin account. Account creation happens after approval.
      </p>

    </form>
  );
}

export default OrganizationRequestForm;