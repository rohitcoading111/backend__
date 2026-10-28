import { useDispatch, useSelector } from "react-redux";

import {
  addInstructorCourse,
  editInstructorCourse,
} from "../thunks/instructorThunk";

function useCourseForm(initialCourse) {
  const dispatch = useDispatch();

  const loading = useSelector(
    (state) => state.instructor.loading
  );

  const error = useSelector(
    (state) => state.instructor.error
  );

  const submitCourse = async (courseData) => {
    const formData = new FormData();

    formData.append("title", courseData.title);
    formData.append("description", courseData.description);
    formData.append("price", courseData.price);
    formData.append("category", courseData.category);
    formData.append("level", courseData.level);

    if (courseData.thumbnail) {
      formData.append("thumbnail", courseData.thumbnail);
    }

    if (initialCourse?._id) {
      return await dispatch(
        editInstructorCourse({
          courseId: initialCourse._id,
          formData,
        })
      ).unwrap();
    }

    return await dispatch(
      addInstructorCourse(formData)
    ).unwrap();
  };

  return {
    submitCourse,
    loading,
    error,
  };
}

export default useCourseForm;
