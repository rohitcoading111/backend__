
import {
  ArrowRight,
  BookOpen,
} from "lucide-react";

function MyCourses({
  enrollments = [],
  loading = false,
  error = "",
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
            My Courses
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
          <p className="rounded-xl bg-red-50 p-4 text-sm text-red-600">
            {error}
          </p>
        ) : enrollments.length === 0 ? (
          <div className="rounded-xl border border-dashed border-black/15 p-7 text-center">
            <BookOpen
              size={30}
              className="mx-auto text-neutral-400"
            />

            <h4 className="mt-3 text-sm font-semibold">
              No courses yet
            </h4>

            <p className="mt-1 text-xs text-neutral-500">
              Your purchased courses will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {enrollments.map((enrollment) => {
              const course = enrollment.course;

              if (!course?._id) return null;

              return (
                <button
                  key={enrollment._id}
                  type="button"
                  onClick={() => {
                    // Course details route hum next step mein connect karenge.
                    window.location.href = `/courses/${course._id}`;
                  }}
                  className="group flex w-full items-center gap-4 rounded-xl border border-black/[0.07] p-3 text-left transition hover:border-black/20 hover:shadow-md"
                >
                  {course.thumbnail?.url ? (
                    <img
                      src={course.thumbnail.url}
                      alt={course.title}
                      className="h-20 w-24 shrink-0 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="flex h-20 w-24 shrink-0 items-center justify-center rounded-lg bg-[#f7f7f5]">
                      <BookOpen size={25} />
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <h4 className="truncate text-sm font-semibold">
                      {course.title}
                    </h4>

                    <p className="mt-1 line-clamp-2 text-xs leading-5 text-neutral-500">
                      {course.description ||
                        "Continue learning this course."}
                    </p>

                    <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium">
                      Continue learning
                      <ArrowRight
                        size={14}
                        className="transition group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </article>
  );
}

export default MyCourses;
