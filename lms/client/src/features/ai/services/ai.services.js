import api from "../../../services/api";

export const streamAIChat = async (question) => {
    const response = await api.post("/ai/chat", {
        question,
    });

    return response.data;
};
