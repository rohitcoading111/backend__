
import { useSelector } from "react-redux";
import useLiveSession from "../hooks/useLiveSession";

function LiveSessionWorkspace() {
  const { courses } = useSelector(
    (state) => state.instructor
  );

  const {
    selectedCourseId,
    setSelectedCourseId,
    handleStartLive,
    loading,
    error,
  } = useLiveSession();

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">
        Live Classes
      </h1>

      <p className="text-gray-500 mb-6">
        Select a course and start your live session.
      </p>

      <div className="bg-white border rounded-xl p-6">

        <label className="block font-medium mb-2">
          Select Course
        </label>

        <select
          value={selectedCourseId}
          onChange={(e) => setSelectedCourseId(e.target.value)}
          className="w-full border rounded-lg p-3"
          disabled={loading}
        >
          <option value="">Choose a course</option>

          {courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.title}
            </option>
          ))}
        </select>

        {error && (
          <p className="text-red-500 mt-3">{error}</p>
        )}

        <button
          onClick={handleStartLive}
          disabled={!selectedCourseId || loading}
          className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg disabled:opacity-50"
        >
          {loading ? "Starting..." : "Start Live Session"}
        </button>

      </div>
    </div>
  );
}

export default LiveSessionWorkspace;
