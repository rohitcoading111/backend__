const InterviewPrepStats = ({
  totalQuestions = 0,
  completedQuestions = 0,
}) => {
  const remainingQuestions = Math.max(
    totalQuestions - completedQuestions,
    0
  );

  const progressPercentage =
    totalQuestions > 0
      ? Math.round((completedQuestions / totalQuestions) * 100)
      : 0;

  const stats = [
    {
      label: "Total Questions",
      value: totalQuestions,
      color: "text-indigo-400",
      bg: "bg-indigo-500/10",
    },
    {
      label: "Completed",
      value: completedQuestions,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Remaining",
      value: remainingQuestions,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
    },
  ];

  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5"
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm text-zinc-400">{stat.label}</p>

              <div className={`h-2 w-2 rounded-full ${stat.bg}`} />
            </div>

            <h3 className={`text-2xl font-bold ${stat.color}`}>
              {stat.value}
            </h3>
          </div>
        ))}
      </div>

      {/* Progress */}
      <div className="mt-5 rounded-xl border border-zinc-800 bg-zinc-900/60 p-5">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-medium text-zinc-300">
            Overall Progress
          </span>

          <span className="text-sm font-semibold text-indigo-400">
            {progressPercentage}%
          </span>
        </div>

        <div className="h-2.5 overflow-hidden rounded-full bg-zinc-800">
          <div
            className="h-full rounded-full bg-indigo-500 transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        <p className="mt-3 text-xs text-zinc-500">
          {completedQuestions} out of {totalQuestions} questions completed
        </p>
      </div>
    </div>
  );
};

export default InterviewPrepStats;