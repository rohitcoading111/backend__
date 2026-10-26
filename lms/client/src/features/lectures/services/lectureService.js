
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
