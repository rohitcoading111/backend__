
const socialLinks = [
  {
    name: "GitHub",
    handle: "@rohitcoading111",
    url: "https://github.com/rohitcoading111",
    icon: "github",
  },
  {
    name: "LinkedIn",
    handle: "Rohit Pandey",
    url: "https://www.linkedin.com/in/rohit-pandey-b5502a393/",
    icon: "linkedin",
  },
  {
    name: "X (Twitter)",
    handle: "@RohitPande56884",
    url: "https://x.com/RohitPande56884",
    icon: "x",
  },
];

const icons = {
  github: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
      <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.54v-2.1c-3.1.68-3.76-1.32-3.76-1.32-.5-1.3-1.24-1.65-1.24-1.65-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 .1.76 2.01 3.15 1.53.1-.72.39-1.21.71-1.49-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.11-1.45 3.04-1.15 3.04-1.15.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3 0 4.29-2.61 5.23-5.1 5.51.4.35.76 1.02.76 2.06v3.11c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
      <path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.75H4.96V9.18h2.97v9.57ZM6.44 7.87a1.72 1.72 0 1 1 0-3.44 1.72 1.72 0 0 1 0 3.44Zm12.31 10.88h-2.97V14.1c0-1.11-.02-2.54-1.55-2.54-1.55 0-1.79 1.21-1.79 2.46v4.73H9.47V9.18h2.85v1.31h.04c.4-.75 1.37-1.54 2.82-1.54 3.01 0 3.57 1.98 3.57 4.55v5.25Z" />
    </svg>
  ),
  x: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
      <path d="M18.9 2H22l-6.78 7.75L23.2 22h-6.25l-4.9-7.58L5.4 22H2.28l7.25-8.29L1.8 2h6.4l4.43 6.95L18.9 2Zm-1.1 18h1.73L7.27 3.9H5.4L17.8 20Z" />
    </svg>
  ),
};

export default function ContactSocialLinks() {
  return (
    <section className="px-5 pb-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-7 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
            Connect With Me
          </p>
          <h2 className="mt-3 text-2xl font-bold text-white">
            Find Me on Social Media
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Connect with me and explore my work, projects and updates.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit my ${social.name} profile`}
              className="contact-social-card group flex items-center gap-4 rounded-2xl border p-5 transition duration-300"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400 transition group-hover:bg-cyan-400 group-hover:text-slate-950">
                {icons[social.icon]}
              </span>

              <span>
                <span className="block font-semibold text-white">
                  {social.name}
                </span>
                <span className="mt-1 block text-sm text-slate-400">
                  {social.handle}
                </span>
              </span>

              <span className="ml-auto text-slate-500 transition group-hover:text-cyan-400">
                ↗
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
