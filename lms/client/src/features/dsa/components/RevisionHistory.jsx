
const RevisionHistory = ({ revisionHistory, loading, error }) => {

  if (loading) return <p className="text-slate-400">Loading history...</p>;

  if (error) return <p className="text-red-400">{error}</p>;

  if (!revisionHistory?.length) {
    return <p className="text-slate-400">No activity history found.</p>;
  }

  return (
    <div className="space-y-3">

      {revisionHistory.map((activity) => (

        <div
          key={activity._id}
          className="flex items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-900 p-4"
        >

          <div>
            {/* Activity question title */}
            <h3 className="font-medium text-white">
              {activity.questionId?.title || "Question"}
            </h3>

            <p className="mt-1 text-xs text-slate-400">
              {activity.activityAt
                ? new Date(activity.activityAt).toLocaleString()
                : "Date unavailable"}
            </p>
          </div>

          {/* Activity type badge */}
          <span className={`rounded-full px-3 py-1 text-xs ${
            activity.activityType === "SOLVED"
              ? "bg-green-500/10 text-green-400"
              : "bg-indigo-500/10 text-indigo-400"
          }`}>
            {activity.activityType}
          </span>

        </div>

      ))}

    </div>
  );
};

export default RevisionHistory;
