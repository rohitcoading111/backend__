
import { useEffect, useState } from "react";
import { ArrowRight, BookOpen } from "lucide-react";
import { getMyEnrollments } from "../../enrollments/services/enrollmentService.js";
import CourseCard from "./CourseCard.jsx";

function MyCourses({ onCourseClick, onBrowseCourses,onEnrollmentsLoaded }) {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const fetchEnrollments = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getMyEnrollments();

        if (!response?.success) {
          throw new Error(
            response?.message || "Failed to load enrolled courses."
          );
        }

        const fetchedEnrollments = response?.data?.enrollments;

        if (!Array.isArray(fetchedEnrollments)) {
          throw new Error("Invalid enrollments response.");
        }

       if (!cancelled) {
  setEnrollments(fetchedEnrollments);
  onEnrollmentsLoaded?.(fetchedEnrollments);
}
      } catch (error) {
        console.error("Fetch enrollments error:", error);

        if (!cancelled) {
          setError(
            error?.response?.data?.message ||
              error?.message ||
              "Unable to load your courses."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchEnrollments();

    return () => {
      cancelled = true;
    };
  }, []);

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
              onClick={() => window.location.reload()}
              className="mt-2 font-semibold underline"
            >
              Retry
            </button>
          </div>
        ) : enrollments.length === 0 ? (
          <div className="rounded-xl border border-dashed border-black/15 p-7 text-center">
            <BookOpen
              size={30}
              className="mx-auto text-neutral-400"
            />
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
                onClick={onCourseClick}
              />
            ))}
          </div>
        )}
      </div>

      {enrollments.length > 0 && !loading && !error && (
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
