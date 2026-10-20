import { Link } from "react-router-dom";
import { GraduationCap, Mail, Lock, ArrowRight } from "lucide-react";

function Login() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4 sm:p-8">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl lg:grid-cols-2">

        {/* Left: Branding section */}
        <section className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-800 p-10 lg:flex">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-fuchsia-400/20 blur-3xl" />

          <div className="relative flex items-center gap-3">
            <div className="rounded-xl bg-white/15 p-2.5">
              <GraduationCap size={28} />
            </div>
            <span className="text-2xl font-bold tracking-tight">
              LearnHub
            </span>
          </div>

          <div className="relative my-12">
            <span className="mb-5 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm">
              Your learning journey starts here
            </span>

            <h1 className="text-5xl font-bold leading-tight">
              Learn today.
              <br />
              Lead tomorrow.
            </h1>

            <p className="mt-6 max-w-sm leading-7 text-indigo-100">
              Access your courses, connect with instructors, and
              take the next step toward your goals.
            </p>
          </div>

          <p className="relative text-sm text-indigo-100/80">
            Learn at your pace. Grow at your potential.
          </p>
        </section>

        {/* Right: Login form UI */}
        <section className="flex items-center justify-center px-6 py-12 sm:px-10 lg:px-12">
          <div className="w-full max-w-md">

            <div className="mb-8 lg:hidden">
              <div className="mb-6 inline-flex rounded-xl bg-indigo-500/15 p-3 text-indigo-400">
                <GraduationCap size={30} />
              </div>
              <p className="text-xl font-bold">LearnHub</p>
            </div>

            <div className="mb-8">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-400">
                Welcome back
              </p>

              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Login to your account
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                Enter your details to continue learning.
              </p>
            </div>

            <form className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Email address
                </label>

                <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-800/70 px-4 transition focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20">
                  <Mail size={19} className="shrink-0 text-slate-400" />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="w-full bg-transparent py-3.5 text-sm text-white outline-none placeholder:text-slate-500"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Password
                </label>

                <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-800/70 px-4 transition focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20">
                  <Lock size={19} className="shrink-0 text-slate-400" />

                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    className="w-full bg-transparent py-3.5 text-sm text-white outline-none placeholder:text-slate-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 text-sm">
                <label className="flex items-center gap-2 text-slate-400">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    className="h-4 w-4 accent-indigo-500"
                  />
                  Remember me
                </label>

                <Link
                  to="/forgot-password"
                  className="font-medium text-indigo-400 transition hover:text-indigo-300"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 font-semibold transition hover:bg-indigo-500 active:scale-[0.99]"
              >
                Login
                <ArrowRight size={18} />
              </button>
            </form>
             
{/* Divider */}
<div className="my-6 flex items-center gap-4">
  <div className="h-px flex-1 bg-slate-700" />
  <span className="text-xs uppercase tracking-wider text-slate-500">
    Or continue with
  </span>
  <div className="h-px flex-1 bg-slate-700" />
</div>

{/* Google Auth Button */}
<button
  type="button"
  className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-700 bg-white px-5 py-3.5 font-medium text-slate-800 transition hover:bg-slate-100 active:scale-[0.99]"
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
</button>


            <p className="mt-8 text-center text-sm text-slate-400">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-indigo-400 transition hover:text-indigo-300"
              >
                Create account
              </Link>
            </p>

            <p className="mt-10 text-center text-xs text-slate-500">
              © 2026 LearnHub. All rights reserved.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Login;
