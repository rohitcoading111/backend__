
const DsaQuestionCard = ({
  question,
  onView,
  onEdit,
  onDelete,
  onMarkSolved
}) => {
  if (!question) return null;

  const difficultyStyle = {
    EASY: "border-white/20 text-white",
    MEDIUM: "border-white/30 text-neutral-300",
    HARD: "border-white/40 text-neutral-100"
  };

  return (
    <article className="premium-card rounded-xl p-4">

      <div className="flex items-start justify-between gap-3">

        <div className="min-w-0">

          <h3 className="break-words text-sm font-bold text-white">
            {question.title}
          </h3>

          <p className="mt-2 line-clamp-2 text-xs leading-5 text-neutral-500">
            {question.description}
          </p>

        </div>

        <span className={`
          shrink-0 rounded-full border
          px-2.5 py-1 text-[9px] font-semibold
          ${difficultyStyle[question.difficulty] || difficultyStyle.EASY}
        `}>
          {question.difficulty}
        </span>

      </div>


      <div className="mt-4 flex flex-wrap gap-2">

        <span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 text-[10px] text-neutral-400">
          {question.platform}
        </span>

        {(question.topics || []).slice(0, 3).map((topic, index) => (
          <span
            key={`${topic}-${index}`}
            className="rounded-md border border-white/10 px-2 py-1 text-[10px] text-neutral-500"
          >
            {topic}
          </span>
        ))}

      </div>


      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.07] pt-3">

        <button
          type="button"
          onClick={() => onView?.(question._id)}
          className="text-xs font-medium text-white transition hover:text-neutral-400"
        >
          View details →
        </button>

        <div className="flex flex-wrap gap-2">

          <button
            type="button"
            onClick={() => onMarkSolved?.(question._id)}
            className="lh-button-secondary !rounded-lg !px-3 !py-2 !text-[10px]"
          >
            Mark Solved
          </button>

          <button
            type="button"
            onClick={() => onEdit?.(question)}
            className="lh-button-secondary !rounded-lg !px-3 !py-2 !text-[10px]"
          >
            Edit
          </button>

          <button
            type="button"
            onClick={() => onDelete?.(question._id)}
            className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-[10px] text-neutral-400 transition hover:border-white/30 hover:text-white"
          >
            Delete
          </button>

        </div>

      </div>

    </article>
  );
};

export default DsaQuestionCard;
