import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchInstructorCourses,
  removeInstructorCourse,
  publishInstructorCourse,
  unpublishInstructorCourse,
} from "../thunks/instructorThunk.js";

export default function useInstructorCourses() {
  const dispatch = useDispatch();

  const { courses: storedCourses, loading, error } = useSelector(
    (state) => state.instructor
  );

  const user = useSelector((state) => state.auth.user);

  const courses = Array.isArray(storedCourses)
    ? storedCourses
    : [];

  const currentInstructorId = user?.id || user?._id;

  // Fetch organization courses or personal courses.
  // Backend decides which courses the user can access.
  const refreshCourses = useCallback(() => {
    return dispatch(fetchInstructorCourses()).unwrap();
  }, [dispatch]);

  useEffect(() => {
    refreshCourses().catch(() => {});
  }, [refreshCourses]);

  // Find a course by MongoDB ID.
  const getCourseById = useCallback(
    (courseId) => {
      return courses.find(
        (course) => String(course._id) === String(courseId)
      );
    },
    [courses]
  );

  // Ownership calculation.
  const isCourseOwner = useCallback(
    (courseOrId) => {
      const course =
        courseOrId && typeof courseOrId === "object"
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
        Boolean(ownerId) &&
        String(ownerId) === String(currentInstructorId)
      );
    },
    [currentInstructorId, getCourseById]
  );

  // Attach ownership information to each course.
  const coursesWithOwnership = useMemo(
    () =>
      courses.map((course) => ({
        ...course,
        isOwner: isCourseOwner(course),
      })),
    [courses, isCourseOwner]
  );

  // Check ownership before write actions.
  const ensureOwnership = (courseId) => {
    if (!isCourseOwner(courseId)) {
      throw new Error(
        "You can only manage courses created by you."
      );
    }
  };

  // Delete own course.
  const handleDelete = async (courseId) => {
    ensureOwnership(courseId);

    return dispatch(
      removeInstructorCourse(courseId)
    ).unwrap();
  };

  // Publish own course.
  const handlePublish = async (courseId) => {
    ensureOwnership(courseId);

    return dispatch(
      publishInstructorCourse(courseId)
    ).unwrap();
  };

  // Unpublish own course.
  const handleUnpublish = async (courseId) => {
    ensureOwnership(courseId);

    return dispatch(
      unpublishInstructorCourse(courseId)
    ).unwrap();
  };

  return {
    courses,
    coursesWithOwnership,
    currentInstructorId,

    loading,
    error,

    refreshCourses,
    getCourseById,
    isCourseOwner,

    handleDelete,
    handlePublish,
    handleUnpublish,
  };
}