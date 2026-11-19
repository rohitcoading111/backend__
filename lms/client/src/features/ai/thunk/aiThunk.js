import { createAsyncThunk } from "@reduxjs/toolkit";
import { streamAIChat } from "../services/ai.services.js";

export const sendAIMessage = createAsyncThunk(
    "ai/sendMessage",
    async ({ question }, { rejectWithValue }) => {
        try {
            const response = await streamAIChat(question);

            return response;

        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                error.message ||
                "Failed to generate AI response"
            );
        }
    }
);
