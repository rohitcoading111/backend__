
const RevisionHistory = ({
  revisionHistory = [],
  loading,
  error
}) => {

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map(item => (
          <div
            key={item}
            className="h-14 animate-pulse rounded-xl bg-white/[0.04]"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-sm text-neutral-400">
        {error}
      </p>
    );
  }

  if (!revisionHistory.length) {
    return (
      <div className="rounded-xl border border-dashed border-white/15 px-5 py-9 text-center">

        <p className="text-sm font-semibold text-white">
          No activity yet
        </p>

        <p className="mt-2 text-xs text-neutral-500">
          Your solved and revised questions will appear here.
        </p>

      </div>
    );
  }

  const formatDate = (date) => {
    if (!date) return "Date unavailable";

    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div className="space-y-3">

      {revisionHistory.map((item, index) => {

        const question = item.questionId;

        return (
          <div
            key={item._id || index}
            className="premium-card flex items-start gap-3 rounded-xl p-4"
          >

            <div className="
              mt-1 flex h-8 w-8 shrink-0
              items-center justify-center
              rounded-full border border-white/15
              bg-white/[0.05]
              text-xs text-white
            ">
              {item.activityType === "SOLVED" ? "✓" : "↻"}
            </div>


            <div className="min-w-0 flex-1">

              <div className="flex flex-wrap items-center justify-between gap-2">

                <h3 className="text-xs font-semibold text-white">
                  {question?.title || "Question"}
                </h3>

                <span className="
                  rounded-full border border-white/15
                  px-2.5 py-1 text-[9px]
                  text-neutral-400
                ">
                  {item.activityType}
                </span>

              </div>

              <p className="mt-1.5 text-[10px] text-neutral-500">
                {formatDate(item.activityAt)}
              </p>

              {question?.difficulty && (
                <p className="mt-2 text-[10px] text-neutral-600">
                  Difficulty: {question.difficulty}
                </p>
              )}

            </div>

          </div>
        );
      })}

    </div>
  );
};

export default RevisionHistory;
