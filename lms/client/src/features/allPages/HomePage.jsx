
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

const features = [
  {
    number: "01",
    title: "Expert-Led Courses",
    description:
      "Explore structured courses designed to help you develop practical skills and learn at your own pace.",
  },
  {
    number: "02",
    title: "Live Learning",
    description:
      "Join live learning sessions and interact with instructors through an engaging learning experience.",
  },
  {
    number: "03",
    title: "Track Your Progress",
    description:
      "Keep track of completed lectures and monitor your learning progress from your dashboard.",
  },
  {
    number: "04",
    title: "One Learning Platform",
    description:
      "Access courses, lectures, live sessions and learning tools from one organized platform.",
  },
];

const audiences = [
  {
    title: "For Students",
    description:
      "Discover courses, access lectures, join live classes and track your learning journey.",
    points: ["Explore available courses", "Attend live classes", "Track course progress"],
  },
  {
    title: "For Instructors",
    description:
      "Manage your courses, organize learning content and conduct live learning sessions.",
    points: ["Create and manage courses", "Organize modules and lectures", "Conduct live sessions"],
  },
  {
    title: "For Organizations",
    description:
      "Manage instructors and organize learning activities within your organization.",
    points: ["Manage instructors", "Organize learning activities", "Monitor your organization"],
  },
];

const faqs = [
  {
    question: "What is LearnHub?",
    answer:
      "LearnHub is an online learning platform where students can explore courses, access lectures, join live sessions and track their learning progress.",
  },
  {
    question: "How can I join a course?",
    answer:
      "Create a student account, sign in and explore the courses available on the platform. Course details and pricing are displayed before enrollment.",
  },
  {
    question: "Can instructors create courses?",
    answer:
      "Yes. Authorized instructors can create and manage courses, modules and lectures through their instructor dashboard.",
  },
  {
    question: "Does LearnHub support live classes?",
    answer:
      "Yes. LearnHub supports live learning sessions that students can join through the platform.",
  },
  {
    question: "Can I track my learning progress?",
    answer:
      "Yes. Students can track completed lectures and their course progress through the learning dashboard.",
  },
];

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mx-auto mb-14 max-w-2xl text-center">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
        {eyebrow}
      </p>

      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>

      <p className="mt-4 text-base leading-7 text-slate-400">
        {description}
      </p>
    </div>
  );
}

