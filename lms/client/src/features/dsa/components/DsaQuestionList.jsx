
import DsaQuestionCard from "./DsaQuestionCard";

const DsaQuestionList = ({
  questions = [],
  progressMap = {},
  loading,
  error,
  pagination,
  onView,
  onEdit,
  onDelete,
  onMarkSolved,
  onMarkRevised,
  onNextPage,
  onPreviousPage
}) => {

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        {[1, 2, 3, 4].map(item => (
          <div
            key={item}
            className="h-40 animate-pulse rounded-xl border border-white/10 bg-white/[0.03]"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 text-sm text-neutral-400">
        {error}
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="rounded-xl border border-dashed border-white/15 px-5 py-12 text-center">
        <div className="mb-3 text-3xl text-neutral-600">∅</div>

        <h3 className="text-sm font-semibold text-white">
          No questions found
        </h3>

        <p className="mt-2 text-xs text-neutral-500">
          Add your first DSA question to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">

      <div className="grid gap-4 md:grid-cols-2">

        {questions.map(question => (
          <DsaQuestionCard
            key={question._id}
            question={question}
            progress={progressMap[question._id]}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
            onMarkSolved={onMarkSolved}
            onMarkRevised={onMarkRevised}
          />
        ))}

      </div>

      {pagination && pagination.totalPages > 1 && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">

          <p className="text-xs text-neutral-500">
            Page {pagination.currentPage} of {pagination.totalPages}
          </p>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={onPreviousPage}
              disabled={pagination.currentPage <= 1}
              className="lh-button-secondary !rounded-lg !px-4 !py-2 disabled:opacity-30"
            >
              Previous
            </button>

            <button
              type="button"
              onClick={onNextPage}
              disabled={pagination.currentPage >= pagination.totalPages}
              className="lh-button-secondary !rounded-lg !px-4 !py-2 disabled:opacity-30"
            >
              Next
            </button>
          </div>

        </div>
      )}

    </div>
  );
};

export default DsaQuestionList;
