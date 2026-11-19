
import { useNavigate } from "react-router-dom";

import {
  BookOpen,
  LayoutDashboard,
  Building2,
  Sparkles,
} from "lucide-react";

export default function OrganizationHeader({
  organizationName,
  onPersonalDashboard,
  onOrganizationCourses,
}) {
  const navigate = useNavigate();

  const handleAskAI = () => {
    navigate("/ai-assistant");
  };

  return (
    <header className="flex flex-col justify-between gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 lg:flex-row lg:items-center">

      {/* Organization Information */}
      <div>
        <div className="mb-4 flex items-center gap-2 text-sm text-white/50">
          <Building2 size={16} />
          Organization workspace
        </div>

        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {organizationName || "Organization"}
        </h1>

        <p className="mt-2 text-sm text-white/40">
          Explore your organization's courses and learning workspace.
        </p>
      </div>

      {/* Header Actions */}
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">

        {/* Personal Dashboard */}
        <button
          type="button"
          onClick={onPersonalDashboard}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
        >
          <LayoutDashboard size={17} />
          My Personal Dashboard
        </button>

        {/* Organization Courses */}
        <button
          type="button"
          onClick={onOrganizationCourses}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/85"
        >
          <BookOpen size={17} />
          Organization Courses
        </button>

        {/* Ask LearnHub AI */}
        <button
          type="button"
          onClick={handleAskAI}
          className="group inline-flex items-center justify-center gap-2 rounded-full border border-violet-400/30 bg-gradient-to-r from-violet-600/20 to-indigo-600/20 px-5 py-3 text-sm font-semibold text-violet-200 shadow-lg shadow-violet-950/20 transition duration-300 hover:-translate-y-0.5 hover:border-violet-400/60 hover:from-violet-600/30 hover:to-indigo-600/30 hover:text-white"
        >
          <Sparkles
            size={17}
            className="text-violet-300 transition group-hover:rotate-12"
          />
          Ask LearnHub AI
        </button>

      </div>
    </header>
  );
}
