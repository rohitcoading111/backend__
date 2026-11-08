
export default function AboutIntro() {
  return (
    <>
      <section className="learnhub-home-hero relative isolate mx-auto mt-5 max-w-7xl overflow-hidden rounded-[28px] border px-5 py-20 sm:mt-8 sm:py-28">
        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <span className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-cyan-300">
            Discover LearnHub
          </span>

          <h1 className="mt-8 text-4xl font-extrabold leading-tight sm:text-6xl lg:text-7xl">
            About LearnHub
            <span className="block bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
              Online Learning Platform
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-slate-400 sm:text-lg">
            LearnHub connects students, instructors and organizations
            through online courses, structured lectures, live classes
            and tools for tracking learning progress.
          </p>

          <a
            href="#platform-features"
            className="mt-10 inline-flex rounded-xl bg-cyan-400 px-7 py-3.5 font-bold text-slate-950 hover:bg-cyan-300"
          >
            Explore Platform
          </a>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.02] px-5 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 md:items-center">
          <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
            Explore LearnHub's Online Learning Platform
          </h2>

          <p className="text-sm leading-8 text-slate-400 sm:text-base">
            Explore the actual platform interfaces below to understand
            how students learn, instructors manage courses and
            organizations manage their learning environment.
          </p>
        </div>
      </section>
    </>
  );
}
