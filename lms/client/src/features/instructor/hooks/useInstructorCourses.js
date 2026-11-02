import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";

import {
  fetchInstructorCourses,
  removeInstructorCourse,
  publishInstructorCourse,
  unpublishInstructorCourse,
} from "../thunks/instructorThunk.js";

export default function useInstructorCourses() {
  const dispatch = useDispatch();

  const { courses, loading, error } = useSelector(
    (state) => state.instructor
  );

  const user = useSelector((state) => state.auth.user);

  const currentInstructorId = user?.id || user?._id;

  // Fetch all courses available to this instructor.
  // Backend decides organization scope.
  const refreshCourses = useCallback(() => {
    return dispatch(fetchInstructorCourses()).unwrap();
  }, [dispatch]);

  useEffect(() => {
    refreshCourses().catch(() => {});
  }, [refreshCourses]);

  // Find course by ID
  const getCourseById = useCallback(
    (courseId) => {
      return courses.find(
        (course) => String(course._id) === String(courseId)
      );
    },
    [courses]
  );

  // Check course ownership
  const isCourseOwner = useCallback(
    (courseOrId) => {
      const course =
        typeof courseOrId === "object"
          ? courseOrId
          : getCourseById(courseOrId);

      if (!course || !currentInstructorId) {
        return false;
      }

      const ownerId =
        typeof course.instructor === "object"
          ? course.instructor?._id || course.instructor?.id
          : course.instructor;

      return (
        String(ownerId) === String(currentInstructorId)
      );
    },
    [currentInstructorId, getCourseById]
  );

  // Common ownership validation
  const ensureOwnership = (courseId) => {
    if (!isCourseOwner(courseId)) {
      throw new Error(
        "You can only manage courses created by you."
      );
    }
  };

  // Delete own course only
  const handleDelete = async (courseId) => {
    ensureOwnership(courseId);

    return dispatch(
      removeInstructorCourse(courseId)
    ).unwrap();
  };

  // Publish own course only
  const handlePublish = async (courseId) => {
    ensureOwnership(courseId);

    return dispatch(
      publishInstructorCourse(courseId)
    ).unwrap();
  };

  // Unpublish own course only
  const handleUnpublish = async (courseId) => {
    ensureOwnership(courseId);

    return dispatch(
      unpublishInstructorCourse(courseId)
    ).unwrap();
  };

  return {
    courses,
    loading,
    error,

    currentInstructorId,

    refreshCourses,
    getCourseById,
    isCourseOwner,

    handleDelete,
    handlePublish,
    handleUnpublish,
  };
}