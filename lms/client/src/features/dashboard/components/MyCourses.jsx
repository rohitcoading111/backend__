import { ArrowRight, BookOpen } from "lucide-react";
import CourseCard from "./CourseCard.jsx";

function MyCourses({
  enrollments = [],
  loading = false,
  error = "",
  onRetry,
  onCourseClick,
  onBrowseCourses,
}) {
  return (
    <article
      id="my-courses"
      className="overflow-hidden rounded-2xl border border-black/[0.07] bg-white"
    >
      <div className="flex items-center justify-between border-b border-black/[0.06] px-5 py-5 sm:px-7">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
            Your classroom
          </p>
          <h3 className="mt-2 text-lg font-semibold tracking-tight">
            Continue learning
          </h3>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f7f7f5]">
          <BookOpen size={19} />
        </div>
      </div>

      <div className="p-5 sm:p-7">
        {loading ? (
          <p className="py-8 text-center text-sm text-neutral-500">
            Loading your courses...
          </p>
        ) : error ? (
          <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600">
            <p>{error}</p>
            <button
              type="button"
              onClick={onRetry}
              className="mt-2 font-semibold underline"
            >
              Retry
            </button>
          </div>
        ) : enrollments.length === 0 ? (
          <div className="rounded-xl border border-dashed border-black/15 p-7 text-center">
            <BookOpen size={30} className="mx-auto text-neutral-400" />
            <h4 className="mt-3 text-sm font-semibold">
              No courses purchased yet
            </h4>
            <p className="mt-1 text-xs text-neutral-500">
              Explore our courses to start learning.
            </p>
            <button
              type="button"
              onClick={onBrowseCourses}
              className="mt-4 rounded-xl bg-black px-4 py-2.5 text-sm text-white hover:bg-neutral-800"
            >
              Browse Courses
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {enrollments.map((enrollment) => (
              <CourseCard
                key={enrollment._id}
                enrollment={enrollment}
                completedLessons={enrollment.completedLessons}
                totalLessons={enrollment.totalLessons}
                progress={enrollment.progress}
                onClick={onCourseClick}
              />
            ))}
          </div>
        )}
      </div>

      {!loading && !error && enrollments.length > 0 && (
        <div className="border-t border-black/[0.06] px-5 py-4 sm:px-7">
          <button
            type="button"
            onClick={onBrowseCourses}
            className="flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-black"
          >
            Explore more courses
            <ArrowRight size={15} />
          </button>
        </div>
      )}
    </article>
  );
}

export default MyCourses;
