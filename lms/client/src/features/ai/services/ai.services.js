import api from "../../../services/api";

export const streamAIChat = async (question) => {
    const response = await api.post("/ai/chat", {
        question,
    });

    return response.data;
};

export const generateAICourse = async (formData) => {
    const response = await api.post("/ai/create-course", formData);
    return response.data.data.course;
};
