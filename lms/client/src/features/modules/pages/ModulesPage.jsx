
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
} from "lucide-react";
import { getCourseModules } from "../services/moduleService.js";

function ModulesPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
  }, [courseId]);

 const handleLiveClasses = () => {
  navigate("/live-classes");
};

  const totalModules = modules.length;

  return (
    <main className="min-h-screen bg-[#f6f7fb] text-slate-900">
      {/* Top navigation */}
      <header className="border-b border-slate-200/80 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-10">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <div className="flex items-center gap-2 text-sm font-semibold">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
              <GraduationCap size={19} />
            </span>
            <span>LearnHub</span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
        {/* Hero section */}
        <section className="relative overflow-hidden rounded-3xl bg-slate-950 p-6 text-white sm:p-9 lg:p-11">
          <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 right-1/3 h-64 w-64 rounded-full bg-violet-500/15 blur-3xl" />

          <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-2xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-3 py-1.5 text-xs font-medium text-indigo-200">
                <Sparkles size={14} />
                YOUR LEARNING SPACE
              </div>

              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                Learn something
                <span className="block text-indigo-300">
                  amazing today.
                </span>
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                Explore your course modules, build your knowledge
                step by step, and keep moving towards your goals.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.07] px-4 py-3">
                  <Layers3 size={17} className="text-indigo-300" />
                  <div>
                    <p className="text-lg font-semibold">
                      {loading ? "—" : totalModules}
                    </p>
                    <p className="text-xs text-slate-400">
                      Total modules
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.07] px-4 py-3">
                  <BookOpen size={17} className="text-violet-300" />
                  <div>
                    <p className="text-sm font-semibold">
                      Self-paced
                    </p>
                    <p className="text-xs text-slate-400">
                      Learn your way
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Live classes card */}
            <div className="w-full rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-sm sm:p-6 lg:w-72">
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-300">
                  <Video size={22} />
                </div>

                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2.5 py-1 text-[11px] font-medium text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Live learning
                </span>
              </div>

              <h2 className="mt-5 text-lg font-semibold">
                Live Classes
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Join interactive sessions and learn with your
                instructors.
              </p>

              <button
                type="button"
                onClick={handleLiveClasses}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-indigo-50 active:scale-[0.98]"
              >
                Explore Live Classes
                <ArrowRight size={16} />
              </button>

              <p className="mt-3 text-center text-[11px] text-slate-500">
                Live class navigation coming soon
              </p>
            </div>
          </div>
        </section>

        {/* Modules heading */}
        <section className="mt-10">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-indigo-600">
                <BookOpen size={15} />
                Course curriculum
              </div>

              <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                Your learning modules
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Choose a module to continue your learning journey.
              </p>
            </div>

            {!loading && !error && (
              <div className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-600">
                <Layers3 size={16} className="text-indigo-500" />
                {totalModules} {totalModules === 1 ? "module" : "modules"}
              </div>
            )}
          </div>

          {/* Loading state */}
          {loading && (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="animate-pulse rounded-2xl border border-slate-200 bg-white p-6"
                >
                  <div className="h-11 w-11 rounded-xl bg-slate-100" />
                  <div className="mt-5 h-4 w-2/3 rounded bg-slate-100" />
                  <div className="mt-3 h-3 w-full rounded bg-slate-100" />
                  <div className="mt-2 h-3 w-4/5 rounded bg-slate-100" />
                  <div className="mt-6 h-9 rounded-lg bg-slate-100" />
                </div>
              ))}
            </div>
          )}

          {/* Error state */}
          {!loading && error && (
            <div className="mt-6 rounded-2xl border border-red-200 bg-white p-6">
              <h3 className="font-semibold text-red-700">
                Could not load modules
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                {error}
              </p>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-4 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700"
              >
                Try again
              </button>
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && totalModules === 0 && (
            <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-500">
                <BookOpen size={26} />
              </div>
              <h3 className="mt-4 text-lg font-semibold">
                Your curriculum is on its way
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                No modules have been added to this course yet.
                Check back when your instructor publishes them.
              </p>
            </div>
          )}

          {/* Module cards */}
          {!loading && !error && totalModules > 0 && (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {modules.map((module, index) => (
                <article
                  key={module._id}
                  className="group flex flex-col rounded-2xl border border-slate-200/80 bg-white p-5 transition duration-200 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-950/[0.05] sm:p-6"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white">
                      <BookOpen size={22} />
                    </div>

                    <span className="rounded-lg bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-500">
                      MODULE {String(module.order ?? index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-5 text-lg font-semibold tracking-tight text-slate-900">
                    {module.title || "Untitled module"}
                  </h3>

                  <p className="mt-2 min-h-[48px] text-sm leading-6 text-slate-500">
                    {module.description ||
                      "Explore this module and strengthen your understanding of the subject."}
                  </p>

                  <div className="mt-5 flex items-center gap-4 border-t border-slate-100 pt-4 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1.5">
                      <Layers3 size={14} />
                      Learning module
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock3 size={14} />
                      Self-paced
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      console.log("Module clicked", {
                        moduleId: module._id,
                        moduleTitle: module.title,
                        courseId,
                      });
                      // TODO: Navigate to this module's lectures.
                    }}
                    className="mt-5 flex w-full items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-indigo-600 hover:bg-indigo-600 hover:text-white"
                  >
                    Explore module
                    <ArrowRight
                      size={16}
                      className="transition group-hover:translate-x-1"
                    />
                  </button>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Bottom learning banner */}
        <section className="mt-10 flex flex-col gap-4 rounded-2xl border border-indigo-100 bg-indigo-50/70 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm">
              <CalendarDays size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">
                Consistency is your superpower
              </h3>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Keep learning a little every day to make steady progress.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm font-medium text-indigo-700">
            <Sparkles size={16} />
            Keep growing
          </div>
        </section>
      </div>
    </main>
  );
}

export default ModulesPage;
