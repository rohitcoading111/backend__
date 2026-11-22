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

          <p className="mt-4 max-w-3xl text-gray-600 dark:text-gray-400">
            {technology.description}
          </p>
        </header>

        {/* Overview */}
        <section className="mb-10 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
            Overview
          </h2>

          <p className="leading-7 text-gray-600 dark:text-gray-400">
            {technology.overview}
          </p>
        </section>

      </div>
    </main>
  );
};

export default TechnologyDetailPage;