import { useState } from "react";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  UserRound,
  Mail,
  Smartphone,
  Lock,
  ArrowRight,
} from "lucide-react";

function Login() {
  const [identifier, setIdentifier] = useState("");

  // Check if user is typing a phone number or email
  const isPhone = /^[0-9+ ]*$/.test(identifier) && identifier.length > 0;

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 p-3 text-white sm:p-4 lg:p-6">
      {/* Main Container */}
      <div className="grid w-full max-w-4xl my-auto overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl lg:grid-cols-2">

        {/* Left: Branding Section */}
        <section className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-800 p-6 xl:p-8 lg:flex">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-fuchsia-400/20 blur-3xl" />

          {/* Logo */}
          <div className="relative flex items-center gap-3">
            <div className="rounded-xl bg-white/15 p-2">
              <GraduationCap size={26} />
            </div>

            <span className="text-xl font-bold tracking-tight">
              LearnHub
            </span>
          </div>

          {/* Branding Content */}
          <div className="relative my-auto py-6">
            <span className="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-medium">
              Start something great
            </span>

            <h1 className="text-3xl font-bold leading-tight xl:text-4xl">
              Your future
              <br />
              starts here.
            </h1>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-indigo-100">
              Join a community of learners, explore new skills,
              and turn your goals into achievements.
            </p>

            <div className="mt-6 space-y-4 text-sm text-indigo-50">
              <div className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
                  ✓
                </span>
                Learn at your own pace
              </div>

              <div className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
                  ✓
                </span>
                Access your enrolled courses
              </div>

              <div className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
                  ✓
                </span>
                Connect with instructors
              </div>
            </div>
          </div>

          {/* Footer */}
          <p className="relative text-xs text-indigo-100/80">
            Learn today. Grow every day.
          </p>
        </section>

        {/* Right: Register Form */}
        <section className="flex items-center justify-center p-5 sm:p-8 lg:p-7 xl:p-9">
          <div className="w-full max-w-md">

            {/* Mobile Branding */}
            <div className="mb-5 flex items-center gap-3 lg:hidden">
              <div className="rounded-xl bg-indigo-500/15 p-2.5 text-indigo-400">
                <GraduationCap size={26} />
              </div>

              <span className="text-lg font-bold">LearnHub</span>
            </div>

            {/* Title */}
            <div className="mb-5">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-indigo-400">
                Get started
              </p>

              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Create your account
              </h2>

              <p className="mt-1 text-xs leading-relaxed text-slate-400 sm:text-sm">
                Enter your details to join LearnHub.
              </p>
            </div>

            {/* Registration Form */}
            <form className="space-y-3.5" onSubmit={(e) => e.preventDefault()}>

              {/* Full Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-1.5 block text-xs font-medium text-slate-200"
                >
                  Full Name
                </label>

                <div className="flex items-center gap-2.5 rounded-xl border border-slate-700 bg-slate-800/70 px-3.5 transition focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20">
                  <UserRound
                    size={18}
                    className="shrink-0 text-slate-400"
                  />

                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Enter your full name"
                    className="w-full bg-transparent py-2.5 text-sm outline-none placeholder:text-slate-500"
                  />
                </div>
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
                    <Mail
                      size={18}
                      className="shrink-0 text-slate-400"
                    />
                  )}

                  <input
                    id="identifier"
                    name="identifier"
                    type={isPhone ? "tel" : "text"}
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    autoComplete="username"
                    placeholder="Email or mobile number"
                    className="w-full bg-transparent py-2.5 text-sm outline-none placeholder:text-slate-500"
                  />
                </div>
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
                  <Lock
                    size={18}
                    className="shrink-0 text-slate-400"
                  />

                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Create a strong password"
                    className="w-full bg-transparent py-2.5 text-sm outline-none placeholder:text-slate-500"
                  />
                </div>
              </div>

              {/* Register Button */}
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold transition hover:bg-indigo-500 active:scale-[0.99]"
              >
                Create Account
                <ArrowRight size={16} />
              </button>
            </form>

            {/* Google Signup Divider */}
            <div className="my-4 flex items-center gap-3">
              <div className="h-px flex-1 bg-slate-700" />

              <span className="text-[11px] uppercase tracking-wider text-slate-500">
                Or sign up with
              </span>

              <div className="h-px flex-1 bg-slate-700" />
            </div>

            {/* Google Signup Button */}
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-slate-700 bg-white px-4 py-2.5 text-sm font-medium text-slate-800 transition hover:bg-slate-100 active:scale-[0.99]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                className="h-4 w-4"
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
            </button>

            {/* Login Link */}
            <p className="mt-5 text-center text-xs text-slate-400">
              Already have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-indigo-400 transition hover:text-indigo-300"
              >
                Login
              </Link>
            </p>

            {/* Footer */}
            <p className="mt-4 text-center text-[11px] text-slate-500">
              © 2026 LearnHub. All rights reserved.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Login;