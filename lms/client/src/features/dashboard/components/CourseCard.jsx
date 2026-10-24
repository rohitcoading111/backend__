
import { ArrowRight, BookOpen } from "lucide-react";

function CourseCard({ enrollment, onClick }) {
  const course = enrollment?.course;

  if (!course) return null;

  const thumbnail =
    typeof course.thumbnail === "string"
      ? course.thumbnail
      : course.thumbnail?.url;

  return (
    <button
      type="button"
      onClick={() => onClick?.(course)}
      className="group flex w-full items-center gap-4 rounded-xl border border-black/[0.07] p-3 text-left transition hover:-translate-y-0.5 hover:border-black/20 hover:shadow-md"
    >
      {thumbnail ? (
        <img
          src={thumbnail}
          alt={course.title || "Course thumbnail"}
          className="h-20 w-24 shrink-0 rounded-lg object-cover"
        />
      ) : (
        <div className="flex h-20 w-24 shrink-0 items-center justify-center rounded-lg bg-[#f7f7f5]">
          <BookOpen size={25} className="text-neutral-500" />
        </div>
      )}

      <div className="min-w-0 flex-1">
        <h4 className="truncate text-sm font-semibold">
          {course.title || "Untitled course"}
        </h4>

        <p className="mt-1 line-clamp-2 text-xs leading-5 text-neutral-500">
          {course.description || "Continue learning this course."}
        </p>

        {course.category && (
          <p className="mt-1 text-[11px] text-neutral-400">
            {course.category}
          </p>
        )}

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
}

export default CourseCard;
