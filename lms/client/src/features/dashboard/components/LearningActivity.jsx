
import {
  Activity,
  Trophy,
  BookOpen,
  CheckCircle2,
  Clock3,
  Award,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

const activityIcons = {
  lesson: BookOpen,
  completed: CheckCircle2,
  course: Trophy,
  time: Clock3,
  achievement: Award,
};

function LearningActivity({
  activities = [],
  achievements = [],
  loading = false,
  onViewAchievements,
}) {
  // Loading State
  if (loading) {
    return (
      <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        {[1, 2].map((item) => (
          <div
            key={item}
            className="animate-pulse rounded-2xl border border-white/[0.08] bg-[#111111] p-6"
          >
            <div className="h-5 w-40 rounded bg-white/10" />

            <div className="mt-7 space-y-5">
              {[1, 2, 3].map((row) => (
                <div key={row} className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-white/10" />

                  <div className="flex-1 space-y-2">
                    <div className="h-3 w-3/4 rounded bg-white/10" />
                    <div className="h-3 w-1/2 rounded bg-white/[0.06]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    );
  }

  return (
    <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">

      {/* Recent Activity */}
      <article className="rounded-2xl border border-white/[0.08] bg-[#111111] p-5 sm:p-6">

        {/* Header */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05]">
              <Activity size={19} className="text-neutral-300" />
            </div>

            <div>
              <h2 className="text-base font-semibold text-white">
                Recent activity
              </h2>

              <p className="mt-1 text-xs text-neutral-500">
                Your latest learning activities
              </p>
            </div>
          </div>
        </div>

        {/* Activity List */}
        {activities.length > 0 ? (
          <div className="mt-7 space-y-5">
            {activities.map((activity, index) => {
              const Icon =
                activityIcons[activity.type] || Activity;

              return (
                <div
                  key={activity._id || activity.id || index}
                  className="flex items-start gap-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05]">
                    <Icon size={17} className="text-neutral-300" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-medium text-white">
                      {activity.title || activity.description || "Learning activity"}
                    </h3>

                    {activity.description && activity.title && (
                      <p className="mt-1 text-xs text-neutral-500">
                        {activity.description}
                      </p>
                    )}

                    <p className="mt-2 text-[11px] text-neutral-600">
                      {activity.createdAt
                        ? new Date(activity.createdAt).toLocaleString(
                            "en-IN",
                            {
                              day: "numeric",
                              month: "short",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )
                        : "Recently"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex min-h-[220px] flex-col items-center justify-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05]">
              <Activity size={23} className="text-neutral-500" />
            </div>

            <h3 className="mt-4 text-sm font-semibold text-white">
              No recent activity
            </h3>

            <p className="mt-2 max-w-xs text-xs leading-5 text-neutral-500">
              Your learning activities will appear here as you
              complete lessons and courses.
            </p>
          </div>
        )}
      </article>

      {/* Achievements */}
      <article className="rounded-2xl border border-white/[0.08] bg-[#111111] p-5 sm:p-6">

        {/* Header */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05]">
              <Trophy size={19} className="text-neutral-300" />
            </div>

            <div>
              <h2 className="text-base font-semibold text-white">
                Achievements
              </h2>

              <p className="mt-1 text-xs text-neutral-500">
                Your learning milestones
              </p>
            </div>
          </div>

          <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[10px] font-medium text-neutral-400">
            {achievements.length} earned
          </span>
        </div>

        {/* Achievement List */}
        {achievements.length > 0 ? (
          <div className="mt-7 space-y-4">
            {achievements.map((achievement, index) => (
              <div
                key={achievement._id || achievement.id || index}
                className="flex items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-colors hover:bg-white/[0.05]"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05]">
                  <Award size={21} className="text-neutral-300" />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-medium text-white">
                    {achievement.title || achievement.name || "Achievement"}
                  </h3>

                  <p className="mt-1 line-clamp-2 text-xs text-neutral-500">
                    {achievement.description || "Learning milestone unlocked"}
                  </p>

                  {achievement.earnedAt && (
                    <p className="mt-2 text-[11px] text-neutral-600">
                      {new Date(achievement.earnedAt).toLocaleDateString(
                        "en-IN",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </p>
                  )}
                </div>

                <CheckCircle2
                  size={17}
                  className="shrink-0 text-neutral-400"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex min-h-[220px] flex-col items-center justify-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05]">
              <Sparkles size={23} className="text-neutral-500" />
            </div>

            <h3 className="mt-4 text-sm font-semibold text-white">
              No achievements yet
            </h3>

            <p className="mt-2 max-w-xs text-xs leading-5 text-neutral-500">
              Complete courses and lessons to unlock your
              learning achievements.
            </p>
          </div>
        )}

        {/* View All */}
        <button
          type="button"
          onClick={onViewAchievements}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-medium text-neutral-300 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white active:scale-[0.98]"
        >
          View all achievements
          <ArrowUpRight size={16} />
        </button>
      </article>
    </section>
  );
}

export default LearningActivity;
