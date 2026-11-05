
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

const values = [
  {
    number: "01",
    title: "Accessible Learning",
    description:
      "Make learning resources easier to access through an organized online learning platform.",
  },
  {
    number: "02",
    title: "Structured Education",
    description:
      "Organize courses into modules and lectures to create a clear learning journey.",
  },
  {
    number: "03",
    title: "Interactive Experience",
    description:
      "Support learning through live sessions and interaction between students and instructors.",
  },
  {
    number: "04",
    title: "Continuous Progress",
    description:
      "Help learners follow their course progress and keep track of completed lectures.",
  },
];

const roles = [
  {
    title: "Students",
    description:
      "Explore courses, enroll in learning programs, access lectures, attend live classes and track progress.",
    icon: "01",
  },
  {
    title: "Instructors",
    description:
      "Create and manage courses, organize modules and lectures, and conduct live learning sessions.",
    icon: "02",
  },
  {
    title: "Organizations",
    description:
      "Manage instructors and coordinate learning activities within an organization.",
    icon: "03",
  },
];

export default function AboutPage() {
  useEffect(() => {
    document.title = "About LearnHub | Online Learning Platform";

    const description =
      "Learn about LearnHub, an online learning platform connecting students, instructors and organizations through structured courses, lectures and live learning.";

    let meta = document.querySelector('meta[name="description"]');

    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }

    meta.content = description;

    let canonical = document.querySelector('link[rel="canonical"]');

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }

    canonical.href = "https://learnhubcloud.in/about";

    return () => {
      // Restore homepage metadata when navigating away.
      document.title =
        "LearnHub – Online Learning Platform & Online Courses";
    };
  }, []);

  return (
    <main className="learnhub-home learnhub-dark-page min-h-screen overflow-hidden text-white">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#080d18]/90 backdrop-blur-xl">
        <nav
          aria-label="Main navigation"
          className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8"
        >
          <Link to="/" className="text-2xl font-bold tracking-tight">
            Learn<span className="text-cyan-400">Hub</span>
          </Link>

          <div className="hidden items-center gap-7 text-sm text-slate-300 md:flex">
            <Link to="/" className="learnhub-about-link">
              Home
            </Link>
            <Link to="/about" className="learnhub-about-link is-active">
              About
            </Link>
            <Link to="/contact" className="learnhub-about-link">
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="hidden px-3 py-2 text-sm text-slate-300 transition hover:text-cyan-400 sm:block"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="learnhub-about-link learnhub-about-cta rounded-lg px-4 py-2.5 text-sm font-bold transition"
            >
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      {/* HERO */}
      <section className="learnhub-home-hero relative isolate mx-auto mt-5 max-w-7xl overflow-hidden rounded-[28px] border px-5 py-20 sm:mt-8 sm:py-28">
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
            About LearnHub
          </p>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
            Learning Should Be
            <span className="block bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
              Organized & Accessible
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
            LearnHub is an online learning platform designed to bring
            students, instructors and organizations together through
            structured courses, digital lectures and live learning
            experiences.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link
              to="/register"
              className="learnhub-about-action rounded-xl px-7 py-3.5 font-bold transition"
            >
              Start Learning
            </Link>

            <Link
              to="/"
              className="learnhub-about-action rounded-xl border px-7 py-3.5 font-semibold text-white transition"
            >
              Explore Homepage
            </Link>
          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="border-y border-white/10 bg-white/[0.02] px-5 py-24">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 md:items-center">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
              Our Platform
            </p>

            <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
              Bringing Learning and Technology Together
            </h2>

            <p className="mt-6 leading-8 text-slate-400">
              Learning involves more than watching videos. Students need
              organized course content, a way to follow their progress
              and opportunities to interact with instructors.
            </p>

            <p className="mt-4 leading-8 text-slate-400">
              LearnHub brings these learning activities together in one
              platform. Students can access course materials and live
              sessions, while instructors can organize and manage their
              educational content.
            </p>

            <p className="mt-4 leading-8 text-slate-400">
              The platform also supports organizations in managing
              instructors and coordinating their learning environment.
            </p>
          </div>

          <div className="relative rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-400/10 to-blue-500/5 p-8 sm:p-12">
            <div className="absolute right-8 top-8 h-24 w-24 rounded-full bg-cyan-400/10 blur-2xl" />

            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-300">
              The LearnHub Experience
            </p>

            <h3 className="mt-6 text-3xl font-bold leading-snug">
              One platform.
              <br />
              Multiple learning roles.
              <br />
              A connected experience.
            </h3>

            <div className="mt-9 h-1 w-20 rounded-full bg-cyan-400" />

            <p className="mt-6 leading-7 text-slate-400">
              From course discovery to lecture completion, LearnHub
              helps organize the different parts of an online
              learning journey.
            </p>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="px-5 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
            Our Mission
          </p>

          <h2 className="text-3xl font-bold leading-tight sm:text-5xl">
            Making Online Learning
            <span className="text-cyan-400"> More Organized</span>
          </h2>

          <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-slate-400">
            Our mission is to provide a connected digital learning
            environment where students can learn, instructors can teach
            and organizations can manage educational activities through
            a single platform.
          </p>
        </div>
      </section>

      {/* VALUES */}
      <section className="border-y border-white/10 bg-white/[0.02] px-5 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
              What We Focus On
            </p>

            <h2 className="text-3xl font-bold sm:text-4xl">
              What makes the learning experience organized?
            </h2>

            <p className="mt-4 leading-7 text-slate-400">
              The principles behind the LearnHub learning experience.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <article
                key={value.number}
                className="rounded-2xl border border-white/10 bg-[#0b1220] p-7 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40"
              >
                <span className="text-sm font-bold text-cyan-400">
                  {value.number}
                </span>

                <h3 className="mt-7 text-xl font-bold">
                  {value.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-slate-400">
                  {value.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section className="px-5 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
              Who We Serve
            </p>

            <h2 className="text-3xl font-bold sm:text-4xl">
              Designed for every learning role
            </h2>

            <p className="mt-4 leading-7 text-slate-400">
              Different roles have different responsibilities.
              LearnHub provides dedicated dashboards for each.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {roles.map((role) => (
              <article
                key={role.title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition hover:border-cyan-400/40"
              >
                <span className="text-4xl font-extrabold text-cyan-400/50">
                  {role.icon}
                </span>

                <h3 className="mt-6 text-2xl font-bold">
                  {role.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-400">
                  {role.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 pb-24">
        <div className="mx-auto max-w-6xl rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-400/10 to-blue-500/10 px-7 py-16 text-center sm:px-12">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Be Part of the Learning Journey
          </h2>

          <p className="mx-auto mt-5 max-w-xl leading-7 text-slate-400">
            Explore LearnHub and discover a more organized way to
            learn and teach online.
          </p>

          <Link
            to="/register"
            className="mt-8 inline-flex rounded-xl bg-cyan-400 px-8 py-3.5 font-bold text-slate-950 transition hover:bg-cyan-300"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 px-5 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 sm:flex-row">
          <Link to="/" className="text-xl font-bold">
            Learn<span className="text-cyan-400">Hub</span>
          </Link>

          <p className="text-center text-sm text-slate-500">
            © {new Date().getFullYear()} LearnHub. All rights reserved.
          </p>

          <div className="flex gap-5 text-sm text-slate-400">
            <Link to="/" className="hover:text-cyan-400">
              Home
            </Link>
            <Link to="/contact" className="hover:text-cyan-400">
              Contact
            </Link>
            <Link to="/login" className="hover:text-cyan-400">
              Login
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
