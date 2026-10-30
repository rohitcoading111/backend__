import { useState } from "react";
import useModules from "../hooks/useModules";
import LectureForm from "./LectureForm";
import { useEffect } from "react";
function LectureWorkspace({ courses = [] }) {
  const {
    modules,
    loading,
    error,
    selectedCourseId,
    selectedCourse,
    handleCourseChange,
  } = useModules(courses);

  const [selectedModuleId, setSelectedModuleId] = useState("");

  // Clear selected module when course changes
  useEffect(() => {
    setSelectedModuleId("");
  }, [selectedCourseId]);

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
        <label
          htmlFor="lecture-course"
          className="mb-2 block text-sm font-medium"
        >
          Select Course
        </label>

        <select
          id="lecture-course"
          value={selectedCourseId}
          onChange={(event) =>
            handleCourseChange(event.target.value)
          }
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

      {/* Module Selection */}
      {selectedCourseId && (
        <div className="max-w-xl">
          <label
            htmlFor="lecture-module"
            className="mb-2 block text-sm font-medium"
          >
            Select Module
          </label>

          <select
            id="lecture-module"
            value={selectedModuleId}
            onChange={(event) =>
              setSelectedModuleId(event.target.value)
            }
            disabled={loading}
            className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none focus:border-black disabled:opacity-50"
          >
            <option value="">
              {loading ? "Loading modules..." : "Choose a module"}
            </option>

            {modules.map((module) => (
              <option key={module._id} value={module._id}>
                {module.title}
              </option>
            ))}
          </select>

          {error && (
            <p className="mt-2 text-sm text-red-600">
              {error}
            </p>
          )}

          {!loading && modules.length === 0 && (
            <p className="mt-2 text-sm text-neutral-500">
              No modules found for this course.
            </p>
          )}
        </div>
      )}

      {/* Lecture Form */}
      {selectedModuleId ? (
        <LectureForm moduleId={selectedModuleId} />
      ) : (
        <p className="rounded-xl bg-neutral-50 p-4 text-sm text-neutral-500">
          Please select a module to create and manage lectures.
        </p>
      )}

    </div>
  );
}

export default LectureWorkspace;
