
import {
  BookOpen,
  CheckCircle2,
  Clock3,
  Target,
  ArrowUpRight,
} from "lucide-react";

const DashboardStats = ({
  enrolledCourses = 0,
  completedLessons = 0,
  learningHours = 0,
  overallProgress = 0,
  loading = false,
}) => {
  const stats = [
    {
      id: "courses",
      title: "Enrolled Courses",
      value: enrolledCourses,
      description: "Courses you're learning",
      icon: BookOpen,
    },
    {
      id: "lessons",
      title: "Completed Lessons",
      value: completedLessons,
      description: "Lessons completed",
      icon: CheckCircle2,
    },
    {
      id: "hours",
      title: "Learning Hours",
      value: learningHours,
      description: "Time invested in learning",
      icon: Clock3,
      suffix: "h",
    },
    {
      id: "progress",
      title: "Overall Progress",
      value: overallProgress,
      description: "Your learning journey",
      icon: Target,
      suffix: "%",
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;

        return (
          <article
            key={stat.id}
            className="lh-animate-up group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111111] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-[#151515]"
            style={{
              animationDelay: `${index * 80}ms`,
            }}
          >
            {/* Top Row */}
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] transition-colors duration-300 group-hover:bg-white/10">
                <Icon
                  size={20}
                  strokeWidth={1.7}
                  className="text-neutral-300"
                />
              </div>

              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.08] text-neutral-500 transition-all duration-300 group-hover:border-white/20 group-hover:text-white">
                <ArrowUpRight size={15} />
              </div>
            </div>

            {/* Stats */}
            <div className="mt-6">
              <p className="text-sm font-medium text-neutral-400">
                {stat.title}
              </p>

              {loading ? (
                <div className="mt-3 h-9 w-24 animate-pulse rounded-lg bg-white/10" />
              ) : (
                <h3 className="mt-2 text-3xl font-semibold tracking-tight text-white">
                  {stat.value ?? 0}
                  {stat.suffix || ""}
                </h3>
              )}

              <p className="mt-2 text-xs text-neutral-500">
                {stat.description}
              </p>
            </div>

            {/* Bottom Accent */}
            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-white/60 transition-all duration-500 group-hover:w-full" />
          </article>
        );
      })}
    </section>
  );
};

export default DashboardStats;
