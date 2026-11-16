const DsaQuestionCard = ({
  question,
  onView,
  onEdit,
  onDelete
}) => {

  // Difficulty ke according badge color decide karna
  const difficultyStyle = {
    EASY: "bg-green-500/10 text-green-400",
    MEDIUM: "bg-yellow-500/10 text-yellow-400",
    HARD: "bg-red-500/10 text-red-400"
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:border-indigo-500/50">

      {/* Question title and difficulty */}
      <div className="flex items-start justify-between gap-3">

        <h3 className="text-lg font-semibold text-white">
          {question.title}
        </h3>

        <span className={`rounded-full px-3 py-1 text-xs font-medium ${
          difficultyStyle[question.difficulty] || "bg-slate-700 text-white"
        }`}>
          {question.difficulty}
        </span>

      </div>

      {/* Question description */}
      <p className="mt-3 line-clamp-2 text-sm text-slate-400">
        {question.description}
      </p>

      {/* Platform */}
      <p className="mt-4 text-xs text-indigo-400">
        {question.platform}
      </p>

      {/* Topics */}
      <div className="mt-3 flex flex-wrap gap-2">
        {question.topics?.map((topic, index) => (
          <span
            key={`${topic}-${index}`}
            className="rounded-lg bg-slate-800 px-3 py-1 text-xs text-slate-300"
          >
            {topic}
          </span>
        ))}
      </div>

      {/* Action buttons */}
      <div className="mt-6 flex flex-wrap gap-2">

        <button
          onClick={() => onView?.(question._id)}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-500"
        >
          View Details
        </button>

        {/* Edit callback */}
        {onEdit && (
          <button
            onClick={() => onEdit(question)}
            className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800"
          >
            Edit
          </button>
        )}

        {/* Delete callback */}
        {onDelete && (
          <button
            onClick={() => onDelete(question._id)}
            className="rounded-lg border border-red-500/30 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10"
          >
            Delete
          </button>
        )}

      </div>

    </div>
  );
};

export default DsaQuestionCard;
