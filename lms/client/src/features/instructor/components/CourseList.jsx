import CourseCard from "./CourseCard";

function CourseList({
  courses,
  onEdit,
  onDelete,
  onPublish,
  onUnpublish,
  onAddModule,
  onCreate, // optional: shows a button in the empty state
}) {
  if (!courses || courses.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-3xl border border-dashed border-white/20 bg-white/[0.02] px-6 py-16 text-center">
        <span className="rounded-full border border-white/15 p-4 text-white/60">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-7 w-7"
            aria-hidden="true"
          >
            <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5Z" />
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          </svg>
        </span>

        <h3 className="mt-6 text-xl font-semibold tracking-tight">
          No courses yet
        </h3>

        <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/40">
          Create your first course to get started. You can add modules and
          lectures after saving.
        </p>

        {onCreate && (
          <button
            type="button"
            onClick={onCreate}
            className="mt-8 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-all hover:bg-white/85 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black motion-reduce:active:scale-100"
          >
            Create course
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {courses.map((course) => (
        <CourseCard
          key={course._id}
          course={course}
          onEdit={onEdit}
          onDelete={onDelete}
          onPublish={onPublish}
          onUnpublish={onUnpublish}
          onAddModule={onAddModule}
        />
      ))}
    </div>
  );
}

export default CourseList;