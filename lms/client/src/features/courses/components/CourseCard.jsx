
import {
  ArrowUpRight,
  BookOpen,
  Clock3,
  Loader2,
} from "lucide-react";

function CourseCard({
  course,
  onBuy,
  isPurchased = false,
  buying = false,
  disabled = false,
}) {
  const thumbnailUrl =
    typeof course.thumbnail === "string"
      ? course.thumbnail
      : course.thumbnail?.url;

  return (
    <article className="group overflow-hidden rounded-2xl border border-black/[0.08] bg-white transition duration-300 hover:-translate-y-1 hover:border-black/15 hover:shadow-xl">

      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden bg-neutral-900">
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={course.title || "Course thumbnail"}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-white">
            <BookOpen size={48} strokeWidth={1} />
          </div>
        )}

        <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-xs text-white backdrop-blur">
          {course.category || "Course"}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-medium uppercase tracking-wider text-neutral-400">
            {course.level || "BEGINNER"}
          </span>

          <span className="flex items-center gap-1 text-xs text-neutral-500">
            <BookOpen size={14} />
            Online course
          </span>
        </div>

        <h3 className="mt-3 text-lg font-semibold tracking-tight">
          {course.title}
        </h3>

        <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-neutral-500">
          {course.description || "Explore this course and start learning."}
        </p>

        <div className="mt-5 flex items-center gap-2 text-xs text-neutral-500">
          <Clock3 size={15} />
          Self-paced learning
        </div>

        {/* Price and Action */}
        <div className="mt-5 flex items-center justify-between gap-3 border-t border-black/[0.07] pt-4">
          <div className="min-w-0">
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
            onClick={() => onBuy(course, isPurchased)}
            disabled={disabled || buying}
            className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${
              isPurchased
                ? "border border-black/10 bg-white text-black hover:bg-neutral-100"
                : "bg-black text-white hover:bg-neutral-800"
            }`}
          >
            {buying ? (
              <>
                <Loader2 size={15} className="animate-spin" />
                Processing
              </>
            ) : (
              <>
                {isPurchased ? "Already Enrolled" : "Buy Now"}
                <ArrowUpRight size={16} />
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}

export default CourseCard;
