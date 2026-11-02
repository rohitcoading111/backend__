import { BookOpen, UserRound } from "lucide-react";

const priceFormatter = new Intl.NumberFormat("en-IN");

export default function OrganizationCourseCard({ course }) {
  const instructor =
    typeof course.instructor === "object"
      ? course.instructor
      : null;

  const instructorName =
    instructor?.name || "Instructor";

  const price = Number(course.price) || 0;

  const isPublished = course.status === "PUBLISHED";

  return (
    <article className="group overflow-hidden rounded-3xl border border-white/10 bg-black transition duration-300 hover:-translate-y-1 hover:border-white/30">
      {/* Thumbnail */}
      <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
        {course.thumbnail?.url ? (
          <img
            src={course.thumbnail.url}
            alt={course.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-white/30">
            <BookOpen size={38} />
          </div>
        )}

        <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/70 px-3 py-1 text-xs text-white backdrop-blur-md">
          {isPublished ? "Published" : "Draft"}
        </span>
      </div>

      {/* Course information */}
      <div className="p-5">
        <h3 className="line-clamp-1 text-lg font-semibold">
          {course.title}
        </h3>

        <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-relaxed text-white/40">
          {course.description}
        </p>

        <div className="mt-5 flex items-center gap-2 border-t border-white/10 pt-4">
          <UserRound size={16} className="text-white/40" />

          <div className="min-w-0">
            <p className="truncate text-sm font-medium">
              {instructorName}
            </p>

            <p className="text-xs text-white/40">
              Course instructor
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-semibold">
            {price > 0
              ? `₹${priceFormatter.format(price)}`
              : "Free"}
          </span>

          <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/50">
            {course.level || "Beginner"}
          </span>
        </div>
      </div>
    </article>
  );
}