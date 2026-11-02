import {
  BookOpen,
  RefreshCw,
  Building2,
} from "lucide-react";

import useOrgInstructor from "../hooks/useOrgInstructor.js";

import OrganizationHeader from "../components/OrganizationHeader.jsx";
import OrganizationInfo from "../components/OrganizationInfo.jsx";
import OrganizationCourseCard from "../components/OrganizationCourseCard.jsx";

function CourseSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10">
      <div className="aspect-[16/10] animate-pulse bg-white/5" />
      <div className="space-y-3 p-5">
        <div className="h-4 w-2/3 animate-pulse rounded-full bg-white/10" />
        <div className="h-3 w-full animate-pulse rounded-full bg-white/5" />
        <div className="h-10 w-full animate-pulse rounded-full bg-white/5" />
      </div>
    </div>
  );
}

export default function OrganizationOverview() {
  const {
    organization,
    courses,
    loading,
    error,
    refreshOverview,
    handlePersonalDashboard,
    handleOrganizationCourses,
  } = useOrgInstructor();

  return (
    <main className="min-h-screen bg-black px-5 py-8 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl space-y-10">

        {/* Organization header */}
        <OrganizationHeader
          organizationName={organization?.name}
          onPersonalDashboard={handlePersonalDashboard}
          onOrganizationCourses={handleOrganizationCourses}
        />

        {/* Loading */}
        {loading && (
          <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[0, 1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-36 animate-pulse rounded-2xl border border-white/10 bg-white/[0.03]"
                />
              ))}
            </div>

            <section>
              <div className="mb-6 h-7 w-48 animate-pulse rounded bg-white/10" />

              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                <CourseSkeleton />
                <CourseSkeleton />
                <CourseSkeleton />
              </div>
            </section>
          </>
        )}

        {/* Error */}
        {!loading && error && (
          <div
            role="alert"
            className="rounded-3xl border border-white/15 bg-white/[0.03] p-8 text-center"
          >
            <Building2
              size={32}
              className="mx-auto text-white/40"
            />

            <h2 className="mt-4 text-xl font-semibold">
              Unable to load organization
            </h2>

            <p className="mt-2 text-sm text-white/40">
              {error}
            </p>

            <button
              type="button"
              onClick={refreshOverview}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-white/85"
            >
              <RefreshCw size={16} />
              Try again
            </button>
          </div>
        )}

        {/* Loaded data */}
        {!loading && !error && organization && (
          <>
            <OrganizationInfo organization={organization} />

            {/* Course statistics */}
            <section className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <BookOpen size={20} className="text-white/50" />

                <p className="mt-4 text-3xl font-semibold tabular-nums">
                  {courses.length}
                </p>

                <p className="mt-1 text-sm text-white/40">
                  Total organization courses
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <BookOpen size={20} className="text-white/50" />

                <p className="mt-4 text-3xl font-semibold tabular-nums">
                  {courses.filter(
                    (course) => course.status === "PUBLISHED"
                  ).length}
                </p>

                <p className="mt-1 text-sm text-white/40">
                  Published courses
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <BookOpen size={20} className="text-white/50" />

                <p className="mt-4 text-3xl font-semibold tabular-nums">
                  {courses.filter(
                    (course) => course.status === "DRAFT"
                  ).length}
                </p>

                <p className="mt-1 text-sm text-white/40">
                  Draft courses
                </p>
              </div>
            </section>

            {/* Organization courses */}
            <section>
              <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight">
                    Organization courses
                  </h2>

                  <p className="mt-2 text-sm text-white/40">
                    Courses created by instructors in your organization.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={refreshOverview}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-sm text-white/70 transition hover:border-white/40 hover:text-white"
                >
                  <RefreshCw size={15} />
                  Refresh
                </button>
              </div>

              {courses.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-white/20 bg-white/[0.02] px-6 py-16 text-center">
                  <BookOpen
                    size={34}
                    className="mx-auto text-white/30"
                  />

                  <h3 className="mt-5 text-xl font-semibold">
                    No organization courses yet
                  </h3>

                  <p className="mt-2 text-sm text-white/40">
                    Your organization's courses will appear here.
                  </p>

                  <button
                    type="button"
                    onClick={handleOrganizationCourses}
                    className="mt-6 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-white/85"
                  >
                    Open course workspace
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {courses.map((course) => (
                    <OrganizationCourseCard
                      key={course._id}
                      course={course}
                    />
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </main>
  );
}