import { useId, useState } from "react";
import { Layers, Pencil, Plus, Trash2, X } from "lucide-react";
import useModules from "../hooks/useModules";
import PremiumSelect from "./PremiumSelect";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-all duration-300 hover:border-white/20 focus:border-white focus:bg-white/[0.06] focus:ring-4 focus:ring-white/10";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black";

const iconButton = `rounded-full p-2.5 text-white/50 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-40 ${focusRing}`;

function Spinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin motion-reduce:animate-none"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="3"
      />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function ModuleManagement({ courses = [], onAddLecture }) {
  const uid = useId();

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
    <div className="text-white">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/80">
            <Layers size={21} />
          </span>
          <div>
            <h3 className="text-xl font-semibold tracking-tight">
              Module management
            </h3>
            <p className="mt-1 text-sm text-white/40">
              Manage modules inside your courses.
            </p>
          </div>
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
          className={`inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition-all hover:bg-white/85 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40 motion-reduce:active:scale-100 ${focusRing}`}
        >
          <Plus size={16} />
          Create module
        </button>
      </div>

      {/* Course selection */}
      <div className="mt-8 max-w-md">
        <label
          htmlFor={`${uid}-course`}
          className="mb-2 block text-sm font-medium text-white/80"
        >
          Select course
        </label>

        <PremiumSelect
          id={`${uid}-course`}
          options={courses.map((course) => ({
            value: course._id,
            label: course.title,
            badge: course.status === "DRAFT" ? "Draft" : undefined,
          }))}
          value={selectedCourseId}
          onChange={handleSelectCourse}
          placeholder="Choose a course"
          emptyText="No courses yet"
        />
      </div>

      {/* Selected course */}
      {selectedCourse && (
        <div className="mt-5 max-w-md rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">
          <p className="text-xs text-white/40">Selected course</p>
          <h4 className="mt-1 truncate font-medium">{selectedCourse.title}</h4>
        </div>
      )}

      {/* API error */}
      {error && (
        <p
          role="alert"
          className="mt-5 rounded-xl border border-white/20 bg-white/[0.04] px-4 py-3 text-sm text-white/80"
        >
          {error}
        </p>
      )}

      {/* Create / update form */}
      {isFormOpen && selectedCourse && (
        <form
          onSubmit={handleSubmitModule}
          className="mt-8 max-w-2xl rounded-3xl border border-white/10 bg-black p-6 sm:p-8"
        >
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <h4 className="text-xl font-semibold tracking-tight">
                {editingModule ? "Update module" : "Create module"}
              </h4>
              <p className="mt-1 text-sm text-white/40">
                Course: {selectedCourse.title}
              </p>
            </div>

            <button
              type="button"
              onClick={handleCancel}
              aria-label="Close form"
              className={iconButton}
            >
              <X size={18} />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label
                htmlFor={`${uid}-title`}
                className="mb-2 block text-sm font-medium text-white/80"
              >
                Module title
              </label>
              <input
                id={`${uid}-title`}
                required
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Introduction to React"
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor={`${uid}-description`}
                className="mb-2 block text-sm font-medium text-white/80"
              >
                Description
              </label>
              <textarea
                id={`${uid}-description`}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="What will students learn?"
                rows={4}
                className={`${inputClass} resize-none`}
              />
            </div>
          </div>

          <div className="mt-8 flex flex-col-reverse gap-3 border-t border-white/10 pt-6 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={handleCancel}
              disabled={loading}
              className={`rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-white hover:bg-white/10 disabled:opacity-40 ${focusRing}`}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className={`inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-all hover:bg-white/85 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:active:scale-100 ${focusRing}`}
            >
              {loading && <Spinner />}
              {loading
                ? "Saving"
                : editingModule
                  ? "Update module"
                  : "Save module"}
            </button>
          </div>
        </form>
      )}

      {/* Module list */}
      <div className="mt-12">
        <div className="mb-5 flex items-baseline justify-between gap-4">
          <h4 className="text-lg font-semibold tracking-tight">
            Course modules
          </h4>
          {selectedCourseId && !loading && (
            <span className="text-sm tabular-nums text-white/40">
              {modules.length} {modules.length === 1 ? "module" : "modules"}
            </span>
          )}
        </div>

        {!selectedCourseId ? (
          <p className="rounded-2xl border border-dashed border-white/20 bg-white/[0.02] px-6 py-12 text-center text-sm text-white/40">
            Select a course to view its modules.
          </p>
        ) : loading ? (
          <div className="space-y-3" aria-busy="true">
            {[0, 1, 2].map((item) => (
              <div
                key={item}
                className="h-24 animate-pulse rounded-2xl border border-white/10 bg-white/[0.03] motion-reduce:animate-none"
              />
            ))}
          </div>
        ) : modules.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/20 bg-white/[0.02] px-6 py-12 text-center">
            <p className="font-medium">No modules yet</p>
            <p className="mt-1 text-sm text-white/40">
              Create your first module for this course.
            </p>
          </div>
        ) : (
          <ul className="space-y-3">
            {modules.map((module, index) => (
              <li
                key={module._id}
                className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-colors duration-300 hover:border-white/30 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex min-w-0 items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-sm font-semibold tabular-nums text-white/70">
                    {module.order ?? index + 1}
                  </span>

                  <div className="min-w-0">
                    <h5 className="truncate font-medium">{module.title}</h5>
                    {module.description && (
                      <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-white/40">
                        {module.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-1.5 self-end sm:self-auto">
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => startEditing(module)}
                    aria-label={`Edit ${module.title}`}
                    title="Edit"
                    className={iconButton}
                  >
                    <Pencil size={17} />
                  </button>

                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => handleDeleteModule(module._id)}
                    aria-label={`Delete ${module.title}`}
                    title="Delete"
                    className={`rounded-full p-2.5 text-white/50 transition-colors hover:bg-white hover:text-black disabled:opacity-40 ${focusRing}`}
                  >
                    <Trash2 size={17} />
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
                    className={`ml-1 inline-flex items-center gap-1.5 rounded-full border border-white/20 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:border-white hover:bg-white hover:text-black ${focusRing}`}
                  >
                    <Plus size={15} />
                    Add lecture
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}