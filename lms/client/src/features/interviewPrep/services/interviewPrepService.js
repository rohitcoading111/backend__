import api from "../../../services/api";

// Get all interview questions
export const getAllInterviewQuestions = async (params = {}) => {
  const response = await api.get("/interview/questions", { params });
  return response.data;
};

// Get single interview question
export const getSingleInterviewQuestion = async (questionId) => {
  const response = await api.get(`/interview/questions/${questionId}`);
  return response.data;
};

// Mark question as completed
export const markQuestionCompleted = async (questionId) => {
  const response = await api.post(
    `/interview/questions/${questionId}/complete`
  );

  return response.data;
};

// Get logged-in user's interview progress
export const getMyInterviewProgress = async () => {
  const response = await api.get("/interview/progress");
  return response.data;
};