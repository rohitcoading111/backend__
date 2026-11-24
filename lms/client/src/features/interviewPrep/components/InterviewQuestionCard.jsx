import InterviewQuestionAction from "./InterviewQuestionAction";

const InterviewQuestionCard = ({
  question,
  onClick,
  isExpanded,
  user,
  isCompleted,
  onComplete,
  completionLoading,
}) => {
  const difficultyStyles = {
    BEGINNER: "bg-green-500/10 text-green-400 border-green-500/20",
    INTERMEDIATE: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    ADVANCED: "bg-red-500/10 text-red-400 border-red-500/20",
  };

  return (
    <div
      className={`rounded-xl border bg-zinc-900/60 p-5 transition-all duration-300 ${
        isExpanded
          ? "border-indigo-500/40 bg-zinc-900"
          : "border-zinc-800 hover:border-indigo-500/40 hover:bg-zinc-900"
      }`}
    >
      {/* Card Header */}
      <div
        onClick={onClick}
        className="group cursor-pointer"
      >
        <div className="mb-4 flex items-center justify-between gap-3">
          <span
            className={`rounded-full border px-3 py-1 text-xs font-medium ${
              difficultyStyles[question.difficulty]
            }`}
          >
            {question.difficulty}
          </span>

          <span className="text-sm text-zinc-500">
            {question.tags?.length || 0} Tags
          </span>
        </div>

        <h3 className="mb-3 text-lg font-semibold text-zinc-100 transition-colors group-hover:text-indigo-400">
          {question.title}
        </h3>

        <div className="flex flex-wrap gap-2">
          {question.tags?.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="rounded-md bg-zinc-800 px-2.5 py-1 text-xs text-zinc-400"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-zinc-800 pt-4">
          <span className="text-sm text-zinc-500">
            Interview Question
          </span>

          <span className="text-sm font-medium text-indigo-400">
            {isExpanded ? "Hide Answer ↑" : "View Answer ↓"}
          </span>
        </div>
      </div>

      {/* Expanded Answer */}
      {isExpanded && (
        <div className="mt-5 border-t border-zinc-800 pt-5">
          <div className="rounded-lg bg-zinc-950/70 p-4">
            <h4 className="mb-3 font-semibold text-zinc-200">
              Answer
            </h4>

            <div className="whitespace-pre-wrap text-sm leading-7 text-zinc-400">
              {question.answer}
            </div>
          </div>

          {/* Completion Button - Logged in users only */}
          {user && (
            <div className="mt-5">
              <InterviewQuestionAction
                isCompleted={isCompleted}
                loading={completionLoading}
                onComplete={onComplete}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InterviewQuestionCard;