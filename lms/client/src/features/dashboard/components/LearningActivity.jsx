
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Trophy,
} from "lucide-react";

function LearningActivity({
  activities = [],
  achievements = [],
  loading = false,
  onViewAchievements,
}) {
  return (
    <article className="rounded-2xl border border-black/[0.07] bg-white p-5 sm:p-7">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
            Your journey
          </p>

          <h3 className="mt-2 text-lg font-semibold tracking-tight">
            Learning activity
          </h3>

          <p className="mt-1 text-sm text-neutral-500">
            Your recent learning milestones.
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f7f7f5]">
          <Activity size={19} />
        </div>
      </div>

      {loading ? (
        <p className="py-8 text-center text-sm text-neutral-500">
          Loading your activity...
        </p>
      ) : activities.length === 0 ? (
        <div className="mt-6 rounded-xl border border-dashed border-black/15 px-4 py-7 text-center">
          <Activity size={25} className="mx-auto text-neutral-400" />

          <p className="mt-3 text-sm font-medium">
            No recent activity
          </p>

          <p className="mt-1 text-xs text-neutral-500">
            Your learning activity will appear here as you progress.
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {activities.map((item, index) => (
            <div key={item._id || index} className="flex gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f7f7f5]">
                <CheckCircle2 size={17} />
              </div>

              <div className="min-w-0 flex-1 border-b border-black/[0.06] pb-4">
                <p className="text-sm font-medium">
                  {item.title}
                </p>

                {item.description && (
                  <p className="mt-1 text-xs leading-5 text-neutral-500">
                    {item.description}
                  </p>
                )}

                {item.date && (
                  <p className="mt-2 text-[11px] text-neutral-400">
                    {new Date(item.date).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-7 border-t border-black/[0.06] pt-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f7f7f5]">
              <Trophy size={19} />
            </div>

            <div>
              <h4 className="text-sm font-semibold">Achievements</h4>

              <p className="mt-1 text-xs text-neutral-500">
                {achievements.length} achievements earned
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onViewAchievements}
            className="flex shrink-0 items-center gap-1 text-xs font-medium transition hover:opacity-60"
          >
            View all
            <ArrowRight size={14} />
          </button>
        </div>

        {achievements.length > 0 ? (
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {achievements.slice(0, 4).map((achievement) => (
              <div
                key={achievement._id}
                className="flex items-center gap-3 rounded-xl border border-black/[0.07] p-3"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f7f7f5]">
                  <Trophy size={16} />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">
                    {achievement.title}
                  </p>

                  {achievement.description && (
                    <p className="mt-1 line-clamp-1 text-xs text-neutral-500">
                      {achievement.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-xs leading-5 text-neutral-500">
            Keep learning to build your achievements.
          </p>
        )}
      </div>
    </article>
  );
}

export default LearningActivity;
