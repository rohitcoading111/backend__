import api from "../../../services/api";

// Dashboard ki overall learning summary
export const getLearningSummary = async () => {
  const response = await api.get("/progress/summary");
  return response.data;
};

// Kisi particular course ki progress
export const getCourseProgress = async (courseId) => {
  const response = await api.get(`/progress/course/${courseId}`);
  return response.data;
};

// Lecture ko complete mark karna
export const markLectureComplete = async (lectureId) => {
  const response = await api.patch(
    `/progress/lecture/${lectureId}/complete`
  );

  return response.data;
};
