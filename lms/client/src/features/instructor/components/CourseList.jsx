
import CourseCard from "./CourseCard";

function CourseList({
  courses,
  onEdit,
  onDelete,
  onPublish,
  onUnpublish,
  onAddModule,
}) {
  if (!courses || courses.length === 0) {
    return (
      <div className="rounded-xl border border-gray-300 p-8 text-center text-black">
        <h3 className="text-lg font-semibold">
          No courses yet
        </h3>

        <p className="mt-2 text-sm text-gray-600">
          Create your first course to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
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
