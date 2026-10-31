import { useState } from "react";

const priceFormatter = new Intl.NumberFormat("en-IN");

function Icon({ children, className = "h-4 w-4" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black";

function CourseCard({
  course,
  onEdit,
  onDelete,
  onPublish,
  onUnpublish,
  onAddModule,
}) {
  const [imgFailed, setImgFailed] = useState(false);

  const isDraft = course.status === "DRAFT";
  const thumbnail = course.thumbnail?.url;
  const price = Number(course.price) || 0;

  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-3xl bg-black text-white transition-all duration-500 motion-reduce:transition-none ${
        isDraft
          ? "border border-dashed border-white/20"
          : "border border-white/10 hover:-translate-y-1 hover:border-white/30 hover:shadow-[0_24px_60px_-20px_rgba(255,255,255,0.18)] motion-reduce:hover:translate-y-0"
      }`}
    >
      {/* Thumbnail: grayscale by default, full colour on hover */}
      <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
        {thumbnail && !imgFailed ? (
          <img
            src={thumbnail}
            alt={course.title}
            loading="lazy"
            onError={() => setImgFailed(true)}
            className={`h-full w-full object-cover transition-all duration-700 ease-out motion-reduce:transition-none ${
              isDraft
                ? "grayscale opacity-40"
                : "group-hover:scale-105 motion-reduce:group-hover:scale-100"
            }`}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-white/20">
            <Icon className="h-10 w-10">
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <circle cx="9" cy="10" r="1.5" />
              <path d="m21 16-5-5-9 9" />
            </Icon>
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

        <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              isDraft ? "border border-white" : "bg-white"
            }`}
          />
          {isDraft ? "Draft" : "Published"}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col px-6 pb-6 pt-2">
        <h3 className="line-clamp-1 text-lg font-semibold tracking-tight">
          {course.title}
        </h3>

        <p className="mt-2 line-clamp-2 min-h-[2.75rem] text-sm leading-relaxed text-white/50">
          {course.description}
        </p>

        {/* Price + quick actions */}
        <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-5">
          <p className="text-2xl font-semibold tabular-nums tracking-tight">
            {price > 0 ? `₹${priceFormatter.format(price)}` : "Free"}
          </p>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => onEdit(course)}
              aria-label={`Edit ${course.title}`}
              title="Edit"
              className={`rounded-full p-2.5 text-white/50 transition-colors hover:bg-white/10 hover:text-white ${focusRing}`}
            >
              <Icon>
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
              </Icon>
            </button>

            <button
              type="button"
              onClick={() => onDelete(course._id)}
              aria-label={`Delete ${course.title}`}
              title="Delete"
              className={`rounded-full p-2.5 text-white/50 transition-colors hover:bg-white hover:text-black ${focusRing}`}
            >
              <Icon>
                <path d="M3 6h18" />
                <path d="M8 6V4h8v2" />
                <path d="m19 6-1 14H6L5 6" />
                <path d="M10 11v5M14 11v5" />
              </Icon>
            </button>
          </div>
        </div>

        {/* Primary actions */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => onAddModule(course)}
            className={`inline-flex items-center justify-center gap-1.5 rounded-full border border-white/20 px-4 py-3 text-sm font-medium text-white transition-colors hover:border-white hover:bg-white/10 ${focusRing}`}
          >
            <Icon className="h-3.5 w-3.5">
              <path d="M12 5v14M5 12h14" />
            </Icon>
            Add module
          </button>

          {isDraft ? (
            <button
              type="button"
              onClick={() => onPublish(course._id)}
              className={`rounded-full bg-white px-4 py-3 text-sm font-semibold text-black transition-all hover:bg-white/85 active:scale-[0.97] motion-reduce:active:scale-100 ${focusRing}`}
            >
              Publish
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onUnpublish(course._id)}
              className={`rounded-full border border-white px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-white hover:text-black active:scale-[0.97] motion-reduce:active:scale-100 ${focusRing}`}
            >
              Unpublish
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export default CourseCard;