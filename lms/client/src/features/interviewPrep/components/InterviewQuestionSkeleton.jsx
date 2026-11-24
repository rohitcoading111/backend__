const InterviewQuestionSkeleton = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-xl border border-zinc-800 bg-zinc-900/60 p-5"
        >
          {/* Difficulty and tag count */}
          <div className="mb-4 flex items-center justify-between">
            <div className="h-6 w-24 rounded-full bg-zinc-800" />
            <div className="h-4 w-14 rounded bg-zinc-800" />
          </div>

          {/* Question title */}
          <div className="mb-3 space-y-2">
            <div className="h-5 w-full rounded bg-zinc-800" />
            <div className="h-5 w-3/4 rounded bg-zinc-800" />
          </div>

          {/* Tags */}
          <div className="flex gap-2">
            <div className="h-7 w-16 rounded-md bg-zinc-800" />
            <div className="h-7 w-20 rounded-md bg-zinc-800" />
            <div className="h-7 w-14 rounded-md bg-zinc-800" />
          </div>

          {/* Footer */}
          <div className="mt-5 flex items-center justify-between border-t border-zinc-800 pt-4">
            <div className="h-4 w-28 rounded bg-zinc-800" />
            <div className="h-4 w-24 rounded bg-zinc-800" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default InterviewQuestionSkeleton;