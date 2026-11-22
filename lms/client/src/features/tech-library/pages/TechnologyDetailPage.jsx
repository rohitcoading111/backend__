import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { technologyDocs } from "../data/technologyDocs";
import { getAccent } from "./accentColors";

/* ---------- Copy helper ---------- */
const copyText = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  }
};

const CopyButton = ({ text, accentClass, className = "" }) => {
  const [state, setState] = useState("idle"); // idle | copied | failed

  const handleCopy = async () => {
    const ok = await copyText(text);
    setState(ok ? "copied" : "failed");
    setTimeout(() => setState("idle"), 1800);
  };

  const stateClass =
    state === "copied"
      ? "border-emerald-400/60 bg-emerald-400/10 text-emerald-300 shadow-[0_0_14px_rgba(52,211,153,0.5)]"
      : state === "failed"
        ? "border-red-400/60 bg-red-400/10 text-red-300"
        : `bg-zinc-900 ${accentClass}`;

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label="Copy to clipboard"
      className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition ${stateClass} ${className}`}
    >
      {state === "copied" ? (
        <>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
          Copied
        </>
      ) : state === "failed" ? (
        "Failed"
      ) : (
        <>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          Copy
        </>
      )}
    </button>
  );
};

/* ---------- Code block ---------- */
const CodeBlock = ({ code, language, accentClass }) => (
  <div className="overflow-hidden rounded-xl border border-zinc-800 bg-black shadow-[0_0_25px_rgba(255,255,255,0.06)] transition hover:shadow-[0_0_35px_rgba(255,255,255,0.14)]">
    <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-950 px-4 py-2">
      <span className="text-xs uppercase tracking-wider text-zinc-500">
        {language || "code"}
      </span>
      <CopyButton text={code} accentClass={accentClass} />
    </div>

    <pre className="overflow-x-auto p-5 text-sm leading-7 text-zinc-200">
      <code>{code}</code>
    </pre>
  </div>
);

/* ---------- Terminal commands ---------- */
// ["npm install x"] ya [{ label: "Install", command: "npm install x" }]
const CommandList = ({ commands, accentClass }) => (
  <div className="space-y-3">
    {commands.map((item, index) => {
      const command = typeof item === "string" ? item : item.command;
      const label = typeof item === "string" ? null : item.label;

      return (
        <div key={index}>
          {label && <p className="mb-1.5 text-sm text-zinc-400">{label}</p>}

          <div className="flex items-center justify-between gap-3 rounded-xl border border-zinc-800 bg-black px-4 py-3 shadow-[0_0_18px_rgba(255,255,255,0.05)] transition hover:border-white/30 hover:shadow-[0_0_26px_rgba(255,255,255,0.15)]">
            <code className="overflow-x-auto whitespace-nowrap font-mono text-sm text-emerald-400">
              <span className="select-none text-zinc-600">$ </span>
              {command}
            </code>
            <CopyButton
              text={command}
              accentClass={accentClass}
              className="shrink-0"
            />
          </div>
        </div>
      );
    })}
  </div>
);

/* ---------- Page ---------- */
const TechnologyDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const technology = technologyDocs[slug];
  const accent = getAccent(slug);

  if (!technology) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-black">
        <h1 className="text-2xl font-bold text-white">Technology not found</h1>
        <button
          type="button"
          onClick={() => navigate("/technologies")}
          className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition ${accent.btn}`}
        >
          Back to library
        </button>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-black px-5 py-10 text-white sm:px-10">
      {/* Background white glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[380px] w-[680px] -translate-x-1/2 rounded-full bg-white/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Back button */}
        <button
          type="button"
          onClick={() => navigate("/technologies")}
          className={`mb-8 rounded-xl px-4 py-2 text-sm font-semibold transition ${accent.btn}`}
        >
          ← Back
        </button>

        {/* Header */}
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.45)]">
            {technology.title}
          </h1>

          {technology.category && (
            <p className="mt-2 text-sm text-zinc-400">{technology.category}</p>
          )}

          <p className="mt-4 max-w-3xl leading-7 text-zinc-400">
            {technology.description}
          </p>
        </header>

        {/* Overview */}
        {technology.overview && (
          <section className="mb-10 rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-[0_0_30px_rgba(255,255,255,0.07)]">
            <h2 className="mb-4 text-2xl font-bold text-white">Overview</h2>
            <p className="leading-7 text-zinc-400">{technology.overview}</p>
          </section>
        )}

        {/* Sections */}
        {technology.sections?.length > 0 && (
          <div className="space-y-8">
            {technology.sections.map((section, index) => (
              <section
                key={section.title || index}
                className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 transition duration-300 hover:border-white/30 hover:shadow-[0_0_35px_rgba(255,255,255,0.12)]"
              >
                <div className="border-b border-zinc-800 px-6 py-5">
                  <h2 className="text-xl font-semibold text-white">
                    {section.title}
                  </h2>
                </div>

                <div className="space-y-5 p-6">
                  {/* Commands: section.commands = [...] */}
                  {Array.isArray(section.commands) &&
                    section.commands.length > 0 && (
                      <CommandList
                        commands={section.commands}
                        accentClass={accent.copy}
                      />
                    )}

                  {/* Single command: section.command = "npm i x" */}
                  {typeof section.command === "string" && (
                    <CommandList
                      commands={[section.command]}
                      accentClass={accent.copy}
                    />
                  )}

                  {/* Code */}
                  {section.code && (
                    <CodeBlock
                      code={section.code}
                      language={section.language}
                      accentClass={accent.copy}
                    />
                  )}

                  {/* Content Array */}
                  {Array.isArray(section.content) && (
                    <ul className="space-y-3">
                      {section.content.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className="flex items-start gap-3 text-zinc-300"
                        >
                          <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                          <span className="leading-7">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Normal Text Content */}
                  {typeof section.content === "string" && (
                    <p className="leading-7 text-zinc-300">{section.content}</p>
                  )}
                </div>
              </section>
            ))}
          </div>
        )}

        {/* Empty Sections */}
        {!technology.sections?.length && (
          <p className="text-zinc-500">No detailed documentation available yet.</p>
        )}
      </div>
    </main>
  );
};

export default TechnologyDetailPage;