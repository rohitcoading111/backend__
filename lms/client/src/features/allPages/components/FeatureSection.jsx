
export default function FeatureSection({ feature, index }) {
  const imageOnLeft = index % 2 === 0;

  return (
    <article className="learnhub-about-feature-row grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div className={imageOnLeft ? "lg:order-1" : "lg:order-2"}>
        <div className="learnhub-about-feature overflow-hidden rounded-2xl border p-2 transition duration-300">
          <img
            src={feature.image}
            alt={feature.alt}
            loading="lazy"
            decoding="async"
            className="h-auto w-full rounded-xl object-contain"
          />

          <div className="flex justify-between px-3 py-3">
            <span className="text-xs text-slate-400">
              LEARNHUB PLATFORM
            </span>
            <span className="text-xs font-bold text-cyan-400">
              FEATURE {feature.number}
            </span>
          </div>
        </div>
      </div>

      <div className={imageOnLeft ? "lg:order-2" : "lg:order-1"}>
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-sm font-bold text-cyan-300">
            {feature.number}
          </span>

          <span className="text-xs font-bold tracking-widest text-cyan-400">
            {feature.category}
          </span>
        </div>

        <h3 className="mt-6 text-2xl font-bold text-white sm:text-4xl">
          {feature.title}
        </h3>

        <p className="mt-5 text-sm leading-8 text-slate-400 sm:text-base">
          {feature.description}
        </p>

        <ul className="mt-7 space-y-4">
          {feature.points.map((point) => (
            <li
              key={point}
              className="flex items-start gap-3 text-sm text-slate-300"
            >
              <span className="text-cyan-400">✓</span>
              {point}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
