function CourseCard({
  course,
  onEdit,
  onDelete,
  onPublish,
  onUnpublish,
  onAddModule
}) {
  return (
    <article className="rounded-xl border border-gray-300 bg-white p-5 text-black">
      <img
        src={course.thumbnail?.url}
        alt={course.title}
        className="mb-4 h-44 w-full rounded-lg object-cover"
      />

      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold">
          {course.title}
        </h3>

        <span className="rounded-full border border-gray-300 px-3 py-1 text-xs">
          {course.status}
        </span>
      </div>

      <p className="mb-4 text-sm text-gray-600">
        {course.description}
      </p>

      <p className="mb-4 text-sm">
        Price: ₹{course.price}
      </p>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onEdit(course)}
          className="rounded-lg border border-black px-3 py-2 text-sm"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(course._id)}
          className="rounded-lg border border-black px-3 py-2 text-sm"
        >
          Delete
        </button>

        {course.status === "DRAFT" ? (
          <button
            onClick={() => onPublish(course._id)}
            className="rounded-lg bg-black px-3 py-2 text-sm text-white"
          >
            Publish
          </button>
        ) : (
          <button
            onClick={() => onUnpublish(course._id)}
            className="rounded-lg bg-black px-3 py-2 text-sm text-white"
          >
            Unpublish
          </button>
          

        )}
           <button
           type="button"
           onClick={() => onAddModule(course)}
           className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
            >
           + Add Module
          </button>
      </div>
    </article>
  );
}

export default CourseCard;
