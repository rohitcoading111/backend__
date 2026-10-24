
import { ArrowUpRight, Target } from "lucide-react";

function LearningProgress({
  overallProgress = 0,
  completedLessons = 0,
  totalLessons = 0,
  learningHours = 0,
}) {
  const progress = Math.min(
    100,
    Math.max(0, Number(overallProgress) || 0)
  );

  return (
    <article className="rounded-2xl border border-black/[0.07] bg-white p-5 sm:p-7">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
            Your journey
          </p>

          <h3 className="mt-2 text-lg font-semibold tracking-tight">
            Learning progress
          </h3>

          <p className="mt-1 text-sm text-neutral-500">
            Keep moving towards your learning goals.
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f7f7f5]">
          <Target size={19} />
        </div>
      </div>

      <div className="mt-8">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-4xl font-semibold tracking-tight">
              {progress}%
            </p>

            <p className="mt-1 text-xs text-neutral-500">
              Overall completion
            </p>
          </div>

          <span className="flex items-center gap-1 text-xs text-neutral-500">
            <ArrowUpRight size={15} />
            Learning journey
          </span>
        </div>

        <div
          className="mt-5 h-2 overflow-hidden rounded-full bg-neutral-100"
          role="progressbar"
          aria-label="Overall learning progress"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full rounded-full bg-neutral-900 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="mt-7 grid grid-cols-2 gap-4 border-t border-black/[0.06] pt-5">
        <div>
          <p className="text-2xl font-semibold tracking-tight">
            {completedLessons}
            <span className="text-sm font-normal text-neutral-400">
              {totalLessons > 0 ? ` / ${totalLessons}` : ""}
            </span>
          </p>

          <p className="mt-1 text-xs text-neutral-500">
            Lessons completed
          </p>
        </div>

        <div>
          <p className="text-2xl font-semibold tracking-tight">
            {learningHours}
            <span className="ml-1 text-sm font-normal text-neutral-400">
              hrs
            </span>
          </p>

          <p className="mt-1 text-xs text-neutral-500">
            Time spent learning
          </p>
        </div>
      </div>
    </article>
  );
}

export default LearningProgress;
