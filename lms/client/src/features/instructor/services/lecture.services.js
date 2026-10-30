
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
  const response = await api.get(`/lectures/module/${moduleId}`);
  return response.data;
};


// Update Lecture
export const updateLectureService = async (lectureId, formData) => {
  const response = await api.patch(
    `/lectures/${lectureId}`,
    formData
  );

  return response.data;
};

// Delete Lecture
export const deleteLectureService = async (lectureId) => {
  const response = await api.delete(
    `/lectures/${lectureId}`
  );

  return response.data;
};