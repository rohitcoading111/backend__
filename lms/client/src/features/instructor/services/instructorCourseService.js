import api from "../../../services/api.js";

export const getMyCourses = async () => {
  const response = await api.get("/courses/my-courses");
  return response.data.data.courses;
};

export const createCourse = async (formData) => {
  const response = await api.post("/courses", formData);
  return response.data.data.course;
};

export const updateCourse = async (courseId, formData) => {
  const response = await api.patch(
    `/courses/${courseId}`,
    formData
  );
  return response.data.data.course;
};

export const deleteCourse = async (courseId) => {
  const response = await api.delete(`/courses/${courseId}`);
  return response.data;
};

export const publishCourse = async (courseId) => {
  const response = await api.patch(`/courses/${courseId}/publish`);
  return response.data.data.course;
};

export const unpublishCourse = async (courseId) => {
  const response = await api.patch(`/courses/${courseId}/unpublish`);
  return response.data.data.course;
};