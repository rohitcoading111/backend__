import { technologyCategories } from "../data/technologies";
import { useNavigate } from "react-router-dom";
import { getAccent } from "./accentColors";

const TechLibraryPage = () => {
  const totalTechnologies = technologyCategories.reduce(
    (total, category) => total + category.technologies.length,
    0,
  );

  const navigate = useNavigate();

  return (
    <main className="relative min-h-screen overflow-hidden bg-black px-5 py-12 text-white sm:px-10">
      {/* Background white glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-white/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <header className="mb-14 text-center">
          <span className="mb-4 inline-block rounded-full border border-white/30 bg-white/5 px-4 py-1 text-sm font-medium text-white shadow-[0_0_20px_rgba(255,255,255,0.25)]">
            LearnHub Developer Library
          </span>

          <h1 className="mb-4 text-3xl font-bold text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.45)] sm:text-5xl">
            Technology Library
          </h1>

          <p className="mx-auto max-w-3xl text-zinc-400">
            Explore the technologies, libraries and tools used in modern
            development.
          </p>

          <p className="mt-5 text-sm text-zinc-500">
            {totalTechnologies} technologies across{" "}
            {technologyCategories.length} categories
          </p>
        </header>

        {/* Categories */}
        {technologyCategories.map((category) => (
          <section key={category.name} className="mb-14">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white">{category.name}</h2>
              <div className="mt-3 h-1 w-16 rounded-full bg-white shadow-[0_0_14px_rgba(255,255,255,0.8)]" />
            </div>

            {/* Technology Cards */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {category.technologies.map((tech) => {
                const accent = getAccent(tech.slug);

                return (
                  <article
                    key={tech.slug}
                    className="group flex flex-col rounded-2xl border border-zinc-800 bg-zinc-950 p-5 transition duration-300 hover:-translate-y-1 hover:border-white/40 hover:shadow-[0_0_30px_rgba(255,255,255,0.18)]"
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900 text-2xl transition duration-300 group-hover:shadow-[0_0_18px_rgba(255,255,255,0.35)]">
                      {tech.icon}
                    </div>

                    <h3 className="mb-2 text-lg font-semibold text-white">
                      {tech.name}
                    </h3>

                    <p className="mb-5 flex-1 text-sm leading-6 text-zinc-400">
                      {tech.description}
                    </p>

                    <button
                      type="button"
                      onClick={() => navigate(`/technologies/${tech.slug}`)}
                      className={`w-full rounded-xl px-4 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-white ${accent.btn}`}
                    >
                      Explore →
                    </button>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
};

export default TechLibraryPage;