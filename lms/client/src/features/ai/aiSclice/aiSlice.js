import { createSlice } from "@reduxjs/toolkit";
import { sendAIMessage } from "./aiThunk";

const initialState = {
    messages: [],
    loading: false,
    error: null,
};

const aiSlice = createSlice({
    name: "ai",
    initialState,

    reducers: {
        addUserMessage: (state, action) => {
            state.messages.push({
                id: Date.now(),
                role: "user",
                content: action.payload,
            });
        },

        addAIChunk: (state, action) => {
            const lastMessage = state.messages[state.messages.length - 1];

            if (lastMessage && lastMessage.role === "assistant") {
                lastMessage.content += action.payload;
            } else {
                state.messages.push({
                    id: Date.now(),
                    role: "assistant",
                    content: action.payload,
                });
            }
        },

        clearChat: (state) => {
            state.messages = [];
            state.error = null;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(sendAIMessage.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(sendAIMessage.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(sendAIMessage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const {
    addUserMessage,
    addAIChunk,
    clearChat,
} = aiSlice.actions;

export default aiSlice.reducer;
