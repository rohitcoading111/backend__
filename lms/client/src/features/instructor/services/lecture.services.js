
import api from "../../../services/api";

export const createLectureService = async (moduleId, formData) => {
  const response = await api.post(
    `/modules/${moduleId}/lectures`,
    formData
  );

  return response.data;
};
