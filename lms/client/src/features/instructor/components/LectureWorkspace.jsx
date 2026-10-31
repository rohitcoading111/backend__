import { useId, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pencil, Plus, Trash2, Video } from "lucide-react";
import useModules from "../hooks/useModules";
import LectureForm from "./LectureForm";
import PremiumSelect from "./PremiumSelect";
import { getLecturesThunk, deleteLectureThunk } from "../thunks/lectureThunk";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black";

const iconButton = `rounded-full p-2.5 text-white/50 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-40 ${focusRing}`;

function LectureWorkspace({ courses = [] }) {
  const dispatch = useDispatch();
  const uid = useId();

  const [editingLecture, setEditingLecture] = useState(null);
  const [selectedModuleId, setSelectedModuleId] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);

  const {
    modules,
    loading: modulesLoading,
    error: modulesError,
    selectedCourseId,
    handleCourseChange,
  } = useModules(courses);

  const {
    lectures,
    loading: lecturesLoading,
    error: lecturesError,
  } = useSelector((state) => state.lectures);

  // Reset when course changes
  useEffect(() => {
    setSelectedModuleId("");
    setIsFormOpen(false);
    setEditingLecture(null);
  }, [selectedCourseId]);

  // Fetch lectures whenever module changes
  useEffect(() => {
    if (selectedModuleId) {
      dispatch(getLecturesThunk(selectedModuleId));
    }
  }, [selectedModuleId, dispatch]);

  const handleModuleChange = (moduleId) => {
    setSelectedModuleId(moduleId);
    setIsFormOpen(false);
    setEditingLecture(null);
  };

  const handleAddLecture = () => {
    setEditingLecture(null);
    setIsFormOpen(true);
  };

  const handleEditLecture = (lecture) => {
    setEditingLecture(lecture);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingLecture(null);
  };

  const handleDeleteLecture = async (lectureId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this lecture?"
    );

    if (!confirmDelete) return;

    try {
      await dispatch(deleteLectureThunk(lectureId)).unwrap();
    } catch (error) {
      console.error("Delete lecture error:", error);
      alert(error);
    }
  };

  const courseOptions = courses.map((course) => ({
    value: course._id,
    label: course.title,
    badge: course.status === "DRAFT" ? "Draft" : undefined,
  }));

  const moduleOptions = modules.map((module) => ({
    value: module._id,
    label: module.title,
  }));

  return (
    <div className="space-y-10 text-white">
      {/* Header */}
      <div className="flex items-center gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/80">
          <Video size={21} />
        </span>
        <div>
          <h3 className="text-xl font-semibold tracking-tight">
            Lecture management
          </h3>
          <p className="mt-1 text-sm text-white/40">
            Select a course and module to manage lectures.
          </p>
        </div>
      </div>

      {/* Selectors */}
      <div className="grid max-w-3xl gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor={`${uid}-course`}
            className="mb-2 block text-sm font-medium text-white/80"
          >
            Select course
          </label>
          <PremiumSelect
            id={`${uid}-course`}
            options={courseOptions}
            value={selectedCourseId}
            onChange={handleCourseChange}
            placeholder="Choose a course"
            emptyText="No courses yet"
          />
        </div>

        {selectedCourseId && (
          <div>
            <label
              htmlFor={`${uid}-module`}
              className="mb-2 block text-sm font-medium text-white/80"
            >
              Select module
            </label>
            <PremiumSelect
              id={`${uid}-module`}
              options={moduleOptions}
              value={selectedModuleId}
              onChange={handleModuleChange}
              disabled={modulesLoading}
              placeholder={
                modulesLoading ? "Loading modules" : "Choose a module"
              }
              emptyText="No modules in this course"
            />

            {modulesError && (
              <p
                role="alert"
                className="mt-3 rounded-xl border border-white/20 bg-white/[0.04] px-4 py-3 text-sm text-white/80"
              >
                {modulesError}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Lecture form */}
      {selectedModuleId && isFormOpen && (
        <LectureForm
          moduleId={selectedModuleId}
          editingLecture={editingLecture}
          onClose={handleCloseForm}
        />
      )}

      {/* Lectures */}
      {selectedModuleId ? (
        <div>
          <div className="mb-5 flex items-center justify-between gap-4">
            <div className="flex items-baseline gap-3">
              <h4 className="text-lg font-semibold tracking-tight">
                Existing lectures
              </h4>
              {!lecturesLoading && !lecturesError && (
                <span className="text-sm tabular-nums text-white/40">
                  {lectures.length}{" "}
                  {lectures.length === 1 ? "lecture" : "lectures"}
                </span>
              )}
            </div>

            {!isFormOpen && (
              <button
                type="button"
                onClick={handleAddLecture}
                className={`inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition-all hover:bg-white/85 active:scale-[0.97] motion-reduce:active:scale-100 ${focusRing}`}
              >
                <Plus size={16} />
                Add lecture
              </button>
            )}
          </div>

          {lecturesLoading ? (
            <div className="space-y-3" aria-busy="true">
              {[0, 1, 2].map((item) => (
                <div
                  key={item}
                  className="h-24 animate-pulse rounded-2xl border border-white/10 bg-white/[0.03] motion-reduce:animate-none"
                />
              ))}
            </div>
          ) : lecturesError ? (
            <p
              role="alert"
              className="rounded-2xl border border-white/15 bg-white/[0.03] px-6 py-10 text-center text-sm text-white/70"
            >
              {lecturesError}
            </p>
          ) : lectures.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/20 bg-white/[0.02] px-6 py-12 text-center">
              <p className="font-medium">No lectures yet</p>
              <p className="mt-1 text-sm text-white/40">
                Add your first lecture to this module.
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {lectures.map((lecture) => (
                <li
                  key={lecture._id}
                  className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-colors duration-300 hover:border-white/30 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex min-w-0 items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-sm font-semibold tabular-nums text-white/70">
                      {lecture.order}
                    </span>

                    <div className="min-w-0">
                      <h5 className="truncate font-medium">{lecture.title}</h5>

                      {lecture.notes && (
                        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-white/40">
                          {lecture.notes}
                        </p>
                      )}

                      <p className="mt-2 inline-flex items-center gap-2 text-xs text-white/50">
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            lecture.videoAvailable
                              ? "bg-white"
                              : "border border-white/60"
                          }`}
                        />
                        {lecture.videoAvailable ? "Video available" : "No video"}
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-1.5 self-end sm:self-auto">
                    <button
                      type="button"
                      onClick={() => handleEditLecture(lecture)}
                      aria-label={`Edit ${lecture.title}`}
                      title="Edit"
                      className={iconButton}
                    >
                      <Pencil size={17} />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteLecture(lecture._id)}
                      aria-label={`Delete ${lecture.title}`}
                      title="Delete"
                      className={`rounded-full p-2.5 text-white/50 transition-colors hover:bg-white hover:text-black ${focusRing}`}
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <p className="rounded-2xl border border-dashed border-white/20 bg-white/[0.02] px-6 py-12 text-center text-sm text-white/40">
          Please select a module to manage lectures.
        </p>
      )}
    </div>
  );
}

export default LectureWorkspace;