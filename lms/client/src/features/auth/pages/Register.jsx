
import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import RegisterForm from "../components/RegisterForm";

function Register() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 p-3 text-white sm:p-4 lg:p-6">
      <div className="my-auto grid w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl lg:grid-cols-2">

        {/* Left: Branding Section */}
        <section className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-800 p-6 lg:flex xl:p-8">
          <div className="relative flex items-center gap-3">
            <div className="rounded-xl bg-white/15 p-2">
              <GraduationCap size={26} />
            </div>
            <span className="text-xl font-bold tracking-tight">
              LearnHub
            </span>
          </div>

          <div className="relative my-auto py-6">
            <span className="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-medium">
              Start your journey
            </span>

            <h1 className="text-3xl font-bold leading-tight xl:text-4xl">
              Learn today.
              <br />
              Lead tomorrow.
            </h1>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-indigo-100">
              Join LearnHub to explore courses, connect with instructors,
              and build your future.
            </p>
          </div>

          <p className="relative text-xs text-indigo-100/80">
            Learn at your pace. Grow at your potential.
          </p>
        </section>

        {/* Right: Register Section */}
        <section className="flex items-center justify-center p-5 sm:p-8 lg:p-7 xl:p-9">
          <div className="w-full max-w-md">

            {/* Mobile Branding */}
            <div className="mb-5 flex items-center gap-3 lg:hidden">
              <div className="rounded-xl bg-indigo-500/15 p-2.5 text-indigo-400">
                <GraduationCap size={26} />
              </div>
              <span className="text-lg font-bold">LearnHub</span>
            </div>

            {/* Title — only here */}
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

            {/* Register Form Component */}
            <RegisterForm />

            {/* Footer Link */}
            <p className="mt-5 text-center text-xs text-slate-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-indigo-400 transition hover:text-indigo-300"
              >
                Login
              </Link>
            </p>

            <p className="mt-4 text-center text-[11px] text-slate-500">
              © 2026 LearnHub. All rights reserved.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Register;
