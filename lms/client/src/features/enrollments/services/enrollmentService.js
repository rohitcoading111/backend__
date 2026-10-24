import api from "../../../services/api";

export const getMyEnrollments = async () => {
  const response = await api.get("/enrollments/my-enrollments");
  return response.data;
};