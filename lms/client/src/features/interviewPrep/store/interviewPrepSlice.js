import { createSlice } from "@reduxjs/toolkit";

import {
  fetchInterviewQuestions,
  fetchSingleInterviewQuestion,
  completeInterviewQuestion,
  fetchMyInterviewProgress,
} from "../thunks/interviewPrepThunk";

const initialState = {
  questions: [],
  pagination: null,
  selectedQuestion: null,
  progress: [],

  loading: false,
  singleQuestionLoading: false,
  progressLoading: false,
  completionLoading: false,

  error: null,
};

const interviewPrepSlice = createSlice({
  name: "interviewPrep",
  initialState,

  reducers: {
    clearSelectedQuestion: (state) => {
      state.selectedQuestion = null;
    },

    clearInterviewPrepError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    // Fetch All Questions
    builder
      .addCase(fetchInterviewQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInterviewQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload.questions;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchInterviewQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch Single Question
    builder
      .addCase(fetchSingleInterviewQuestion.pending, (state) => {
        state.singleQuestionLoading = true;
        state.error = null;
      })
      .addCase(fetchSingleInterviewQuestion.fulfilled, (state, action) => {
        state.singleQuestionLoading = false;
        state.selectedQuestion = action.payload.question;
      })
      .addCase(fetchSingleInterviewQuestion.rejected, (state, action) => {
        state.singleQuestionLoading = false;
        state.error = action.payload;
      });

    // Mark Question Completed
    builder
      .addCase(completeInterviewQuestion.pending, (state) => {
        state.completionLoading = true;
        state.error = null;
      })
      .addCase(completeInterviewQuestion.fulfilled, (state, action) => {
        state.completionLoading = false;

        const completedProgress = action.payload.progress;

        const alreadyExists = state.progress.some(
          (item) => item.questionId === completedProgress.questionId
        );

        if (!alreadyExists) {
          state.progress.push(completedProgress);
        }
      })
      .addCase(completeInterviewQuestion.rejected, (state, action) => {
        state.completionLoading = false;
        state.error = action.payload;
      });

    // Fetch User Progress
    builder
      .addCase(fetchMyInterviewProgress.pending, (state) => {
        state.progressLoading = true;
        state.error = null;
      })
      .addCase(fetchMyInterviewProgress.fulfilled, (state, action) => {
        state.progressLoading = false;
        state.progress = action.payload.progress;
      })
      .addCase(fetchMyInterviewProgress.rejected, (state, action) => {
        state.progressLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearSelectedQuestion,
  clearInterviewPrepError,
} = interviewPrepSlice.actions;

export default interviewPrepSlice.reducer;