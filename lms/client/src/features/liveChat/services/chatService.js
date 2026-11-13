
import api from "../../../services/api";

const chatService = {
  // 1. Get live chat history
  getChatHistory: async (liveSessionId, params = {}) => {
    const response = await api.get(
      `/chat/live/${liveSessionId}`,
      {
        params: {
          limit: params.limit || 50,
          before: params.before,
        },
      }
    );

    return response.data;
  },
};

export default chatService;
