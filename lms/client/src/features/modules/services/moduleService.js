import api from "../../../services/api";

export const getCourseModules = async (courseId) => {
  const response = await api.get(
    `/modules/courses/${courseId}/modules`
  );

  return response.data;
};