const InterviewTopicCard = ({
  topic,
  questionCount,
  completedCount,
  onClick,
}) => {
  const progressPercentage =
    questionCount > 0
      ? Math.round((completedCount / questionCount) * 100)
      : 0;

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 transition-all duration-300 hover:border-indigo-500/40 hover:bg-zinc-900"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-zinc-100 transition-colors group-hover:text-indigo-400">
            {topic}
          </h3>

          <p className="mt-2 text-sm text-zinc-500">
            {questionCount} Interview Questions
          </p>
        </div>

        <span className="text-sm text-indigo-400 transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </div>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="text-zinc-500">Progress</span>

          <span className="text-zinc-400">
            {completedCount}/{questionCount}
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
          <div
            className="h-full rounded-full bg-indigo-500 transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-zinc-500">
          {progressPercentage}% completed
        </span>

        <span className="text-sm font-medium text-indigo-400">
          Explore →
        </span>
      </div>
    </div>
  );
};

export default InterviewTopicCard;