export default function HomePage() {
  useEffect(() => {
    document.title =
      "LearnHub – Online Learning Platform & Online Courses";

    const setMeta = (name, content, attribute = "name") => {
      let element = document.querySelector(
        `meta[${attribute}="${name}"]`
      );

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }

      element.setAttribute("content", content);
    };

    setMeta(
      "description",
      "Explore online courses on LearnHub. Learn new skills, access structured lectures, attend live classes and track your learning progress."
    );

    setMeta("og:title", "LearnHub – Online Learning Platform", "property");
    setMeta(
      "og:description",
      "Discover online courses, learn from instructors, attend live classes and track your progress with LearnHub.",
      "property"
    );
    setMeta("og:type", "website", "property");
    setMeta("og:url", "https://learnhubcloud.in/", "property");

    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", "LearnHub – Online Learning Platform");
    setMeta(
      "twitter:description",
      "Explore courses and build practical skills with LearnHub."
    );

    let canonical = document.querySelector('link[rel="canonical"]');

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }

    canonical.href = "https://learnhubcloud.in/";
  }, []);

  return (
    <main className="learnhub-home min-h-screen overflow-hidden text-white">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#080d18]/90 backdrop-blur-xl">
        <nav
          aria-label="Main navigation"
          className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8"
        >
          <Link to="/" className="text-2xl font-bold tracking-tight">
            Learn<span className="text-cyan-400">Hub</span>
          </Link>

          <Link to="/about" className="learnhub-about-link">
            About
          </Link>

          <div className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <a href="#features" className="transition hover:text-cyan-400">
              Features
            </a>
            <a href="#courses" className="transition hover:text-cyan-400">
              Learning
            </a>
            <a href="#how-it-works" className="transition hover:text-cyan-400">
              How It Works
            </a>
            <a href="#faq" className="transition hover:text-cyan-400">
              FAQs
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="hidden rounded-lg px-4 py-2 text-sm font-medium text-slate-200 transition hover:text-cyan-400 sm:block"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="rounded-lg bg-cyan-400 px-4 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
            >
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      {/* HERO */}
      <section className="learnhub-home-hero relative isolate mx-auto mt-5 max-w-7xl overflow-hidden rounded-[28px] border px-5 py-24 sm:mt-8 sm:py-32">
        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-sm text-cyan-300">
            <span className="h-2 w-2 rounded-full bg-cyan-400" />
            A smarter way to learn online
          </div>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            Learn New Skills.
            <br />
            <span className="bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
              Build Your Future.
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
            Discover online courses, learn through structured lectures,
            attend live classes and track your progress — all in one
            learning platform.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/register"
              className="rounded-xl bg-cyan-400 px-7 py-3.5 font-bold text-slate-950 transition hover:-translate-y-1 hover:bg-cyan-300"
            >
              Start Learning
            </Link>

            <Link
              to="/login"
              className="rounded-xl border border-white/15 bg-white/5 px-7 py-3.5 font-semibold text-white transition hover:border-cyan-400/50 hover:bg-white/10"
            >
              Sign In
            </Link>
          </div>

          <p className="mt-5 text-sm text-slate-500">
            Learn at your pace. Track your progress. Keep growing.
          </p>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section id="courses" className="border-y border-white/10 bg-white/[0.02] px-5 py-20">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 md:items-center">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
              About the platform
            </p>

            <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
              Everything you need for a better online learning experience
            </h2>

            <p className="mt-6 leading-8 text-slate-400">
              LearnHub brings students and instructors together through
              an organized online learning environment. Explore courses,
              access learning materials, participate in live sessions
              and keep your learning journey organized.
            </p>

            <p className="mt-4 leading-8 text-slate-400">
              Whether you are starting to learn something new or sharing
              your knowledge as an instructor, LearnHub provides tools
              to support your learning experience.
            </p>
          </div>

          <div className="rounded-3xl border border-cyan-400/15 bg-gradient-to-br from-cyan-400/10 to-blue-500/5 p-8 sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-300">
              LearnHub Learning Experience
            </p>

            <div className="mt-8 space-y-5">
              {[
                "Structured online courses",
                "Organized modules and lectures",
                "Interactive live learning sessions",
                "Learning progress tracking",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cyan-400/15 text-cyan-300">
                    ✓
                  </span>
                  <span className="text-slate-200">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="px-5 py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Platform features"
            title="Learn more with the right tools"
            description="An online learning platform designed to organize courses, support live learning and make progress easier to follow."
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <article
                key={feature.number}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-cyan-400/[0.04]"
              >
                <span className="text-sm font-bold text-cyan-400">
                  {feature.number}
                </span>

                <h3 className="mt-7 text-xl font-bold">
                  {feature.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-slate-400">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="border-y border-white/10 bg-white/[0.02] px-5 py-24"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Getting started"
            title="Your learning journey in three steps"
            description="Get started with LearnHub and organize your learning experience."
          />

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Create an Account",
                description:
                  "Register as a student and access your learning dashboard.",
              },
              {
                step: "02",
                title: "Explore Courses",
                description:
                  "Discover available courses and review their details before enrolling.",
              },
              {
                step: "03",
                title: "Learn & Track",
                description:
                  "Access lectures, join live sessions and monitor your progress.",
              },
            ].map((item) => (
              <article
                key={item.step}
                className="rounded-2xl border border-white/10 bg-[#0b1220] p-8"
              >
                <span className="text-4xl font-extrabold text-cyan-400/50">
                  {item.step}
                </span>

                <h3 className="mt-5 text-xl font-bold">{item.title}</h3>

                <p className="mt-3 leading-7 text-slate-400">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WHO IS IT FOR */}
      <section className="px-5 py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Who can use LearnHub?"
            title="One platform, different learning roles"
            description="LearnHub provides dedicated experiences for learners, instructors and organizations."
          />

          <div className="grid gap-6 md:grid-cols-3">
            {audiences.map((audience) => (
              <article
                key={audience.title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-8"
              >
                <h3 className="text-2xl font-bold">{audience.title}</h3>

                <p className="mt-4 min-h-20 leading-7 text-slate-400">
                  {audience.description}
                </p>

                <ul className="mt-6 space-y-3">
                  {audience.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-3 text-sm text-slate-300"
                    >
                      <span className="text-cyan-400">✓</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="border-y border-white/10 bg-white/[0.02] px-5 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
            Course pricing
          </p>

          <h2 className="text-3xl font-bold sm:text-4xl">
            Find a course that fits your learning goals
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-400">
            Explore available courses on LearnHub. Each course displays
            its pricing and details so you can review the information
            before enrolling.
          </p>

          <Link
            to="/register"
            className="mt-8 inline-flex rounded-xl bg-cyan-400 px-7 py-3.5 font-bold text-slate-950 transition hover:bg-cyan-300"
          >
            Explore LearnHub
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="px-5 py-24">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            eyebrow="Frequently asked questions"
            title="LearnHub FAQs"
            description="Find answers to common questions about our online learning platform."
          />

          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-xl border border-white/10 bg-white/[0.03] p-6"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-white">
                  {faq.question}
                  <span className="text-xl text-cyan-400 transition group-open:rotate-45">
                    +
                  </span>
                </summary>

                <p className="mt-4 leading-7 text-slate-400">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 pb-24">
        <div className="mx-auto max-w-6xl rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-400/10 to-blue-500/10 px-7 py-16 text-center sm:px-12">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Ready to start learning?
          </h2>

          <p className="mx-auto mt-5 max-w-xl leading-7 text-slate-400">
            Create your LearnHub account and take the next step in
            your learning journey.
          </p>

          <Link
            to="/register"
            className="mt-8 inline-flex rounded-xl bg-cyan-400 px-8 py-3.5 font-bold text-slate-950 transition hover:bg-cyan-300"
          >
            Create Your Account
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
            <Link to="/login" className="transition hover:text-cyan-400">
              Login
            </Link>
            <Link to="/register" className="transition hover:text-cyan-400">
              Register
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
