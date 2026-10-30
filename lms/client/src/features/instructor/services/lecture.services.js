
import api from "../../../services/api";

export const createLectureService = async (moduleId, formData) => {
  const response = await api.post(
    `/modules/${moduleId}/lectures`,
    formData
  );

  return response.data;
};

// Get all lectures of a module
export const getLecturesService = async (moduleId) => {

  const response = api.get(`/lectures/module/${moduleId}`);
  return (await response).data;

};