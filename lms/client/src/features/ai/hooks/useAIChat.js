import { useDispatch, useSelector } from "react-redux";
import {
    addUserMessage,
    addAIChunk,
} from "../aiSclice/aiSlice.js";
import api from "../../../services/api";

const useAIChat = () => {
    const dispatch = useDispatch();

    const { messages, loading, error } = useSelector(
        (state) => state.ai
    );

    const sendMessage = async (question) => {
        if (!question.trim() || loading) return;

        try {
            // Add user's message
            dispatch(addUserMessage(question));

            // Send question to backend
            const response = await fetch(
                `${api.defaults.baseURL}/ai/chat`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ question }),
                }
            );

            if (!response.ok) {
                throw new Error("AI request failed");
            }

            if (!response.body) {
                throw new Error("Streaming is not supported");
            }

            // Read streaming response
            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            while (true) {
                const { done, value } = await reader.read();

                if (done) break;

                const chunk = decoder.decode(value, {
                    stream: true,
                });

                if (chunk) {
                    dispatch(addAIChunk(chunk));
                }
            }

            const remaining = decoder.decode();

            if (remaining) {
                dispatch(addAIChunk(remaining));
            }

        } catch (err) {
            console.error("AI Chat Error:", err);
        }
    };

    return {
        messages,
        loading,
        error,
        sendMessage,
    };
};

export default useAIChat;
 