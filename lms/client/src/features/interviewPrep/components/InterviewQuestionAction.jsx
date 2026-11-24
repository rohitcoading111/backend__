const InterviewQuestionAction = ({
  isCompleted,
  loading,
  onComplete,
}) => {
  return (
    <button
      onClick={onComplete}
      disabled={isCompleted || loading}
      className={`mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
        isCompleted
          ? "cursor-not-allowed border border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
          : "bg-indigo-600 text-white hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
      }`}
    >
      {loading ? (
        <>
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          Marking as completed...
        </>
      ) : isCompleted ? (
        <>
          <span>✓</span>
          Completed
        </>
      ) : (
        <>
          <span>✓</span>
          Mark as Completed
        </>
      )}
    </button>
  );
};

export default InterviewQuestionAction;