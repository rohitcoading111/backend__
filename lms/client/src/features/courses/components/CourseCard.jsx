
import {
  ArrowUpRight,
  BookOpen,
  Clock3,
  Loader2,
} from "lucide-react";
import "./CourseCard.css";

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

  const courseTitle = course.title?.trim() || "Online Course";

  const courseDescription =
    course.description?.trim() ||
    `Explore the ${courseTitle} course on LearnHub and develop practical skills.`;

  const courseCategory = course.category || "Course";
  const courseLevel = course.level || "BEGINNER";

  const formattedPrice =
    typeof course.price === "number"
      ? `₹${course.price.toLocaleString("en-IN")}`
      : "Price unavailable";

  return (
    <article
      className="course-lightning-card group overflow-hidden rounded-2xl border transition duration-300"
      aria-label={`${courseTitle} course`}
    >
      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden bg-neutral-900">
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={`${courseTitle} online course thumbnail`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className="flex h-full items-center justify-center text-white"
            role="img"
            aria-label={`${courseTitle} course image unavailable`}
          >
            <BookOpen size={48} strokeWidth={1} />
          </div>
        )}

        <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-xs text-white backdrop-blur">
          {courseCategory}
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-medium uppercase tracking-wider text-neutral-400">
            {courseLevel}
          </span>

          <span className="flex items-center gap-1 text-xs text-neutral-500">
            <BookOpen size={14} aria-hidden="true" />
            Online course
          </span>
        </div>

        {/* Course Title */}
        <h3 className="mt-3 text-lg font-semibold tracking-tight">
          {courseTitle}
        </h3>

        {/* Course Description */}
        <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-neutral-500">
          {courseDescription}
        </p>

        <div className="mt-5 flex items-center gap-2 text-xs text-neutral-500">
          <Clock3 size={15} aria-hidden="true" />
          Self-paced learning
        </div>

        {/* Price and Action */}
        <div className="course-card-price-row mt-5 flex items-center justify-between gap-3 border-t pt-4">
          <div className="course-card-price-panel min-w-0">
            <p className="text-[10px] uppercase tracking-wider text-neutral-400">
              Course price
            </p>

            <p className="course-card-price mt-1 text-xl font-semibold">
              {formattedPrice}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onBuy(course, isPurchased)}
            disabled={disabled || buying}
            aria-label={
              buying
                ? `Processing ${courseTitle} purchase`
                : isPurchased
                  ? `Open enrolled ${courseTitle} course`
                  : `Buy ${courseTitle} course`
            }
            className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${
              isPurchased
                ? "is-enrolled"
                : ""
            } course-lightning-button`}
          >
            <span className="course-lightning-button-content">
              {buying ? (
                <>
                  <Loader2
                    size={15}
                    className="animate-spin"
                    aria-hidden="true"
                  />
                  Processing
                </>
              ) : (
                <>
                  {isPurchased ? "Already Enrolled" : "Buy Now"}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </>
              )}
            </span>
          </button>
        </div>
      </div>
    </article>
  );
}

export default CourseCard;
