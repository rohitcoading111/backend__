
import { ArrowRight, CalendarDays, Clock3, Radio } from "lucide-react";

function LiveClasses({
  classes = [],
  loading = false,
  onViewClasses,
  onJoinClass,
}) {
  return (
    <article className="rounded-2xl border border-black/[0.07] bg-white p-5 sm:p-7">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
            Learn together
          </p>

          <h3 className="mt-2 text-lg font-semibold tracking-tight">
            Live classes
          </h3>

          <p className="mt-1 text-sm text-neutral-500">
            Your upcoming learning sessions.
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f7f7f5]">
          <Radio size={19} />
        </div>
      </div>

      {loading ? (
        <p className="py-8 text-center text-sm text-neutral-500">
          Loading live classes...
        </p>
      ) : classes.length === 0 ? (
        <div className="mt-6 rounded-xl border border-dashed border-black/15 px-4 py-8 text-center">
          <CalendarDays
            size={27}
            className="mx-auto text-neutral-400"
          />

          <h4 className="mt-3 text-sm font-semibold">
            No upcoming classes
          </h4>

          <p className="mt-1 text-xs leading-5 text-neutral-500">
            Your scheduled live sessions will appear here.
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {classes.map((liveClass) => (
            <div
              key={liveClass._id}
              className="rounded-xl border border-black/[0.07] p-4 transition hover:border-black/20"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h4 className="text-sm font-semibold">
                    {liveClass.title}
                  </h4>

                  <p className="mt-1 text-xs text-neutral-500">
                    {liveClass.instructor || "Instructor"}
                  </p>
                </div>

                {liveClass.status === "LIVE" && (
                  <span className="shrink-0 rounded-full bg-red-50 px-2.5 py-1 text-[10px] font-semibold text-red-600">
                    LIVE NOW
                  </span>
                )}
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-neutral-500">
                {liveClass.date && (
                  <span className="flex items-center gap-1.5">
                    <CalendarDays size={14} />
                    {new Date(liveClass.date).toLocaleDateString()}
                  </span>
                )}

                {liveClass.time && (
                  <span className="flex items-center gap-1.5">
                    <Clock3 size={14} />
                    {liveClass.time}
                  </span>
                )}
              </div>

              {liveClass.status === "LIVE" && (
                <button
                  type="button"
                  onClick={() => onJoinClass?.(liveClass)}
                  
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800"
                >
                  Join class
                  <ArrowRight size={15} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={onViewClasses}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-black/10 px-4 py-3 text-sm font-medium transition hover:bg-[#f7f7f5]"
      >
        View all classes
        <ArrowRight size={15} />
      </button>
    </article>
  );
}

export default LiveClasses;
