
import api from "../../../services/api";

// Fetch all lectures belonging to a specific module
export const getModuleLectures = async (moduleId) => {
  if (!moduleId) {
    throw new Error("Module ID is required.");
  }

  const response = await api.get(
    `/lectures/module/${moduleId}`
  );

  return response.data;
};



export const getLectureVideo = async (lectureId) => {
  if (!lectureId) {
    throw new Error("Lecture ID is required.");
  }

  const response = await api.get(
    `/lectures/${lectureId}/video`
  );

  return response.data;
};


export const completeLecture = async (lectureId) => {
  const response = await api.patch(
    `/lectures/${lectureId}/complete`
  );

  return response.data;
};