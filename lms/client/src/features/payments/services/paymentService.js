import api from "../../../services/api";

export const createPayment = async (courseId) => {
  const response = await api.post("/payments/create", { courseId });
  return response.data;
};

export const verifyPayment = async (data) => {
  const response = await api.post("/payments/verify", data);
  return response.data;
};