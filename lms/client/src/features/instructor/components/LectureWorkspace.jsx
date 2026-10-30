
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useModules from "../hooks/useModules";
import LectureForm from "./LectureForm";
import { getLecturesThunk,deleteLectureThunk } from "../thunks/lectureThunk";

function LectureWorkspace({ courses = [] }) {
  const dispatch = useDispatch();

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

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold">
          Lecture Management
        </h3>
        <p className="mt-1 text-sm text-neutral-500">
          Select a course and module to manage lectures.
        </p>
      </div>

      {/* Course Selection */}
      <div className="max-w-xl">
        <label className="mb-2 block text-sm font-medium">
          Select Course
        </label>

        <select
          value={selectedCourseId}
          onChange={(e) => handleCourseChange(e.target.value)}
          className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm"
        >
          <option value="">Choose a course</option>

          {courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.title}
            </option>
          ))}
        </select>
      </div>

      {/* Module Selection */}
      {selectedCourseId && (
        <div className="max-w-xl">
          <label className="mb-2 block text-sm font-medium">
            Select Module
          </label>

          <select
            value={selectedModuleId}
            onChange={(e) => handleModuleChange(e.target.value)}
            disabled={modulesLoading}
            className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm"
          >
            <option value="">
              {modulesLoading ? "Loading modules..." : "Choose a module"}
            </option>

            {modules.map((module) => (
              <option key={module._id} value={module._id}>
                {module.title}
              </option>
            ))}
          </select>

          {modulesError && (
            <p className="mt-2 text-sm text-red-600">
              {modulesError}
            </p>
          )}
        </div>
      )}

      {/* Existing Lectures */}
      {selectedModuleId && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            Existing Lectures
          </h3>

          {lecturesLoading ? (
            <p className="text-sm text-neutral-500">
              Loading lectures...
            </p>
          ) : lecturesError ? (
            <p className="text-sm text-red-600">
              {lecturesError}
            </p>
          ) : lectures.length === 0 ? (
            <p className="rounded-xl bg-neutral-50 p-4 text-sm text-neutral-500">
              No lectures added yet.
            </p>
          ) : (
            <div className="space-y-3">
              {lectures.map((lecture) => (
                <div
                  key={lecture._id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-neutral-200 bg-white p-4"
                >
                  <div>
                    <h4 className="font-medium">
                      {lecture.order}. {lecture.title}
                    </h4>

                    <p className="mt-1 text-sm text-neutral-500">
                      {lecture.notes}
                    </p>

                    <p className="mt-1 text-xs text-neutral-500">
                      {lecture.videoAvailable
                        ? "Video available"
                        : "No video"}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleEditLecture(lecture)}
                    className="rounded-lg border border-neutral-200 px-4 py-2 text-sm hover:bg-neutral-50"
                  >
                    Edit
                  </button>

                  <button
  onClick={() => handleDeleteLecture(lecture._id)}
>
  Delete
</button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Add Lecture Button */}
      {selectedModuleId && !isFormOpen && (
        <button
          type="button"
          onClick={handleAddLecture}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          + Add Lecture
        </button>
      )}

      {/* Lecture Form */}
      {selectedModuleId && isFormOpen && (
        <LectureForm
          moduleId={selectedModuleId}
          editingLecture={editingLecture}
          onClose={handleCloseForm}
        />
      )}

      {!selectedModuleId && (
        <p className="rounded-xl bg-neutral-50 p-4 text-sm text-neutral-500">
          Please select a module to manage lectures.
        </p>
      )}

    </div>
  );
}

export default LectureWorkspace;
