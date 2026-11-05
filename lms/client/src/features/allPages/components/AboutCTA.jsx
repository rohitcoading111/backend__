
import { Link } from "react-router-dom";

export default function AboutCTA() {
  return (
    <section className="px-5 pb-24">
      <div className="learnhub-about-cta-panel mx-auto max-w-6xl rounded-3xl border px-7 py-16 text-center sm:px-12">
        <p className="text-sm font-bold uppercase tracking-widest text-cyan-400">
          Start Your Journey
        </p>

        <h2 className="mt-5 text-3xl font-bold sm:text-5xl">
          Experience LearnHub Yourself
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-slate-400">
          Explore the learning platform, discover available courses
          and get started with your LearnHub account.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Link
            to="/register"
            className="rounded-xl bg-cyan-400 px-8 py-3.5 font-bold text-slate-950 hover:bg-cyan-300"
          >
            Create Account
          </Link>

          <Link
            to="/login"
            className="rounded-xl border border-white/15 px-8 py-3.5 font-semibold text-white hover:border-cyan-400/50"
          >
            Login
          </Link>
        </div>
      </div>
    </section>
  );
}
