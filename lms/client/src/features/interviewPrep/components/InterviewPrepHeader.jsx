const InterviewPrepHeader = () => {
  return (
    <div className="relative mb-8 overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-900 to-indigo-950/40 p-6 sm:p-8">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="relative">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1.5 text-sm text-indigo-400">
          <span>✦</span>
          <span>Interview Preparation</span>
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Prepare for your
          <span className="text-indigo-400"> next interview.</span>
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">
          Practice technical interview questions, strengthen your fundamentals,
          and track your preparation progress with LearnHub.
        </p>
      </div>
    </div>
  );
};

export default InterviewPrepHeader;