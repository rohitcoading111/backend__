
const DsaProgressCard = ({ progress, loading, error }) => {

  const totalSolved = progress?.totalSolvedQuestions || 0;
  const totalTracked = progress?.progress?.length || 0;

  const percentage = totalTracked
    ? Math.round((totalSolved / totalTracked) * 100)
    : 0;

  if (loading) {
    return (
      <div className="premium-card rounded-2xl p-5">
        <div className="h-20 animate-pulse rounded bg-white/5" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="premium-card rounded-2xl p-5 text-sm text-neutral-400">
        {error}
      </div>
    );
  }

  return (
    <div className="premium-card rounded-2xl p-5 sm:p-6">

      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[2px] text-neutral-500">
            Your Performance
          </p>

          <h2 className="mt-1 text-lg font-bold text-white">
            Practice Overview
          </h2>
        </div>

        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] text-neutral-400">
          Personal Progress
        </span>

      </div>


      <div className="grid gap-3 sm:grid-cols-3">

        <div className="rounded-xl border border-white/10 bg-black/30 p-4">
          <p className="text-[10px] text-neutral-500">Solved Questions</p>
          <p className="mt-2 text-3xl font-bold text-white">{totalSolved}</p>
        </div>

        <div className="rounded-xl border border-white/10 bg-black/30 p-4">
          <p className="text-[10px] text-neutral-500">Tracked Questions</p>
          <p className="mt-2 text-3xl font-bold text-white">{totalTracked}</p>
        </div>

        <div className="rounded-xl border border-white/10 bg-black/30 p-4">
          <p className="text-[10px] text-neutral-500">Completion</p>
          <p className="mt-2 text-3xl font-bold text-white">{percentage}%</p>
        </div>

      </div>


      <div className="mt-5">

        <div className="mb-2 flex justify-between text-[10px] text-neutral-500">
          <span>Tracked question progress</span>
          <span>{percentage}%</span>
        </div>

        <div className="lh-progress-track">
          <div
            className="lh-progress-fill"
            style={{ width: `${percentage}%` }}
          />
        </div>

      </div>

    </div>
  );
};

export default DsaProgressCard;
