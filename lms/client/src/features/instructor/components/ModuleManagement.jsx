import { useEffect, useId, useRef, useState } from "react";
import {
  Check,
  ChevronDown,
  Layers,
  Pencil,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import useModules from "../hooks/useModules";

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

function CourseSelect({ id, courses, value, onChange }) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef(null);

  const selectedIndex = courses.findIndex((course) => course._id === value);
  const selected = selectedIndex >= 0 ? courses[selectedIndex] : null;
  const listId = `${id}-list`;
  const lastIndex = courses.length - 1;

  // Close when clicking outside
  useEffect(() => {
    if (!open) return undefined;
    function onPointerDown(event) {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  // Keep the highlighted option visible while using the keyboard
  useEffect(() => {
    if (!open) return;
    document
      .getElementById(`${id}-opt-${activeIndex}`)
      ?.scrollIntoView({ block: "nearest" });
  }, [open, activeIndex, id]);

  function openList() {
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
    setOpen(true);
  }

  function choose(index) {
    const course = courses[index];
    if (course) onChange(course._id);
    setOpen(false);
  }

  function handleKeyDown(event) {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        if (!open) openList();
        else setActiveIndex((i) => Math.max(0, Math.min(i + 1, lastIndex)));
        break;
      case "ArrowUp":
        event.preventDefault();
        if (!open) openList();
        else setActiveIndex((i) => Math.max(i - 1, 0));
        break;
      case "Home":
        if (open) {
          event.preventDefault();
          setActiveIndex(0);
        }
        break;
      case "End":
        if (open) {
          event.preventDefault();
          setActiveIndex(Math.max(lastIndex, 0));
        }
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        if (!open) openList();
        else choose(activeIndex);
        break;
      case "Escape":
        if (open) {
          event.preventDefault();
          setOpen(false);
        }
        break;
      case "Tab":
        setOpen(false);
        break;
      default:
        break;
    }
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={
          open && courses.length ? `${id}-opt-${activeIndex}` : undefined
        }
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={handleKeyDown}
        className={`flex w-full items-center justify-between gap-3 rounded-xl border bg-white/[0.03] px-4 py-3 text-left text-sm outline-none transition-all duration-300 hover:border-white/20 ${
          open
            ? "border-white bg-white/[0.06] ring-4 ring-white/10"
            : "border-white/10"
        }`}
      >
        <span className={`truncate ${selected ? "text-white" : "text-white/30"}`}>
          {selected ? selected.title : "Choose a course"}
        </span>
        <ChevronDown
          size={18}
          className={`shrink-0 transition-transform duration-300 motion-reduce:transition-none ${
            open ? "rotate-180 text-white" : "text-white/40"
          }`}
        />
      </button>

      <div
        className={`absolute left-0 right-0 z-20 mt-2 origin-top overflow-hidden rounded-2xl border border-white/15 bg-black/95 shadow-[0_24px_60px_-20px_rgba(255,255,255,0.18)] backdrop-blur-xl transition-[opacity,transform,visibility] duration-200 ease-out motion-reduce:transition-none ${
          open
            ? "visible translate-y-0 scale-100 opacity-100"
            : "invisible -translate-y-1 scale-[0.98] opacity-0"
        }`}
      >
        <ul
          id={listId}
          role="listbox"
          aria-label="Courses"
          data-lenis-prevent
          className="max-h-64 overflow-y-auto p-1.5"
        >
          {courses.length === 0 ? (
            <li className="px-3.5 py-6 text-center text-sm text-white/40">
              No courses yet
            </li>
          ) : (
            courses.map((course, index) => {
              const isSelected = course._id === value;
              const isActive = index === activeIndex;
              const isDraft = course.status === "DRAFT";

              return (
                <li
                  key={course._id}
                  id={`${id}-opt-${index}`}
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => choose(index)}
                  className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl px-3.5 py-3 text-sm transition-colors duration-150 ${
                    isActive ? "bg-white/10" : ""
                  } ${isSelected ? "font-medium text-white" : "text-white/60"} ${
                    isActive ? "text-white" : ""
                  }`}
                >
                  <span className="truncate">{course.title}</span>

                  <span className="flex shrink-0 items-center gap-2">
                    {isDraft && (
                      <span className="rounded-full border border-white/15 px-2 py-0.5 text-xs font-normal text-white/40">
                        Draft
                      </span>
                    )}
                    {isSelected && <Check size={16} />}
                  </span>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </div>
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

        <CourseSelect
          id={`${uid}-course`}
          courses={courses}
          value={selectedCourseId}
          onChange={handleSelectCourse}
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