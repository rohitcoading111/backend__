import { ArrowUpRight, BookOpen, Clock3 } from "lucide-react";

function CourseCard({ course, onBuy }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-black/[0.08] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative flex h-48 items-center justify-center overflow-hidden bg-[#111111] p-6 text-white">
        {course.thumbnail ? (
          <img
            src={course.thumbnail}
            alt={course.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <BookOpen size={52} strokeWidth={1} />
        )}

        <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs text-white backdrop-blur">
          {course.category || "Course"}
        </span>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold tracking-tight">
          {course.title}
        </h3>

        <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-neutral-500">
          {course.description || "Explore the course and start learning."}
        </p>

        <div className="mt-5 flex items-center gap-4 text-xs text-neutral-500">
          <span className="flex items-center gap-1.5">
            <BookOpen size={15} />
            {course.lessonCount ?? "—"} lessons
          </span>

          <span className="flex items-center gap-1.5">
            <Clock3 size={15} />
            {course.duration || "Self-paced"}
          </span>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-black/[0.07] pt-4">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-neutral-400">
              Course price
            </p>
            <p className="mt-1 text-xl font-semibold">
              {typeof course.price === "number"
                ? `₹${course.price.toLocaleString("en-IN")}`
                : "Price unavailable"}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onBuy(course)}
            disabled={typeof course.price !== "number"}
            className="inline-flex items-center gap-2 rounded-xl bg-black px-4 py-3 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Buy now
            <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </article>
  );
}

export default CourseCard;
