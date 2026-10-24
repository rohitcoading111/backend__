
import api from "../../../services/api";

// Endpoint backend routes dekhne ke baad confirm karenge.
export const getPublishedCourses = async () => {
  const response = await api.get("/courses/published");
  return response.data;
};
