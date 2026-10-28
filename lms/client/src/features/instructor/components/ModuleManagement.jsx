import { useState } from "react";
import { Layers, Plus, X } from "lucide-react";
  import { useEffect} from "react";
import { useLocation } from "react-router-dom";
export default function ModuleManagement({ courses = [] }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");


  const location = useLocation();

const [selectedCourseId, setSelectedCourseId] = useState(
  location.state?.courseId || ""
);

useEffect(() => {
  if (location.state?.courseId) {
    setSelectedCourseId(location.state.courseId);
  }
}, [location.state?.courseId]);

  const selectedCourse = courses.find(
    (course) => course._id === selectedCourseId
  );

  function handleCreateModule(event) {

    event.preventDefault();

    if (!selectedCourseId || !title.trim()) return;

    // Temporary: API integration will be added next.
    console.log("Module details:", {
      courseId: selectedCourseId,
      title: title.trim(),
      description: description.trim(),
    });

    // Reset form and close it after submission
    setTitle("");
    setDescription("");
    setIsFormOpen(false);
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold">
            <Layers size={20} />
            Module Management
          </h3>

          <p className="mt-1 text-sm text-neutral-500">
            Select a course to manage its modules.
          </p>
        </div>

        <button
          type="button"
          disabled={!selectedCourseId}
          onClick={() => setIsFormOpen(true)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Plus size={16} />
          Create Module
        </button>
      </div>

      {/* Course Selection */}
      <div className="mt-6 max-w-md">
        <label
          htmlFor="module-course"
          className="mb-2 block text-sm font-medium"
        >
          Select Course
        </label>

        <select
          id="module-course"
          value={selectedCourseId}
          onChange={(event) => {
            setSelectedCourseId(event.target.value);
            setIsFormOpen(false);
            setTitle("");
            setDescription("");
          }}
          className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none focus:border-black"
        >
          <option value="">Choose a course</option>

          {courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.title}
            </option>
          ))}
        </select>
      </div>

      {/* Selected Course */}
      {selectedCourse && (
        <div className="mt-6 rounded-xl border border-neutral-200 p-4">
          <p className="text-xs text-neutral-500">Selected course</p>

          <h4 className="mt-1 font-medium">{selectedCourse.title}</h4>
        </div>
      )}

      {/* Empty State */}
      {courses.length === 0 && (
        <p className="mt-6 rounded-xl bg-neutral-50 p-4 text-sm text-neutral-500">
          Create a course first to start adding modules.
        </p>
      )}

      {/* Create Module Form */}
      {isFormOpen && selectedCourse && (
        <form
          onSubmit={handleCreateModule}
          className="mt-6 max-w-2xl rounded-2xl border border-neutral-200 p-5"
        >
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h4 className="font-semibold">Create Module</h4>

              <p className="mt-1 text-sm text-neutral-500">
                Course: {selectedCourse.title}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              aria-label="Close form"
              className="rounded-lg p-2 transition hover:bg-neutral-100"
            >
              <X size={18} />
            </button>
          </div>

          <label
            htmlFor="module-title"
            className="mb-2 block text-sm font-medium"
          >
            Module Title
          </label>

          <input
            id="module-title"
            type="text"
            required
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="e.g. Introduction to React"
            className="mb-4 w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-black"
          />

          <label
            htmlFor="module-description"
            className="mb-2 block text-sm font-medium"
          >
            Description
          </label>

          <textarea
            id="module-description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="What will students learn in this module?"
            rows={4}
            className="mb-5 w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-black"
          />

          <div className="flex gap-3">
            <button
              type="submit"
              className="rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-neutral-800"
            >
              Save Module
            </button>

            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="rounded-xl border border-neutral-200 px-5 py-3 text-sm font-medium transition hover:bg-neutral-50"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}