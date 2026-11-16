const DsaQuestionDetails = ({ question, loading, error }) => {

  // Loading state
  if (loading) {
    return <p className="text-slate-400">Loading question...</p>;
  }

  // Error state
  if (error) {
    return <p className="text-red-400">{error}</p>;
  }

  // Question available nahi hai
  if (!question) {
    return <p className="text-slate-400">Question not found.</p>;
  }

  return (
    <div className="space-y-6 rounded-2xl border border-slate-800 bg-slate-900 p-6 text-white">

      <div>
        <h1 className="text-2xl font-bold">{question.title}</h1>
        <p className="mt-2 text-sm text-indigo-400">
          {question.difficulty} · {question.platform}
        </p>
      </div>

      <section>
        <h2 className="mb-2 font-semibold">Description</h2>
        <p className="whitespace-pre-wrap text-sm leading-7 text-slate-300">
          {question.description}
        </p>
      </section>

      {/* Examples display */}
      <section>
        <h2 className="mb-3 font-semibold">Examples</h2>

        {question.examples?.map((example, index) => (
          <div key={index} className="mb-4 rounded-xl bg-slate-800 p-4">
            <p className="text-sm text-slate-400">Example {index + 1}</p>
            <p className="mt-2 text-sm">Input: {example.input}</p>
            <p className="mt-1 text-sm">Output: {example.output}</p>

            {example.explanation && (
              <p className="mt-2 text-sm text-slate-400">
                {example.explanation}
              </p>
            )}
          </div>
        ))}
      </section>

      {/* Constraints */}
      <section>
        <h2 className="mb-2 font-semibold">Constraints</h2>
        <p className="whitespace-pre-wrap text-sm text-slate-300">
          {question.constraints || "No constraints provided."}
        </p>
      </section>

      {/* Hints */}
      <section>
        <h2 className="mb-2 font-semibold">Hints</h2>

        <ul className="list-inside list-disc space-y-2 text-sm text-slate-300">
          {question.hints?.map((hint, index) => (
            <li key={index}>{hint}</li>
          ))}
        </ul>
      </section>

      {/* External platform link */}
      {question.externalUrl && (
        <a
          href={question.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-lg bg-indigo-600 px-5 py-3 text-sm text-white hover:bg-indigo-500"
        >
          Solve on {question.platform}
        </a>
      )}

    </div>
  );
};

export default DsaQuestionDetails;
