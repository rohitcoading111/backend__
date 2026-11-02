import { Link } from "react-router-dom";
import {
  GraduationCap,
  ArrowLeft,
  ShieldCheck,
  Building2,
} from "lucide-react";

import OrganizationRequestForm from "../components/OrganizationRequestForm.jsx";

function OrganizationRequest() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:px-6">

      <div className="mx-auto max-w-6xl">

        {/* Back */}
        <Link
          to="/login"
          className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to Login
        </Link>

        <div className="grid overflow-hidden rounded-[28px] border border-slate-800 bg-slate-900 shadow-2xl lg:grid-cols-[0.85fr_1.15fr]">

          {/* Branding */}
          <section className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-700 to-purple-900 p-9 lg:flex">

            <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-32 -left-28 h-80 w-80 rounded-full bg-fuchsia-400/20 blur-3xl" />

            <div className="relative flex items-center gap-3">
              <div className="rounded-xl bg-white/15 p-2.5">
                <GraduationCap size={27} />
              </div>

              <span className="text-xl font-bold tracking-tight">
                LearnHub
              </span>
            </div>

            <div className="relative my-auto py-12">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-medium">
                <Building2 size={14} />
                Organization Partnership
              </span>

              <h1 className="mt-6 text-4xl font-bold leading-tight">
                Bring your
                <br />
                organization
                <br />
                to LearnHub.
              </h1>

              <p className="mt-5 max-w-sm text-sm leading-7 text-indigo-100">
                Create a dedicated learning environment for your
                organization and manage your instructors, courses
                and learning experience.
              </p>

              <div className="mt-8 space-y-4 text-sm text-indigo-50">
                <div className="flex items-center gap-3">
                  <ShieldCheck size={18} />
                  Dedicated organization administration
                </div>

                <div className="flex items-center gap-3">
                  <ShieldCheck size={18} />
                  Manage your instructor team
                </div>

                <div className="flex items-center gap-3">
                  <ShieldCheck size={18} />
                  Centralized course management
                </div>
              </div>
            </div>

            <p className="relative text-xs text-indigo-100/70">
              LearnHub Organization Portal
            </p>
          </section>

          {/* Form */}
          <section className="p-5 sm:p-8 lg:p-10">

            {/* Mobile Brand */}
            <div className="mb-7 flex items-center gap-3 lg:hidden">
              <div className="rounded-xl bg-indigo-500/15 p-2.5 text-indigo-400">
                <GraduationCap size={25} />
              </div>

              <span className="text-lg font-bold">
                LearnHub
              </span>
            </div>

            <div className="mb-7">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-400">
                Organization Registration
              </p>

              <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                Register your organization
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Submit your application to become an
                Organization Admin on LearnHub.
              </p>
            </div>

            <OrganizationRequestForm />

            <div className="mt-7 border-t border-slate-800 pt-5 text-center">
              <p className="text-xs text-slate-400">
                Already have an approved account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-indigo-400 hover:text-indigo-300"
                >
                  Login here
                </Link>
              </p>
            </div>

          </section>
        </div>

        <p className="mt-6 text-center text-[11px] text-slate-600">
          © 2026 LearnHub. All rights reserved.
        </p>

      </div>
    </main>
  );
}

export default OrganizationRequest;