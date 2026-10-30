
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInstructorCourses } from "../thunks/instructorThunk";

function LiveSessionWorkspace() {
  const dispatch = useDispatch();

  // Redux se courses, loading aur error lena
  const { courses, loading, error } = useSelector(
    (state) => state.instructor
  );

  // Selected course ki ID store karna
  const [selectedCourseId, setSelectedCourseId] = useState("");

  // Component load hone par courses fetch karna
  useEffect(() => {
    dispatch(fetchInstructorCourses());
  }, [dispatch]);

  const handleCourseChange = (e) => {
    setSelectedCourseId(e.target.value);
  };

  const selectedCourse = courses.find(
    (course) => course._id === selectedCourseId
  );

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">
        Live Session
      </h1>

      <p className="text-gray-500 mb-6">
        Select a course to start your live class.
      </p>

      <div className="bg-white border rounded-xl p-6 shadow-sm">

        <label className="block font-medium mb-2">
          Select Course
        </label>

        <select
          value={selectedCourseId}
          onChange={handleCourseChange}
          disabled={loading}
          className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">
            Choose a course
          </option>

          {courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.title}
            </option>
          ))}
        </select>

        {loading && (
          <p className="text-sm text-gray-500 mt-2">
            Loading courses...
          </p>
        )}

        {error && (
          <p className="text-sm text-red-500 mt-2">
            {error}
          </p>
        )}

        {selectedCourse && (
          <div className="mt-5 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold">
              {selectedCourse.title}
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Course selected successfully.
            </p>
          </div>
        )}

        <button
          disabled={!selectedCourseId}
          className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg disabled:opacity-50"
        >
          Start Live Session
        </button>

      </div>
    </div>
  );
}

export default LiveSessionWorkspace;
