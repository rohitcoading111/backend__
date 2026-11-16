
const DsaQuestionDetails = ({ question, loading, error }) => {

  if (loading) {
    return (
      <div className="animate-pulse space-y-3">
        <div className="h-5 w-1/3 rounded bg-white/10" />
        <div className="h-24 rounded bg-white/5" />
      </div>
    );
  }

  if (error) {
    return <p className="text-sm text-neutral-400">{error}</p>;
  }

  if (!question) {
    return <p className="text-sm text-neutral-500">Question not found.</p>;
  }

  return (
    <article className="space-y-5">

      <div className="flex flex-wrap items-center gap-2">

        <span className="text-lg font-bold text-white">
          {question.title}
        </span>

        <span className="rounded-full border border-white/20 px-3 py-1 text-[10px] text-neutral-300">
          {question.difficulty}
        </span>

        <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] text-neutral-500">
          {question.platform}
        </span>

      </div>


      <div>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">
          Description
        </h3>

        <p className="whitespace-pre-wrap text-sm leading-7 text-neutral-300">
          {question.description}
        </p>
      </div>


      {!!question.topics?.length && (
        <div>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">
            Topics
          </h3>

          <div className="flex flex-wrap gap-2">
            {question.topics.map((topic, index) => (
              <span
                key={`${topic}-${index}`}
                className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-neutral-300"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      )}


      {question.constraints && (
        <div>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">
            Constraints
          </h3>

          <div className="rounded-xl border border-white/10 bg-black/40 p-4">
            <p className="whitespace-pre-wrap text-xs leading-6 text-neutral-400">
              {question.constraints}
            </p>
          </div>
        </div>
      )}


      {!!question.hints?.length && (
        <div>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">
            Hints
          </h3>

          <ol className="space-y-2">
            {question.hints.map((hint, index) => (
              <li
                key={index}
                className="rounded-lg border border-white/10 bg-white/[0.02] p-3 text-xs leading-5 text-neutral-400"
              >
                <span className="mr-2 text-white">{index + 1}.</span>
                {hint}
              </li>
            ))}
          </ol>
        </div>
      )}


      {question.externalUrl && (
        <a
          href={question.externalUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-xs font-semibold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white"
        >
          Open coding question ↗
        </a>
      )}

    </article>
  );
};

export default DsaQuestionDetails;
