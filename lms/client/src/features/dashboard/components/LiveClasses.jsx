
import {
  Radio,
  Video,
  CalendarDays,
  Clock3,
  UserRound,
  ArrowUpRight,
  Play,
  RefreshCw,
} from "lucide-react";

function formatClassDate(date) {
  if (!date) return "Date not available";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Date not available";
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatClassTime(date) {
  if (!date) return "Time not available";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Time not available";
  }

  return parsedDate.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function LiveClasses({
  classes = [],
  loading = false,
  error = null,
  onRetry,
  onViewClasses,
  onJoinClass,
}) {
  // Loading State
  if (loading) {
    return (
      <section className="space-y-4">
        {[1, 2].map((item) => (
          <div
            key={item}
            className="animate-pulse rounded-2xl border border-white/[0.08] bg-[#111111] p-5"
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-white/10" />

              <div className="flex-1 space-y-3">
                <div className="h-4 w-1/2 rounded bg-white/10" />
                <div className="h-3 w-1/3 rounded bg-white/[0.06]" />
              </div>
            </div>

            <div className="mt-5 h-10 rounded-xl bg-white/[0.06]" />
          </div>
        ))}
      </section>
    );
  }

  // Error State
  if (error) {
    return (
      <section className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#111111] px-5 py-10 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05]">
          <Video size={24} className="text-neutral-400" />
        </div>

        <h3 className="mt-5 text-lg font-semibold text-white">
          Unable to load live classes
        </h3>

        <p className="mt-2 max-w-sm text-sm leading-6 text-neutral-400">
          {typeof error === "string"
            ? error
            : error?.message || "Something went wrong while loading classes."}
        </p>

        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-neutral-200"
          >
            <RefreshCw size={15} />
            Try again
          </button>
        )}
      </section>
    );
  }

  // Empty State
  if (!classes || classes.length === 0) {
    return (
      <section className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-[#111111] px-5 py-12 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05]">
          <Radio size={28} className="text-neutral-300" />
        </div>

        <h3 className="mt-5 text-xl font-semibold text-white">
          No live classes available
        </h3>

        <p className="mt-2 max-w-sm text-sm leading-6 text-neutral-400">
          There are no live or upcoming sessions right now.
          Check the live classes page for updates.
        </p>

        <button
          type="button"
          onClick={onViewClasses}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-neutral-200 active:scale-95"
        >
          View all classes
          <ArrowUpRight size={16} />
        </button>
      </section>
    );
  }

  // Live Classes List
  return (
    <section className="space-y-5">

      {/* Header */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05]">
            <Video size={19} className="text-neutral-300" />
          </div>

          <div>
            <h2 className="text-base font-semibold text-white">
              Your live sessions
            </h2>

            <p className="mt-1 text-xs text-neutral-500">
              {classes.length} available{" "}
              {classes.length === 1 ? "session" : "sessions"}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onViewClasses}
          className="inline-flex w-fit items-center gap-2 text-sm font-medium text-neutral-400 transition hover:text-white"
        >
          View all classes
          <ArrowUpRight size={16} />
        </button>
      </div>

      {/* Class Cards */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {classes.map((liveClass) => {
          const status = liveClass.status?.toUpperCase();

          const isLive = status === "LIVE";

          const courseName =
            liveClass.course?.title ||
            liveClass.courseTitle ||
            "Live learning session";

          const instructorName =
            liveClass.instructor?.name ||
            liveClass.instructorName ||
            "Instructor";

          const scheduledAt =
            liveClass.scheduledAt ||
            liveClass.startTime ||
            liveClass.startedAt;

          return (
            <article
              key={liveClass._id}
              className="group rounded-2xl border border-white/[0.08] bg-[#111111] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-[#151515]"
            >
              {/* Top Row */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05]">
                  <Video
                    size={21}
                    className="text-neutral-300"
                  />
                </div>

                <span
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider ${
                    isLive
                      ? "border-white/25 bg-white text-black"
                      : "border-white/10 bg-white/[0.05] text-neutral-400"
                  }`}
                >
                  {isLive && (
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-black" />
                  )}

                  {isLive ? "Live now" : status || "Scheduled"}
                </span>
              </div>

              {/* Course Information */}
              <div className="mt-5">
                <h3 className="text-lg font-semibold tracking-tight text-white">
                  {liveClass.title || courseName}
                </h3>

                <p className="mt-1 text-sm text-neutral-400">
                  {courseName}
                </p>
              </div>

              {/* Class Details */}
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-2 text-xs text-neutral-400">
                  <UserRound size={15} />
                  <span className="truncate">
                    {instructorName}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-neutral-400">
                  <CalendarDays size={15} />
                  <span>
                    {formatClassDate(scheduledAt)}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-neutral-400">
                  <Clock3 size={15} />
                  <span>
                    {formatClassTime(scheduledAt)}
                  </span>
                </div>
              </div>

              {/* Join Button */}
              <button
                type="button"
                disabled={!isLive}
                onClick={() => onJoinClass?.(liveClass)}
                className={`mt-6 flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 active:scale-[0.98] ${
                  isLive
                    ? "bg-white text-black hover:bg-neutral-200"
                    : "cursor-not-allowed border border-white/10 bg-white/[0.04] text-neutral-500"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Play size={15} fill={isLive ? "currentColor" : "none"} />

                  {isLive ? "Join live class" : "Not started yet"}
                </span>

                <ArrowUpRight size={17} />
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default LiveClasses;
