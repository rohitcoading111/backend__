
import {
  Target,
  BookOpen,
  CheckCircle2,
  Clock3,
  TrendingUp,
  RefreshCw,
} from "lucide-react";

function LearningProgress({
  summary = {},
  progress = [],
  loading = false,
  error = null,
  onRetry,
}) {
  const overallProgress = Math.min(
    100,
    Math.max(0, Number(summary?.overallProgress) || 0)
  );

  const completedLessons = Number(summary?.completedLessons) || 0;
  const totalLessons = Number(summary?.totalLessons) || 0;
  const learningHours = Number(summary?.learningHours) || 0;

  // Loading State
  if (loading) {
    return (
      <section className="space-y-5">
        <div className="animate-pulse rounded-2xl border border-white/[0.08] bg-[#111111] p-6">
          <div className="h-4 w-40 rounded bg-white/10" />
          <div className="mt-6 h-8 w-24 rounded bg-white/10" />
          <div className="mt-5 h-2 w-full rounded-full bg-white/[0.06]" />
          <div className="mt-4 h-3 w-52 rounded bg-white/[0.06]" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[1, 2].map((item) => (
            <div
              key={item}
              className="animate-pulse rounded-2xl border border-white/[0.08] bg-[#111111] p-5"
            >
              <div className="h-4 w-28 rounded bg-white/10" />
              <div className="mt-5 h-8 w-20 rounded bg-white/10" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Error State
  if (error) {
    return (
      <section className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#111111] px-5 py-10 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05]">
          <TrendingUp size={24} className="text-neutral-400" />
        </div>

        <h3 className="mt-5 text-lg font-semibold text-white">
          Unable to load your progress
        </h3>

        <p className="mt-2 max-w-sm text-sm leading-6 text-neutral-400">
          {typeof error === "string"
            ? error
            : error?.message || "Something went wrong while loading your learning progress."}
        </p>

        <button
          type="button"
          onClick={onRetry}
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-neutral-200 active:scale-95"
        >
          <RefreshCw size={15} />
          Try again
        </button>
      </section>
    );
  }

  const stats = [
    {
      title: "Completed Lessons",
      value: completedLessons,
      subtitle: `${totalLessons} total lessons`,
      icon: CheckCircle2,
    },
    {
      title: "Learning Hours",
      value: learningHours,
      subtitle: "Time invested in learning",
      icon: Clock3,
    },
  ];

  return (
    <section className="lh-animate-fade space-y-5">

      {/* Overall Progress */}
      <article className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111111] p-6 sm:p-8">

        {/* Decorative Background */}
        <div className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full border border-white/[0.06]" />

        <div className="relative">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">

            {/* Heading */}
            <div>
              <div className="flex items-center gap-2 text-neutral-400">
                <Target size={17} />
                <span className="text-xs font-medium uppercase tracking-[0.15em]">
                  Learning overview
                </span>
              </div>

              <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Your overall progress
              </h2>

              <p className="mt-2 max-w-md text-sm leading-6 text-neutral-400">
                Every completed lesson brings you one step closer
                to your learning goals.
              </p>
            </div>

            {/* Progress Circle */}
            <div
              className="flex h-32 w-32 shrink-0 items-center justify-center rounded-full"
              style={{
                background: `conic-gradient(#ffffff ${overallProgress}%, #292929 ${overallProgress}% 100%)`,
              }}
            >
              <div className="flex h-[108px] w-[108px] items-center justify-center rounded-full bg-[#111111]">
                <div className="text-center">
                  <p className="text-3xl font-semibold tabular-nums text-white">
                    {overallProgress}%
                  </p>
                  <p className="mt-1 text-[10px] uppercase tracking-wider text-neutral-500">
                    Completed
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-8">
            <div className="mb-3 flex items-center justify-between text-xs">
              <span className="text-neutral-400">
                Overall completion
              </span>

              <span className="font-semibold tabular-nums text-white">
                {overallProgress}%
              </span>
            </div>

            <div
              className="h-2 overflow-hidden rounded-full bg-white/10"
              role="progressbar"
              aria-label="Overall learning progress"
              aria-valuenow={overallProgress}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="h-full rounded-full bg-white transition-all duration-1000 ease-out"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
          </div>
        </div>
      </article>

      {/* Progress Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <article
              key={stat.title}
              className="lh-animate-up group rounded-2xl border border-white/[0.08] bg-[#111111] p-5 transition-all duration-300 hover:border-white/20 hover:bg-[#151515]"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05]">
                  <Icon size={20} className="text-neutral-300" />
                </div>

                <TrendingUp
                  size={17}
                  className="text-neutral-600 transition-colors group-hover:text-white"
                />
              </div>

              <p className="mt-5 text-sm text-neutral-400">
                {stat.title}
              </p>

              <h3 className="mt-2 text-3xl font-semibold tracking-tight text-white">
                {stat.value}
              </h3>

              <p className="mt-2 text-xs text-neutral-500">
                {stat.subtitle}
              </p>
            </article>
          );
        })}
      </div>

      {/* Lesson Summary */}
      <article className="rounded-2xl border border-white/[0.08] bg-[#111111] p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05]">
            <BookOpen size={19} className="text-neutral-300" />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">
              Lesson summary
            </h3>

            <p className="mt-1 text-xs text-neutral-500">
              Your completed learning activities
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-3xl font-semibold tabular-nums text-white">
              {completedLessons}
              <span className="text-lg font-medium text-neutral-500">
                {" "}/ {totalLessons}
              </span>
            </p>

            <p className="mt-1 text-xs text-neutral-500">
              Lessons completed
            </p>
          </div>

          <div className="text-right">
            <p className="text-xl font-semibold text-white">
              {Math.max(0, totalLessons - completedLessons)}
            </p>

            <p className="mt-1 text-xs text-neutral-500">
              Remaining lessons
            </p>
          </div>
        </div>
      </article>

    </section>
  );
}

export default LearningProgress;
