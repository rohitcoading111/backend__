import { useState } from "react";
import {
  UserRound,
  Mail,
  Smartphone,
  Lock,
  ArrowRight,
} from "lucide-react";
import useRegisterForm from "../hooks/useRegisterForm";

function RegisterForm() {
  const [identifier, setIdentifier] = useState("");

  const isPhone =
    /^[0-9+ ]*$/.test(identifier) && identifier.length > 0;

  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
  } = useRegisterForm();

  return (
    <form
      className="space-y-3.5"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      {/* Full Name */}
      <div>
        <label
          htmlFor="name"
          className="mb-1.5 block text-xs font-medium text-slate-200"
        >
          Full Name
        </label>

        <div className="flex items-center gap-2.5 rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 transition focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20">
          <UserRound size={18} className="shrink-0 text-slate-400" />

          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Enter your full name"
            {...register("name", {
              required: "Full name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
            })}
            className="w-full bg-transparent py-2.5 text-sm outline-none placeholder:text-slate-500"
          />
        </div>

        {errors.name && (
          <p className="mt-1 text-xs text-red-400">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email or Mobile Number */}
      <div>
        <label
          htmlFor="identifier"
          className="mb-1.5 block text-xs font-medium text-slate-200"
        >
          Email or Mobile Number
        </label>

        <div className="flex items-center gap-2.5 rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 transition focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20">
          {isPhone ? (
            <Smartphone
              size={18}
              className="shrink-0 text-indigo-400"
            />
          ) : (
            <Mail size={18} className="shrink-0 text-slate-400" />
          )}

          <input
            id="identifier"
            type="text"
            autoComplete="username"
            placeholder="Email or mobile number"
            {...register("identifier", {
              required: "Email or mobile number is required",
              onChange: (event) => {
                setIdentifier(event.target.value);
              },
              validate: (value) => {
                const normalizedValue = value.trim();

                const email =
                  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedValue);

                const phone =
                  /^\+?[0-9]{10,15}$/.test(
                    normalizedValue.replace(/\s/g, "")
                  );

                return (
                  email ||
                  phone ||
                  "Enter a valid email or mobile number"
                );
              },
            })}
            className="w-full bg-transparent py-2.5 text-sm outline-none placeholder:text-slate-500"
          />
        </div>

        {errors.identifier && (
          <p className="mt-1 text-xs text-red-400">
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

        <div className="flex items-center gap-2.5 rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 transition focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20">
          <Lock size={18} className="shrink-0 text-slate-400" />

          <input
            id="password"
            type="password"
            autoComplete="new-password"
            placeholder="Create a strong password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            className="w-full bg-transparent py-2.5 text-sm outline-none placeholder:text-slate-500"
          />
        </div>

        {errors.password && (
          <p className="mt-1 text-xs text-red-400">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Register Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold transition hover:bg-indigo-500 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Creating Account..." : "Create Account"}

        {!isSubmitting && <ArrowRight size={16} />}
      </button>
    </form>
  );
}

export default RegisterForm;
