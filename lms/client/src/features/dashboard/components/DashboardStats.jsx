
import {
  BookOpen,
  CheckCircle2,
  Clock3,
  Target,
} from "lucide-react";

function DashboardStats({
  enrolledCourses = 0,
  completedLessons = 0,
  learningHours = 0,
  overallProgress = 0,
}) {
  const stats = [
    {
      label: "Enrolled courses",
      value: enrolledCourses,
      icon: BookOpen,
      description: "Your learning library",
    },
    {
      label: "Completed lessons",
      value: completedLessons,
      icon: CheckCircle2,
      description: "Lessons completed",
    },
    {
      label: "Learning hours",
      value: learningHours,
      icon: Clock3,
      description: "Time spent learning",
    },
    {
      label: "Overall progress",
      value: `${overallProgress}%`,
      icon: Target,
      description: "Across your courses",
    },
  ];

  return (
    <section className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map(({ label, value, icon: Icon, description }, index) => (
        <article
          key={label}
          className="group rounded-2xl border border-black/[0.07] bg-white p-5 transition hover:-translate-y-0.5 hover:border-black/15 hover:shadow-[0_12px_35px_rgba(0,0,0,0.04)] sm:p-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/[0.06] bg-[#f7f7f5]">
              <Icon size={19} strokeWidth={1.7} />
            </div>

            <span className="text-[10px] font-medium uppercase tracking-wider text-neutral-400">
              0{index + 1}
            </span>
          </div>

          <p className="mt-6 text-sm text-neutral-500">{label}</p>

          <p className="mt-2 text-3xl font-semibold tracking-tight">
            {value}
          </p>

          <p className="mt-2 text-xs text-neutral-400">{description}</p>
        </article>
      ))}
    </section>
  );
}

export default DashboardStats;
