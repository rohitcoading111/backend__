
const DsaProgressCard = ({ progress, loading, error }) => {

  if (loading) return <p className="text-slate-400">Loading progress...</p>;

  if (error) return <p className="text-red-400">{error}</p>;

  // Progress response se total solved count lena
  const totalSolvedQuestions = progress?.totalSolvedQuestions ?? 0;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-white">

      <p className="text-sm text-slate-400">Questions Solved</p>

      <h2 className="mt-3 text-4xl font-bold text-indigo-400">
        {totalSolvedQuestions}
      </h2>

      <p className="mt-2 text-sm text-slate-400">
        Total unique questions solved
      </p>

    </div>
  );
};

export default DsaProgressCard;
