import { useState } from "react";
import {
  GraduationCap,
  Copy,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

function InstructorIdCard({ user }) {
  const [isCopied, setIsCopied] = useState(false);

  const instructorCode = user?.instructorCode;

  const handleCopy = async () => {
    if (!instructorCode) return;

    try {
      await navigator.clipboard.writeText(instructorCode);
      setIsCopied(true);

      window.setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch {
      console.error("Unable to copy Instructor ID");
    }
  };

  return (
    <section className="relative overflow-hidden rounded-2xl border border-indigo-200/70 bg-gradient-to-br from-indigo-50 via-white to-violet-50 p-6 shadow-sm">

      <div className="pointer-events-none absolute -right-12 -top-16 h-44 w-44 rounded-full bg-indigo-200/30 blur-3xl" />

      <div className="relative flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/20">
            <GraduationCap size={24} />
          </div>

          <div>
            <h2 className="font-bold text-slate-900">
              My Instructor ID
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Your permanent instructor identity
            </p>
          </div>
        </div>

        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-[10px] font-bold text-emerald-700">
          <ShieldCheck size={13} />
          Independent
        </span>
      </div>

      <div className="relative mt-7 rounded-xl border border-indigo-100 bg-white/90 p-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
          Permanent Instructor Code
        </p>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <p className="break-all text-xl font-bold tracking-wide text-indigo-700 sm:text-2xl">
            {instructorCode || "ID not available"}
          </p>

          <button
            type="button"
            onClick={handleCopy}
            disabled={!instructorCode}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-700 transition hover:bg-indigo-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isCopied ? (
              <>
                <CheckCircle2 size={15} />
                Copied
              </>
            ) : (
              <>
                <Copy size={15} />
                Copy ID
              </>
            )}
          </button>
        </div>
      </div>

      <p className="relative mt-4 text-xs leading-5 text-slate-500">
        Share this ID with an Organization Admin. They can use it
        to find your instructor profile and send you a hiring offer.
      </p>
    </section>
  );
}

export default InstructorIdCard;