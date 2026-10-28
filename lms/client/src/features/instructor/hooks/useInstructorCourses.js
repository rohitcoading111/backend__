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

  const refreshCourses = useCallback(() => {
    return dispatch(fetchInstructorCourses()).unwrap();
  }, [dispatch]);

  useEffect(() => {
    refreshCourses().catch(() => {});
  }, [refreshCourses]);

  const handleDelete = (courseId) =>
    dispatch(removeInstructorCourse(courseId)).unwrap();

  const handlePublish = (courseId) =>
    dispatch(publishInstructorCourse(courseId)).unwrap();

  const handleUnpublish = (courseId) =>
    dispatch(unpublishInstructorCourse(courseId)).unwrap();

  return {
    courses,
    loading,
    error,
    refreshCourses,
    handleDelete,
    handlePublish,
    handleUnpublish,
  };
}