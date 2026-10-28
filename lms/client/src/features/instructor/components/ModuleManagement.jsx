import { useState } from "react";
import { Layers, Plus, X, Trash2, Pencil } from "lucide-react";
import useModules from "../hooks/useModules";
import { useNavigate } from "react-router-dom";

export default function ModuleManagement({ courses = [], onAddLecture }) {
  const {
    modules,
    loading,
    error,
    selectedCourseId,
    selectedCourse,
    isFormOpen,
    title,
    description,
    setTitle,
    setDescription,
    handleCourseChange,
    openCreateForm,
    closeCreateForm,
    handleCreateModule,
    handleUpdateModule,
    handleDeleteModule,
  } = useModules(courses);

  const navigate = useNavigate();
  // UI state: currently editing module
  const [editingModule, setEditingModule] = useState(null);

  function startEditing(module) {
    setEditingModule(module);
    setTitle(module.title || "");
    setDescription(module.description || "");
    openCreateForm();
  }

  function handleCancel() {
    setEditingModule(null);
    setTitle("");
    setDescription("");
    closeCreateForm();
  }

  async function handleSubmitModule(event) {
    event.preventDefault();

    if (!editingModule) {
      await handleCreateModule(event);
      return;
    }

    // Actual API/update logic is handled by the custom hook.
    const success = await handleUpdateModule(editingModule._id, {
      title: title.trim(),
      description: description.trim(),
    });

    if (success) {
      setEditingModule(null);
      setTitle("");
      setDescription("");
      closeCreateForm();
    }
  }

  function handleSelectCourse(courseId) {
    setEditingModule(null);
    setTitle("");
    setDescription("");
    handleCourseChange(courseId);
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
            Manage modules inside your courses.
          </p>
        </div>

        <button
          type="button"
          disabled={!selectedCourseId || loading}
          onClick={() => {
            setEditingModule(null);
            setTitle("");
            setDescription("");
            openCreateForm();
          }}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-4 py-2.5 text-sm text-white hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Plus size={16} />
          Create Module
        </button>
      </div>

      {/* Course selection */}
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
          onChange={(event) => handleSelectCourse(event.target.value)}
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

      {/* Selected course */}
      {selectedCourse && (
        <div className="mt-6 rounded-xl border border-neutral-200 p-4">
          <p className="text-xs text-neutral-500">Selected course</p>
          <h4 className="mt-1 font-medium">{selectedCourse.title}</h4>
        </div>
      )}

      {/* API error */}
      {error && (
        <p role="alert" className="mt-4 text-sm text-red-600">
          {error}
        </p>
      )}

      {/* Create / Update form */}
      {isFormOpen && selectedCourse && (
        <form
          onSubmit={handleSubmitModule}
          className="mt-6 max-w-2xl rounded-2xl border border-neutral-200 p-5"
        >
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h4 className="font-semibold">
                {editingModule ? "Update Module" : "Create Module"}
              </h4>
              <p className="mt-1 text-sm text-neutral-500">
                Course: {selectedCourse.title}
              </p>
            </div>

            <button
              type="button"
              onClick={handleCancel}
              aria-label="Close form"
              className="rounded-lg p-2 hover:bg-neutral-100"
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
            placeholder="What will students learn?"
            rows={4}
            className="mb-5 w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-black"
          />

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-black px-5 py-3 text-sm font-medium text-white hover:bg-neutral-800 disabled:opacity-50"
            >
              {loading
                ? "Saving..."
                : editingModule
                  ? "Update Module"
                  : "Save Module"}
            </button>

            <button
              type="button"
              onClick={handleCancel}
              disabled={loading}
              className="rounded-xl border border-neutral-200 px-5 py-3 text-sm hover:bg-neutral-50 disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Module list */}
      <div className="mt-8">
        <h4 className="mb-4 font-semibold">Course Modules</h4>

        {!selectedCourseId ? (
          <p className="text-sm text-neutral-500">
            Select a course to view its modules.
          </p>
        ) : loading ? (
          <p className="text-sm text-neutral-500">Loading modules...</p>
        ) : modules.length === 0 ? (
          <p className="rounded-xl bg-neutral-50 p-4 text-sm text-neutral-500">
            No modules found for this course. Create your first module.
          </p>
        ) : (
          <div className="space-y-3">
            {modules.map((module) => (
              <div
                key={module._id}
                className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-xl border border-neutral-200 p-4"
              >
                <div className="min-w-0">
                  <h5 className="font-medium">{module.title}</h5>
                  {module.description && (
                    <p className="mt-1 text-sm text-neutral-500">
                      {module.description}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-neutral-400">
                    Order: {module.order}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => startEditing(module)}
                    aria-label={`Edit ${module.title}`}
                    className="rounded-lg p-2 text-neutral-700 hover:bg-neutral-100 disabled:opacity-50"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => handleDeleteModule(module._id)}
                    aria-label={`Delete ${module.title}`}
                    className="rounded-lg p-2 text-red-600 hover:bg-red-50 disabled:opacity-50"
                  >
                    <Trash2 size={18} />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      onAddLecture({
                        courseId: selectedCourseId,
                        courseTitle: selectedCourse?.title,
                        moduleId: module._id,
                        moduleTitle: module.title,
                      })
                    }
                    className="inline-flex items-center gap-1 rounded-lg bg-black px-3 py-2 text-sm text-white hover:bg-neutral-800"
                  >
                    <Plus size={16} />
                    Add Lecture
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}