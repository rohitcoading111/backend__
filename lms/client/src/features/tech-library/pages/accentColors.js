import { technologyCategories } from "../data/technologies";

// Tailwind ko full class names chahiye, isliye har class yahan static likhi hai.
const palette = [
  {
    btn: "bg-rose-400 text-black hover:bg-rose-300 hover:shadow-[0_0_22px_rgba(251,113,133,0.75)]",
    copy: "border-rose-400/60 text-rose-300 hover:bg-rose-400/10 hover:shadow-[0_0_14px_rgba(251,113,133,0.55)]",
  },
  {
    btn: "bg-orange-400 text-black hover:bg-orange-300 hover:shadow-[0_0_22px_rgba(251,146,60,0.75)]",
    copy: "border-orange-400/60 text-orange-300 hover:bg-orange-400/10 hover:shadow-[0_0_14px_rgba(251,146,60,0.55)]",
  },
  {
    btn: "bg-amber-400 text-black hover:bg-amber-300 hover:shadow-[0_0_22px_rgba(251,191,36,0.75)]",
    copy: "border-amber-400/60 text-amber-300 hover:bg-amber-400/10 hover:shadow-[0_0_14px_rgba(251,191,36,0.55)]",
  },
  {
    btn: "bg-lime-400 text-black hover:bg-lime-300 hover:shadow-[0_0_22px_rgba(163,230,53,0.75)]",
    copy: "border-lime-400/60 text-lime-300 hover:bg-lime-400/10 hover:shadow-[0_0_14px_rgba(163,230,53,0.55)]",
  },
  {
    btn: "bg-emerald-400 text-black hover:bg-emerald-300 hover:shadow-[0_0_22px_rgba(52,211,153,0.75)]",
    copy: "border-emerald-400/60 text-emerald-300 hover:bg-emerald-400/10 hover:shadow-[0_0_14px_rgba(52,211,153,0.55)]",
  },
  {
    btn: "bg-teal-400 text-black hover:bg-teal-300 hover:shadow-[0_0_22px_rgba(45,212,191,0.75)]",
    copy: "border-teal-400/60 text-teal-300 hover:bg-teal-400/10 hover:shadow-[0_0_14px_rgba(45,212,191,0.55)]",
  },
  {
    btn: "bg-cyan-400 text-black hover:bg-cyan-300 hover:shadow-[0_0_22px_rgba(34,211,238,0.75)]",
    copy: "border-cyan-400/60 text-cyan-300 hover:bg-cyan-400/10 hover:shadow-[0_0_14px_rgba(34,211,238,0.55)]",
  },
  {
    btn: "bg-sky-400 text-black hover:bg-sky-300 hover:shadow-[0_0_22px_rgba(56,189,248,0.75)]",
    copy: "border-sky-400/60 text-sky-300 hover:bg-sky-400/10 hover:shadow-[0_0_14px_rgba(56,189,248,0.55)]",
  },
  {
    btn: "bg-violet-400 text-black hover:bg-violet-300 hover:shadow-[0_0_22px_rgba(167,139,250,0.75)]",
    copy: "border-violet-400/60 text-violet-300 hover:bg-violet-400/10 hover:shadow-[0_0_14px_rgba(167,139,250,0.55)]",
  },
  {
    btn: "bg-fuchsia-400 text-black hover:bg-fuchsia-300 hover:shadow-[0_0_22px_rgba(232,121,249,0.75)]",
    copy: "border-fuchsia-400/60 text-fuchsia-300 hover:bg-fuchsia-400/10 hover:shadow-[0_0_14px_rgba(232,121,249,0.55)]",
  },
  {
    btn: "bg-pink-400 text-black hover:bg-pink-300 hover:shadow-[0_0_22px_rgba(244,114,182,0.75)]",
    copy: "border-pink-400/60 text-pink-300 hover:bg-pink-400/10 hover:shadow-[0_0_14px_rgba(244,114,182,0.55)]",
  },
  {
    btn: "bg-indigo-400 text-black hover:bg-indigo-300 hover:shadow-[0_0_22px_rgba(129,140,248,0.75)]",
    copy: "border-indigo-400/60 text-indigo-300 hover:bg-indigo-400/10 hover:shadow-[0_0_14px_rgba(129,140,248,0.55)]",
  },
];

// Saari technologies ki flat list -> har ek ko apna alag color (order ke hisaab se)
const slugs = technologyCategories.flatMap((c) =>
  c.technologies.map((t) => t.slug),
);

export const getAccent = (slug) => {
  const index = Math.max(slugs.indexOf(slug), 0);
  return palette[index % palette.length];
};