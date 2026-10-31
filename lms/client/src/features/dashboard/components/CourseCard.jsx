
import { useState } from "react";

import {
  ArrowUpRight,
  BookOpen,
  Play,
  CheckCircle2,
} from "lucide-react";

function CourseCard({ enrollment, onClick }) {
  const course = enrollment?.course;

  const [imageError, setImageError] = useState(false);

  if (!course) return null;

  const {
    title = "Untitled Course",
    description = "Start learning and improve your skills.",
    category = "General",
    level = "Beginner",
  } = course;

  // ImageKit thumbnail URL
  const thumbnailUrl =
    typeof course.thumbnail === "string"
      ? course.thumbnail
      : course.thumbnail?.url;

  // Lesson progress
  const completedLessons = enrollment?.completedLessons ?? 0;
  const totalLessons = enrollment?.totalLessons ?? 0;

  const progress =
    totalLessons > 0
      ? Math.min(
          100,
          Math.round((completedLessons / totalLessons) * 100)
        )
      : 0;

  // Course navigation
  const handleClick = () => {
    onClick?.(course);
  };

  return (
    <article className="group overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111111] transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-[#151515]">

      {/* Course Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-[#1a1a1a]">

        {thumbnailUrl && !imageError ? (
          <img
            src={thumbnailUrl}
            alt={title}
            loading="lazy"
            onError={() => setImageError(true)}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#242424] to-[#101010]">
            <BookOpen
              size={42}
              strokeWidth={1.2}
              className="text-neutral-500"
            />
          </div>
        )}

        {/* Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 pointer-events-none" />

        {/* Category */}
        <div className="absolute left-4 top-4">
          <span className="rounded-full border border-white/20 bg-black/50 px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider text-white backdrop-blur-md">
            {category}
          </span>
        </div>

        {/* Level */}
        <div className="absolute right-4 top-4">
          <span className="rounded-full border border-white/20 bg-black/50 px-3 py-1.5 text-[10px] font-medium text-white backdrop-blur-md">
            {level}
          </span>
        </div>

        {/* Play Icon */}
        <div className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100">
          <Play size={16} fill="currentColor" />
        </div>
      </div>

      {/* Course Content */}
      <div className="p-5">

        {/* Title */}
        <h3 className="line-clamp-1 text-lg font-semibold tracking-tight text-white">
          {title}
        </h3>

        {/* Description */}
        <p className="mt-2 line-clamp-2 min-h-[40px] text-sm leading-5 text-neutral-400">
          {description}
        </p>

        {/* Lesson Information */}
        <div className="mt-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <BookOpen size={15} />

            <span>
              {completedLessons}/{totalLessons} lessons
            </span>
          </div>

          <span className="text-xs font-semibold tabular-nums text-white">
            {progress}%
          </span>
        </div>

        {/* Progress Bar */}
        <div
          className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10"
          role="progressbar"
          aria-label={`${title} progress`}
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full rounded-full bg-white transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Continue Learning */}
        <button
          type="button"
          onClick={handleClick}
          className="mt-6 flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-medium text-white transition-all duration-300 hover:border-white/20 hover:bg-white hover:text-black active:scale-[0.98]"
        >
          <span className="flex items-center gap-2">
            {progress === 100 ? (
              <>
                <CheckCircle2 size={16} />
                Review course
              </>
            ) : (
              <>
                <Play size={15} />
                Continue learning
              </>
            )}
          </span>

          <ArrowUpRight size={17} />
        </button>

      </div>
    </article>
  );
}

export default CourseCard;
