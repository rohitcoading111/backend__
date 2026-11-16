
const DueRevisionList = ({
  dueRevisions = [],
  loading,
  error,
  onMarkRevised
}) => {

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2].map(item => (
          <div
            key={item}
            className="h-16 animate-pulse rounded-xl bg-white/[0.04]"
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

  if (!dueRevisions.length) {
    return (
      <div className="rounded-xl border border-dashed border-white/15 px-5 py-9 text-center">

        <p className="text-sm font-semibold text-white">
          All caught up!
        </p>

        <p className="mt-2 text-xs text-neutral-500">
          You don't have any revision scheduled right now.
        </p>

      </div>
    );
  }

  return (
    <div className="space-y-3">

      {dueRevisions.map((revision) => {

        const question = revision.questionId;

        if (!question || typeof question !== "object") return null;

        return (
          <article
            key={revision._id || question._id}
            className="premium-card rounded-xl p-4"
          >

            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

              <div className="min-w-0">

                <h3 className="text-sm font-semibold text-white">
                  {question.title}
                </h3>

                <div className="mt-2 flex flex-wrap items-center gap-2">

                  <span className="rounded-full border border-white/15 px-2.5 py-1 text-[9px] text-neutral-300">
                    {question.difficulty}
                  </span>

                  <span className="text-[10px] text-neutral-500">
                    {question.platform}
                  </span>

                </div>

              </div>


              <button
                type="button"
                onClick={() => onMarkRevised?.(question._id)}
                className="lh-button-primary !rounded-lg !px-4 !py-2.5 !text-[11px]"
              >
                Mark Revised
              </button>

            </div>

          </article>
        );
      })}

    </div>
  );
};

export default DueRevisionList;
