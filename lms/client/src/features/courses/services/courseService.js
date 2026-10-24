import api from "../../../services/api";

export const getPublishedCourses = async () => {
  const response = await api.get("/courses/published");
  return response.data;
};
