import { useParams } from "react-router-dom";
import { technologyDocs } from "../data/technologyDocs";

const TechnologyDetailPage = () => {
  const { slug } = useParams();

  const technology = technologyDocs[slug];

  if (!technology) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Technology not found
        </h1>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-5 py-10 dark:bg-gray-950 sm:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            {technology.title}
          </h1>

          {technology.category && (
            <p className="mt-2 text-sm text-indigo-600 dark:text-indigo-400">
              {technology.category}
            </p>
          )}

          <p className="mt-4 max-w-3xl leading-7 text-gray-600 dark:text-gray-400">
            {technology.description}
          </p>
        </header>

        {/* Overview */}
        {technology.overview && (
          <section className="mb-10 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Overview
            </h2>

            <p className="leading-7 text-gray-600 dark:text-gray-400">
              {technology.overview}
            </p>
          </section>
        )}

        {/* Sections */}
        {technology.sections?.length > 0 && (
          <div className="space-y-8">
            {technology.sections.map((section, index) => (
              <section
                key={section.title || index}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900"
              >
                {/* Section Header */}
                <div className="border-b border-gray-200 px-6 py-5 dark:border-gray-800">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {section.title}
                  </h2>
                </div>

                <div className="space-y-5 p-6">

                  {/* Code */}
                  {section.code && (
                    <div className="overflow-hidden rounded-xl border border-gray-800 bg-gray-950">
                      {section.language && (
                        <div className="border-b border-gray-800 px-4 py-2 text-xs uppercase tracking-wider text-gray-400">
                          {section.language}
                        </div>
                      )}

                      <pre className="overflow-x-auto p-5 text-sm leading-7 text-gray-200">
                        <code>{section.code}</code>
                      </pre>
                    </div>
                  )}

                  {/* Content Array */}
                  {Array.isArray(section.content) && (
                    <ul className="space-y-3">
                      {section.content.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
                        >
                          <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-indigo-500" />

                          <span className="leading-7">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Normal Text Content */}
                  {typeof section.content === "string" && (
                    <p className="leading-7 text-gray-700 dark:text-gray-300">
                      {section.content}
                    </p>
                  )}

                </div>
              </section>
            ))}
          </div>
        )}

        {/* Empty Sections */}
        {!technology.sections?.length && (
          <p className="text-gray-500 dark:text-gray-400">
            No detailed documentation available yet.
          </p>
        )}

      </div>
    </main>
  );
};

export default TechnologyDetailPage;
