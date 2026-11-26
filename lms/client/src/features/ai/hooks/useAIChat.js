import { useDispatch, useSelector } from "react-redux";
import {
    addUserMessage,
    addAIChunk,
    startAIRequest,
    finishAIRequest,
    setAIError,
} from "../aiSclice/aiSlice.js";
import api from "../../../services/api";

const useAIChat = () => {
    const dispatch = useDispatch();

    const { messages, loading, error } = useSelector(
        (state) => state.ai
    );

    const sendMessage = async (question, image = null) => {
        const prompt = question.trim();
        if ((!prompt && !image) || loading) return;

        try {
            const userMessage = prompt || "Please describe the attached image.";
            dispatch(addUserMessage(
                image ? `${userMessage}\n\n[Image attached: ${image.name}]` : userMessage
            ));
            dispatch(startAIRequest());

            const formData = new FormData();
            formData.append("question", userMessage);
            if (image) {
                formData.append("image", image);
            }

            const response = await fetch(
                `${api.defaults.baseURL}/ai/chat`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (!response.ok) {
                const errorBody = await response.json().catch(() => null);
                throw new Error(
                    errorBody?.message || `AI request failed (${response.status})`
                );
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
            dispatch(setAIError(err.message || "AI response generation failed."));
        } finally {
            dispatch(finishAIRequest());
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
 