
export default function ContactHero() {
  return (
    <section className="learnhub-home-hero relative isolate mx-auto mt-5 max-w-7xl overflow-hidden rounded-[28px] border px-5 py-20 sm:mt-8 sm:py-28">
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-cyan-300">
          We're Here to Help
        </span>

        <h1 className="mt-8 text-4xl font-extrabold tracking-tight sm:text-6xl">
          Get in Touch With
          <span className="block bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
            LearnHub
          </span>
        </h1>

        <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
          Have questions about courses, your account or the LearnHub
          platform? Send us a message and tell us how we can help.
        </p>

        <a
          href="#contact-form"
          className="learnhub-about-action mt-9 inline-flex rounded-xl px-7 py-3.5 font-bold"
        >
          Send Us a Message
        </a>
      </div>
    </section>
  );
}
