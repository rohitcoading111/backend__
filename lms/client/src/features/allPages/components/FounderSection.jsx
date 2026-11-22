import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

/* =========================================================
   DATA  (saare links yahin se badalna)
   Jis link ka url "" hoga wo page par dikhega hi nahi.
   ========================================================= */
const SITE_URL = "https://learnhubcloud.in";

const FOUNDER = {
  name: "Rohit Pandey",
  role: "Founder, CEO & Developer",
  // Photo ko public/ folder mein rakho: public/rohit-pandey.jpg
  photo: "/rohit-pandey.jpg",
};

// LearnHub (company) links
const companyLinks = [
  {
    id: "linkedin",
    label: "LinkedIn",
    url: "https://www.linkedin.com/company/144154141/",
  },
  {
    id: "instagram",
    label: "Instagram",
    url: "https://www.instagram.com/learnhuncloud/",
  },
  { id: "website", label: "Website", url: SITE_URL },
];

// Rohit Pandey (personal) links -> apne URLs yahan daal do
const founderLinks = [
  {
    id: "github",
    label: "GitHub",
    url: "https://github.com/rohitcoading111",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/rohit-pandey-b5502a393/",
  },
  {
    id: "instagram",
    label: "Instagram",
    url: "https://www.instagram.com/rohit_pandey149/",
  },
];

// Search engines ke liye structured data (Person + Organization)
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "LearnHub",
      url: SITE_URL,
      founder: { "@id": `${SITE_URL}/#founder` },
      sameAs: companyLinks.map((l) => l.url).filter(Boolean),
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#founder`,
      name: FOUNDER.name,
      jobTitle: FOUNDER.role,
      worksFor: { "@id": `${SITE_URL}/#organization` },
      image: `${SITE_URL}${FOUNDER.photo}`,
      sameAs: founderLinks.map((l) => l.url).filter(Boolean),
    },
  ],
};

/* =========================================================
   SOCIAL LINKS COMPONENT
   ========================================================= */
const icons = {
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
    </svg>
  ),
  website: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <ellipse cx="12" cy="12" rx="4" ry="10" />
      <path d="M2 12h20" />
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  ),
};

// Tailwind ko full class names chahiye, isliye static likhe hain
const hoverStyles = {
  linkedin:
    "hover:border-blue-400/50 hover:bg-blue-500/10 hover:shadow-[0_0_22px_rgba(96,165,250,0.35)]",
  instagram:
    "hover:border-pink-400/50 hover:bg-pink-500/10 hover:shadow-[0_0_22px_rgba(244,114,182,0.35)]",
  website:
    "hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:shadow-[0_0_22px_rgba(34,211,238,0.35)]",
  github:
    "hover:border-white/50 hover:bg-white/10 hover:shadow-[0_0_22px_rgba(255,255,255,0.3)]",
};

// me=true -> rel="me" (personal profiles ke liye SEO signal)
const SocialLinks = ({ links, owner, me = false }) => {
  const visible = links.filter((link) => link.url);

  if (visible.length === 0) return null;

  return (
    <ul className="flex flex-wrap gap-3" aria-label={`${owner} social links`}>
      {visible.map((link) => (
        <li key={`${owner}-${link.id}`}>
          <a
            href={link.url}
            target="_blank"
            rel={me ? "me noopener noreferrer" : "noopener noreferrer"}
            aria-label={`${owner} on ${link.label}`}
            title={`${owner} on ${link.label}`}
            className={`inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white ${hoverStyles[link.id]}`}
          >
            {icons[link.id]}
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
};

/* =========================================================
   FOUNDER SECTION
   ========================================================= */
export default function FounderSection() {
  const [photoFailed, setPhotoFailed] = useState(false);

  return (
    <section
      id="founder"
      aria-labelledby="founder-heading"
      className="relative scroll-mt-24 overflow-hidden border-y border-white/10 bg-black px-5 py-20 sm:py-24"
    >
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      {/* Background glow */}
      <div className="pointer-events-none absolute -top-24 left-1/4 h-[360px] w-[560px] -translate-x-1/2 rounded-full bg-white/10 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[300px] w-[420px] rounded-full bg-cyan-400/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Founder Profile */}
          <article className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-white/5 blur-2xl" />

            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 p-8 shadow-[0_0_40px_rgba(255,255,255,0.08)] sm:p-10">
              <p className="text-sm font-semibold text-cyan-400">
                Meet the Founder
              </p>

              <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center">
                {/* Photo */}
                <div className="relative h-28 w-28 shrink-0">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-white/60 to-cyan-400/40 opacity-70 blur-md" />

                  {photoFailed ? (
                    <div
                      role="img"
                      aria-label={`${FOUNDER.name}, Founder of LearnHub`}
                      className="relative flex h-28 w-28 items-center justify-center rounded-full border border-white/20 bg-zinc-900 text-3xl font-bold text-white"
                    >
                      RP
                    </div>
                  ) : (
                    <img
                      src={FOUNDER.photo}
                      alt={`${FOUNDER.name}, Founder, CEO and Developer of LearnHub`}
                      width={112}
                      height={112}
                      loading="lazy"
                      decoding="async"
                      onError={() => setPhotoFailed(true)}
                      className="relative h-28 w-28 rounded-full border border-white/20 object-cover"
                    />
                  )}
                </div>

                <div>
                  <h2
                    id="founder-heading"
                    className="text-3xl font-bold text-white drop-shadow-[0_0_22px_rgba(255,255,255,0.35)] sm:text-4xl"
                  >
                    {FOUNDER.name}
                  </h2>
                  <p className="mt-2 text-lg font-medium text-cyan-300">
                    {FOUNDER.role}
                  </p>
                </div>
              </div>

              <p className="mt-8 leading-8 text-zinc-400">
                <strong className="font-semibold text-zinc-200">
                  {FOUNDER.name}
                </strong>{" "}
                is the founder and developer behind LearnHub, an online
                learning platform built to be organized, accessible and
                practical. From designing the platform to developing its core
                features, his goal is to bring students, instructors and
                technology together in one modern learning experience.
              </p>

              {/* Personal links (url khali ho to hide) */}
              {founderLinks.some((l) => l.url) && (
                <div className="mt-8">
                  <h3 className="mb-3 text-sm font-semibold text-zinc-300">
                    Connect with {FOUNDER.name}
                  </h3>
                  <SocialLinks links={founderLinks} owner={FOUNDER.name} me />
                </div>
              )}
            </div>
          </article>

          {/* Brand Vision */}
          <div>
            <p className="text-sm font-semibold text-cyan-400">Our Vision</p>

            <h3 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-5xl">
              Learn. Build.
              <span className="block bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
                Grow.
              </span>
            </h3>

            <p className="mt-6 max-w-xl leading-8 text-zinc-400">
              LearnHub is an evolving learning platform focused on structured
              education, practical skills and modern technology. We aim to
              build tools that make learning more organized and meaningful.
            </p>

            {/* Company links */}
            <div className="mt-8">
  <h3 className="mb-3 text-sm font-semibold text-zinc-300">
    Follow LearnHub on Social Media
  </h3>

  <p className="mb-4 text-sm leading-relaxed text-zinc-400">
    Connect with LearnHub through our official social media channels
    for the latest updates, learning resources, new features, and
    announcements.
  </p>

  <SocialLinks links={companyLinks} owner="LearnHub" />
</div>

            <Link
              to="/about"
              className="mt-8 inline-flex items-center gap-2 font-semibold text-white transition hover:text-cyan-300 hover:drop-shadow-[0_0_12px_rgba(34,211,238,0.7)]"
            >
              Discover LearnHub
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}