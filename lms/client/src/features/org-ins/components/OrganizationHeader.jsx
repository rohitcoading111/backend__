import {
  BookOpen,
  LayoutDashboard,
  Building2,
} from "lucide-react";

export default function OrganizationHeader({
  organizationName,
  onPersonalDashboard,
  onOrganizationCourses,
}) {
  return (
    <header className="flex flex-col justify-between gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 lg:flex-row lg:items-center">
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

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onPersonalDashboard}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
        >
          <LayoutDashboard size={17} />
          My Personal Dashboard
        </button>

        <button
          type="button"
          onClick={onOrganizationCourses}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/85"
        >
          <BookOpen size={17} />
          Organization Courses
        </button>
      </div>
    </header>
  );
}