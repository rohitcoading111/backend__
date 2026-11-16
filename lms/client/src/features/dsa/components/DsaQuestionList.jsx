import DsaQuestionCard from "./DsaQuestionCard";

const DsaQuestionList = ({
  questions,
  loading,
  error,
  pagination,
  onView,
  onEdit,
  onDelete,
  onNextPage,
  onPreviousPage
}) => {

  // API request chal rahi ho toh loader show karo
  if (loading) {
    return (
      <div className="py-16 text-center text-slate-400">
        Loading DSA questions...
      </div>
    );
  }

  // API error handle karna
  if (error) {
    return (
      <div className="rounded-xl bg-red-500/10 p-5 text-center text-red-400">
        {error}
      </div>
    );
  }

  // Empty questions state
  if (!questions?.length) {
    return (
      <div className="py-16 text-center text-slate-400">
        No DSA questions found.
      </div>
    );
  }

  return (
    <div>

      {/* Questions grid */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

        {questions.map((question) => (
          <DsaQuestionCard
            key={question._id}
            question={question}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}

      </div>

      {/* Pagination */}
      {pagination && (
        <div className="mt-8 flex items-center justify-between">

          <button
            onClick={onPreviousPage}
            disabled={pagination.currentPage <= 1}
            className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-white disabled:opacity-40"
          >
            Previous
          </button>

          <span className="text-sm text-slate-400">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>

          <button
            onClick={onNextPage}
            disabled={pagination.currentPage >= pagination.totalPages}
            className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-white disabled:opacity-40"
          >
            Next
          </button>

        </div>
      )}

    </div>
  );
};

export default DsaQuestionList;
