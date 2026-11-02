import CourseCard from "./CourseCard";

function CourseList({
  courses,
  currentInstructorId,
  onEdit,
  onDelete,
  onPublish,
  onUnpublish,
  onAddModule,
  onCreate,
  isCourseOwner
}) {
  if (!courses || courses.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-3xl border border-dashed border-white/20 bg-white/[0.02] px-6 py-16 text-center">
        <h3 className="text-xl font-semibold tracking-tight">
          No courses yet
        </h3>

        <p className="mt-2 max-w-sm text-sm text-white/40">
          Create your first course to get started.
        </p>

        {onCreate && (
          <button
            type="button"
            onClick={onCreate}
            className="mt-8 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-white/85"
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
          currentInstructorId={currentInstructorId}
          onEdit={onEdit}
          onDelete={onDelete}
          onPublish={onPublish}
          onUnpublish={onUnpublish}
          onAddModule={onAddModule}
          isCourseOwner={isCourseOwner}
        />
      ))}
    </div>
  );
}

export default CourseList;