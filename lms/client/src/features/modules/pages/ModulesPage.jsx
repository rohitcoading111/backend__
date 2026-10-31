
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarDays,
  Clock3,
  GraduationCap,
  Layers3,
  Radio,
  Sparkles,
  Video,
  Loader2,
  RefreshCw,
} from "lucide-react";

import { getCourseModules } from "../services/moduleService.js";

function ModulesPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryKey, setRetryKey] = useState(0);

  // Fetch modules
  useEffect(() => {
    let cancelled = false;

    const fetchModules = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getCourseModules(courseId);

        if (!response?.success) {
          throw new Error(
            response?.message || "Failed to load modules."
          );
        }

        const fetchedModules = response?.data?.modules;

        if (!Array.isArray(fetchedModules)) {
          throw new Error("Invalid modules response.");
        }

        if (!cancelled) {
          setModules(
            [...fetchedModules].sort(
              (a, b) => (a.order ?? 0) - (b.order ?? 0)
            )
          );
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err?.response?.data?.message ||
              err?.message ||
              "Unable to load modules."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    if (courseId) {
      fetchModules();
    } else {
      setError("Course ID is missing.");
      setLoading(false);
    }

    return () => {
      cancelled = true;
    };
  }, [courseId, retryKey]);

  const handleLiveClasses = () => {
    navigate("/live-classes");
  };

  const handleExploreModule = (moduleId) => {
    navigate(`/courses/${courseId}/modules/${moduleId}/lectures`);
  };

  const totalModules = modules.length;

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#050505] text-white">

      {/* BACKGROUND LIGHTING */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">

        <div className="absolute -left-64 top-[10%] h-[600px] w-[600px] rounded-full bg-white/[0.055] blur-[150px]" />

        <div className="absolute -right-64 top-[35%] h-[650px] w-[650px] rounded-full bg-neutral-400/[0.06] blur-[160px]" />

        <div className="absolute left-1/2 top-[-350px] h-[550px] w-[900px] -translate-x-1/2 rounded-full bg-white/[0.035] blur-[150px]" />

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#050505_100%)]" />
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-30 border-b border-white/[0.08] bg-black/75 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-10">

         
          <button
  type="button"
  onClick={() => navigate("/dashboard")}
  className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-neutral-300 transition hover:border-white/30 hover:bg-white hover:text-black"
>
            <ArrowLeft
              size={16}
              className="transition-transform group-hover:-translate-x-1"
            />
            Back
          </button>

          <div className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black">
              <GraduationCap size={21} />
            </span>

            <div>
              <h1 className="text-sm font-bold tracking-tight">
                LearnHub
              </h1>
              <p className="text-[9px] uppercase tracking-[0.18em] text-neutral-500">
                Learn without limits
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-neutral-300 transition hover:bg-white hover:text-black"
          >
            Dashboard
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12 lg:px-10">

        {/* HERO SECTION */}
        <section className="relative isolate overflow-hidden rounded-[28px] border border-white/10 bg-[#090909] p-6 text-white shadow-[0_20px_70px_rgba(0,0,0,0.5)] sm:p-9 lg:p-11">

          {/* Hero lighting */}
          <div className="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full bg-white/[0.07] blur-[100px]" />

          <div className="pointer-events-none absolute -bottom-40 right-1/3 h-72 w-72 rounded-full bg-neutral-400/[0.06] blur-[100px]" />

          <div className="pointer-events-none absolute right-0 top-0 h-full w-px bg-linear-to-b from-transparent via-white/20 to-transparent" />

          <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">

            <div className="max-w-2xl">

              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 text-[10px] font-semibold tracking-[0.18em] text-neutral-300">
                <Sparkles size={14} />
                YOUR LEARNING SPACE
              </div>

              <h1 className="text-3xl font-semibold tracking-[-0.05em] sm:text-4xl lg:text-5xl">
                Learn something
                <span className="block text-neutral-500">
                  amazing today.
                </span>
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-7 text-neutral-400 sm:text-base">
                Explore your course modules, build your knowledge
                step by step, and keep moving towards your goals.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">

                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
                  <Layers3 size={19} className="text-white" />

                  <div>
                    <p className="text-lg font-semibold">
                      {loading ? "—" : totalModules}
                    </p>
                    <p className="text-xs text-neutral-500">
                      Total modules
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
                  <BookOpen size={19} className="text-neutral-300" />

                  <div>
                    <p className="text-sm font-semibold">
                      Self-paced
                    </p>
                    <p className="text-xs text-neutral-500">
                      Learn your way
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* LIVE CLASSES CARD */}
            <div className="group relative isolate w-full overflow-hidden rounded-[24px] border border-white/15 bg-[#080808] p-5 shadow-[0_0_30px_rgba(255,255,255,0.025)] transition duration-500 hover:border-white/30 hover:shadow-[0_0_40px_rgba(255,255,255,0.09)] sm:p-6 lg:w-72">

              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/[0.07] blur-[65px] transition group-hover:bg-white/[0.12]" />

              <div className="relative z-10 flex items-center justify-between">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-black">
                  <Video size={22} />
                </div>

                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[10px] font-medium text-neutral-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  Live learning
                </span>

              </div>

              <h2 className="relative z-10 mt-5 text-lg font-semibold">
                Live Classes
              </h2>

              <p className="relative z-10 mt-2 text-sm leading-6 text-neutral-400">
                Join interactive sessions and learn with your
                instructors.
              </p>

              <button
                type="button"
                onClick={handleLiveClasses}
                className="relative z-10 mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-neutral-200 active:scale-[0.98]"
              >
                Explore Live Classes
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </section>

        {/* MODULES SECTION */}
        <section className="mt-12 sm:mt-16">

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-400">
                <BookOpen size={15} />
                Course curriculum
              </div>

              <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                Your learning modules
                <span className="text-neutral-600">.</span>
              </h2>

              <p className="mt-2 text-sm leading-6 text-neutral-500">
                Choose a module to continue your learning journey.
              </p>
            </div>

            {!loading && !error && (
              <div className="inline-flex w-fit items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-neutral-300">
                <Layers3 size={16} />
                {totalModules} {totalModules === 1 ? "module" : "modules"}
              </div>
            )}
          </div>

          {/* LOADING STATE */}
          {loading && (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="rounded-[24px] border border-white/10 bg-[#080808] p-6"
                >
                  <div className="h-12 w-12 animate-pulse rounded-xl bg-neutral-800" />

                  <div className="mt-6 h-4 w-2/3 animate-pulse rounded bg-neutral-800" />

                  <div className="mt-3 h-3 w-full animate-pulse rounded bg-neutral-900" />

                  <div className="mt-2 h-3 w-4/5 animate-pulse rounded bg-neutral-900" />

                  <div className="mt-7 h-11 animate-pulse rounded-full bg-neutral-900" />
                </div>
              ))}
            </div>
          )}

          {/* ERROR STATE */}
          {!loading && error && (
            <div className="mt-8 rounded-[24px] border border-white/10 bg-[#080808] p-8 text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.06] text-neutral-300">
                <Radio size={25} />
              </div>

              <h3 className="mt-5 text-lg font-semibold">
                Could not load modules
              </h3>

              <p className="mt-2 text-sm text-neutral-500">
                {error}
              </p>

              <button
                type="button"
                onClick={() => setRetryKey((previous) => previous + 1)}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-neutral-200"
              >
                <RefreshCw size={15} />
                Try again
              </button>
            </div>
          )}

          {/* EMPTY STATE */}
          {!loading && !error && totalModules === 0 && (
            <div className="mt-8 rounded-[24px] border border-dashed border-white/15 bg-[#080808] px-6 py-16 text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/[0.06] text-neutral-300">
                <BookOpen size={27} />
              </div>

              <h3 className="mt-5 text-lg font-semibold">
                Your curriculum is on its way
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-neutral-500">
                No modules have been added to this course yet.
                Check back when your instructor publishes them.
              </p>
            </div>
          )}

          {/* MODULE CARDS */}
          {!loading && !error && totalModules > 0 && (
            <div className="mt-8 grid gap-7 sm:grid-cols-2 xl:grid-cols-3">

              {modules.map((module, index) => (
                <article
                  key={module._id}
                  className="group relative isolate flex flex-col overflow-hidden rounded-[26px] border border-white/[0.14] bg-[#080808] p-6 shadow-[0_0_25px_rgba(255,255,255,0.025),0_20px_50px_rgba(0,0,0,0.45)] transition-all duration-500 hover:-translate-y-1 hover:border-white/30 hover:shadow-[0_0_40px_rgba(255,255,255,0.08),0_25px_60px_rgba(0,0,0,0.65)] sm:p-7"
                >

                  {/* FOUR CORNER LIGHTING */}
                  <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[26px]">

                    {/* Top left */}
                    <div className="absolute -left-12 -top-12 h-40 w-40 rounded-full bg-white/[0.09] opacity-30 blur-[65px] transition duration-700 group-hover:opacity-100" />

                    {/* Top right */}
                    <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-neutral-300/[0.09] opacity-30 blur-[65px] transition duration-700 group-hover:opacity-100" />

                    {/* Bottom left */}
                    <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-neutral-400/[0.08] opacity-20 blur-[65px] transition duration-700 group-hover:opacity-90" />

                    {/* Bottom right */}
                    <div className="absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-white/[0.08] opacity-20 blur-[65px] transition duration-700 group-hover:opacity-90" />

                  </div>

                  {/* TOP CARD CONTENT */}
                  <div className="relative z-10 flex items-start justify-between gap-3">

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-white transition duration-300 group-hover:border-white group-hover:bg-white group-hover:text-black">
                      <BookOpen size={22} />
                    </div>

                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-semibold tracking-wider text-neutral-400">
                      MODULE {String(module.order ?? index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* MODULE DETAILS */}
                  <div className="relative z-10 mt-6 flex-1">

                    <h3 className="text-xl font-semibold tracking-tight text-white">
                      {module.title || "Untitled module"}
                    </h3>

                    <p className="mt-3 min-h-[48px] text-sm leading-6 text-neutral-400">
                      {module.description ||
                        "Explore this module and strengthen your understanding of the subject."}
                    </p>

                  </div>

                  {/* META INFORMATION */}
                  <div className="relative z-10 mt-6 flex flex-wrap items-center gap-4 border-t border-white/10 pt-5 text-xs text-neutral-500">

                    <span className="inline-flex items-center gap-2">
                      <Layers3 size={14} />
                      Learning module
                    </span>

                    <span className="inline-flex items-center gap-2">
                      <Clock3 size={14} />
                      Self-paced
                    </span>

                  </div>

                  {/* EXPLORE BUTTON */}
                  <button
                    type="button"
                    onClick={() => handleExploreModule(module._id)}
                    className="relative z-10 mt-6 flex w-full items-center justify-between rounded-full border border-white/20 bg-white/[0.03] px-5 py-3.5 text-sm font-semibold text-white transition duration-300 hover:border-white hover:bg-white hover:text-black"
                  >
                    Explore module

                    <ArrowRight
                      size={17}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </button>

                </article>
              ))}

            </div>
          )}
        </section>

        {/* BOTTOM LEARNING BANNER */}
        <section className="group relative isolate mt-12 overflow-hidden rounded-[24px] border border-white/10 bg-[#080808] p-5 transition duration-500 hover:border-white/20 sm:p-7">

          <div className="pointer-events-none absolute -right-20 -top-24 -z-10 h-64 w-64 rounded-full bg-white/[0.06] blur-[90px] transition group-hover:bg-white/[0.10]" />

          <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-start gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-white">
                <CalendarDays size={20} />
              </div>

              <div>
                <h3 className="font-semibold text-white">
                  Consistency is your superpower
                </h3>

                <p className="mt-1 text-sm leading-6 text-neutral-500">
                  Keep learning a little every day to make steady progress.
                </p>
              </div>

            </div>

            <div className="inline-flex items-center gap-2 text-sm font-medium text-neutral-300">
              <Sparkles size={16} />
              Keep growing
            </div>

          </div>
        </section>

        {/* FOOTER */}
        <footer className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/10 py-7 text-xs text-neutral-600 sm:flex-row">
          <p>
            © {new Date().getFullYear()} LearnHub. All rights reserved.
          </p>

          <p className="tracking-[0.18em]">
            LEARN. CONNECT. GROW.
          </p>
        </footer>

      </div>
    </main>
  );
}

export default ModulesPage;
