import api from "../../../services/api.js";

export const getCourseModulesForProgress = async (courseId) => {
  const response = await api.get(
    `/modules/courses/${courseId}/modules`
  );

  return response.data;
};

export const getModuleLecturesForProgress = async (moduleId) => {
  const response = await api.get(
    `/lectures/module/${moduleId}`
  );

  return response.data;
};