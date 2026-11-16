
const DueRevisionList = ({
  dueRevisions,
  loading,
  error,
  onMarkRevised
}) => {

  if (loading) return <p className="text-slate-400">Loading revisions...</p>;

  if (error) return <p className="text-red-400">{error}</p>;

  if (!dueRevisions?.length) {
    return (
      <p className="rounded-xl bg-slate-900 p-5 text-slate-400">
        No revisions due right now.
      </p>
    );
  }

  return (
    <div className="space-y-4">

      {dueRevisions.map((revision) => {

        // Populated question reference se question details lena
        const question = revision.questionId;

        return (
          <div
            key={revision._id}
            className="flex flex-col justify-between gap-4 rounded-xl border border-slate-800 bg-slate-900 p-5 sm:flex-row sm:items-center"
          >

            <div>
              <h3 className="font-semibold text-white">
                {question?.title || "Question unavailable"}
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                {question?.difficulty}
              </p>
            </div>

            {/* Parent component se revision handler call karna */}
            <button
              onClick={() => onMarkRevised?.(question?._id)}
              disabled={!question?._id}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-500 disabled:opacity-40"
            >
              Mark Revised
            </button>

          </div>
        );
      })}

    </div>
  );
};

export default DueRevisionList;
