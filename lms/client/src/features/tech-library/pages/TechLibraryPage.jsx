import { technologyCategories } from "../data/technologies";

const TechLibraryPage = () => {
  const totalTechnologies = technologyCategories.reduce(
    (total, category) => total + category.technologies.length,
    0
  );

  return (
    <main className="min-h-screen bg-gray-50 px-5 py-12 dark:bg-gray-950 sm:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <header className="mb-14 text-center">
          <span className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700 dark:bg-blue-950 dark:text-blue-300">
            LearnHub Developer Library
          </span>

          <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white sm:text-5xl">
            Technology Library
          </h1>

          <p className="mx-auto max-w-3xl text-gray-600 dark:text-gray-400">
            Explore the technologies, libraries and tools used in modern development.
          </p>

          <p className="mt-5 text-sm text-gray-500 dark:text-gray-400">
            {totalTechnologies} technologies across {technologyCategories.length} categories
          </p>
        </header>

        {/* Categories */}
        {technologyCategories.map((category) => (
          <section key={category.name} className="mb-14">

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {category.name}
              </h2>

              <div className="mt-3 h-1 w-16 rounded-full bg-blue-600" />
            </div>

            {/* Technology Cards */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

              {category.technologies.map((tech) => (
                <article
                  key={tech.slug}
                  className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-blue-400 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-2xl dark:bg-gray-800">
                    {tech.icon}
                  </div>

                  <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                    {tech.name}
                  </h3>

                  <p className="mb-5 flex-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
                    {tech.description}
                  </p>

                  <button
                    type="button"
                    className="w-full rounded-xl bg-gray-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-600 dark:bg-white dark:text-gray-900 dark:hover:bg-blue-400"
                  >
                    Explore →
                  </button>
                </article>
              ))}

            </div>
          </section>
        ))}

      </div>
    </main>
  );
};

export default TechLibraryPage;
