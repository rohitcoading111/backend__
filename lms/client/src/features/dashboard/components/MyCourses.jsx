
import {
  BookOpen,
  ArrowUpRight,
  RefreshCw,
  Search,
  GraduationCap,
} from "lucide-react";

import CourseCard from "./CourseCard.jsx";

function MyCourses({
  enrollments = [],
  loading = false,
  error = null,
  onRetry,
  onCourseClick,
  onBrowseCourses,
}) {
  // Loading State
  if (loading) {
    return (
      <section className="space-y-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111111]"
            >
              <div className="aspect-video animate-pulse bg-white/[0.06]" />

              <div className="space-y-4 p-5">
                <div className="h-4 w-3/4 animate-pulse rounded bg-white/10" />
                <div className="h-3 w-full animate-pulse rounded bg-white/[0.06]" />
                <div className="h-3 w-1/2 animate-pulse rounded bg-white/[0.06]" />
                <div className="h-10 w-full animate-pulse rounded-xl bg-white/[0.06]" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Error State
  if (error) {
    return (
      <section className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#111111] px-5 py-12 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05]">
          <RefreshCw size={23} className="text-neutral-400" />
        </div>

        <h3 className="mt-5 text-lg font-semibold text-white">
          Unable to load courses
        </h3>

        <p className="mt-2 max-w-sm text-sm leading-6 text-neutral-400">
          {typeof error === "string"
            ? error
            : error?.message || "Something went wrong while fetching your courses."}
        </p>

        <button
          type="button"
          onClick={onRetry}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-neutral-200 active:scale-95"
        >
          <RefreshCw size={15} />
          Try again
        </button>
      </section>
    );
  }

  // Empty State
  if (!enrollments || enrollments.length === 0) {
    return (
      <section className="flex min-h-[360px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-[#111111] px-5 py-12 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05]">
          <GraduationCap size={29} className="text-neutral-300" />
        </div>

        <h3 className="mt-5 text-xl font-semibold text-white">
          No courses purchased yet
        </h3>

        <p className="mt-2 max-w-sm text-sm leading-6 text-neutral-400">
          Your learning journey starts here. Explore our courses
          and find something new to learn.
        </p>

        <button
          type="button"
          onClick={onBrowseCourses}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-neutral-200 active:scale-95"
        >
          <Search size={16} />
          Browse courses
          <ArrowUpRight size={15} />
        </button>
      </section>
    );
  }

  // Courses List
  return (
    <section className="space-y-7">

      {/* Section Header */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05]">
            <BookOpen size={19} className="text-neutral-300" />
          </div>

          <div>
            <h2 className="text-base font-semibold text-white">
              Your learning library
            </h2>

            <p className="mt-1 text-xs text-neutral-500">
              {enrollments.length} enrolled{" "}
              {enrollments.length === 1 ? "course" : "courses"}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onBrowseCourses}
          className="inline-flex w-fit items-center gap-2 text-sm font-medium text-neutral-400 transition hover:text-white"
        >
          Explore more courses
          <ArrowUpRight size={16} />
        </button>
      </div>

      {/* Course Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {enrollments.map((enrollment) => (
          <CourseCard
            key={enrollment._id}
            enrollment={enrollment}
            onClick={onCourseClick}
          />
        ))}
      </div>

      {/* Bottom Action */}
      <div className="flex justify-center border-t border-white/[0.08] pt-6">
        <button
          type="button"
          onClick={onBrowseCourses}
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-medium text-neutral-300 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white active:scale-95"
        >
          Explore all courses
          <ArrowUpRight size={16} />
        </button>
      </div>
    </section>
  );
}

export default MyCourses;
