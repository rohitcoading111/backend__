
import { createSlice } from "@reduxjs/toolkit";

import {
  getAllDsaQuestions,
  getSingleDsaQuestion,
  createDsaQuestion,
  updateDsaQuestion,
  deleteDsaQuestion,
  markQuestionSolved,
  getStudentDsaProgress,
  getDueRevisions,
  markQuestionRevised,
  getStudentDsaRevisionHistory
} from "../dsaThunk/dsaThunk";

const initialState = {
  questions: [],
  selectedQuestion: null,
  pagination: null,

  progress: null,
  dueRevisions: [],
  revisionHistory: [],

  loading: false,
  error: null,

  mutationLoading: false,
  mutationError: null
};

const dsaSlice = createSlice({
  name: "dsa",
  initialState,

  extraReducers: (builder) => {

    // GET ALL QUESTIONS
    builder
      .addCase(getAllDsaQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllDsaQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload.data.questions;
        state.pagination = action.payload.data.pagination;
      })
      .addCase(getAllDsaQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // GET SINGLE QUESTION
      .addCase(getSingleDsaQuestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleDsaQuestion.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedQuestion = action.payload.data;
      })
      .addCase(getSingleDsaQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // CREATE QUESTION
      .addCase(createDsaQuestion.pending, (state) => {
        state.mutationLoading = true;
        state.mutationError = null;
      })
      .addCase(createDsaQuestion.fulfilled, (state, action) => {
        state.mutationLoading = false;
        state.questions.unshift(action.payload.data);
      })
      .addCase(createDsaQuestion.rejected, (state, action) => {
        state.mutationLoading = false;
        state.mutationError = action.payload || action.error.message;
      })

      // UPDATE QUESTION
      .addCase(updateDsaQuestion.pending, (state) => {
        state.mutationLoading = true;
        state.mutationError = null;
      })
      .addCase(updateDsaQuestion.fulfilled, (state, action) => {
        state.mutationLoading = false;

        const updatedQuestion = action.payload.data;

        state.questions = state.questions.map((question) =>
          question._id === updatedQuestion._id
            ? updatedQuestion
            : question
        );

        if (state.selectedQuestion?._id === updatedQuestion._id) {
          state.selectedQuestion = updatedQuestion;
        }
      })
      .addCase(updateDsaQuestion.rejected, (state, action) => {
        state.mutationLoading = false;
        state.mutationError = action.payload || action.error.message;
      })

      // DELETE QUESTION
      .addCase(deleteDsaQuestion.pending, (state) => {
        state.mutationLoading = true;
        state.mutationError = null;
      })
      .addCase(deleteDsaQuestion.fulfilled, (state, action) => {
        state.mutationLoading = false;

        const deletedId = action.meta.arg;

        state.questions = state.questions.filter(
          (question) => question._id !== deletedId
        );
      })
      .addCase(deleteDsaQuestion.rejected, (state, action) => {
        state.mutationLoading = false;
        state.mutationError = action.payload || action.error.message;
      })

      // MARK QUESTION SOLVED
      .addCase(markQuestionSolved.pending, (state) => {
        state.mutationLoading = true;
        state.mutationError = null;
      })
      .addCase(markQuestionSolved.fulfilled, (state) => {
        state.mutationLoading = false;
      })
      .addCase(markQuestionSolved.rejected, (state, action) => {
        state.mutationLoading = false;
        state.mutationError = action.payload || action.error.message;
      })

      // GET STUDENT PROGRESS
      .addCase(getStudentDsaProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStudentDsaProgress.fulfilled, (state, action) => {
        state.loading = false;
        state.progress = action.payload.data;
      })
      .addCase(getStudentDsaProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // GET DUE REVISIONS
      .addCase(getDueRevisions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDueRevisions.fulfilled, (state, action) => {
        state.loading = false;
        state.dueRevisions = action.payload.data;
      })
      .addCase(getDueRevisions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // MARK QUESTION REVISED
      .addCase(markQuestionRevised.pending, (state) => {
        state.mutationLoading = true;
        state.mutationError = null;
      })
      .addCase(markQuestionRevised.fulfilled, (state) => {
        state.mutationLoading = false;
      })
      .addCase(markQuestionRevised.rejected, (state, action) => {
        state.mutationLoading = false;
        state.mutationError = action.payload || action.error.message;
      })

      // GET REVISION HISTORY
      .addCase(getStudentDsaRevisionHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStudentDsaRevisionHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.revisionHistory = action.payload.data;
      })
      .addCase(getStudentDsaRevisionHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  }
});

export default dsaSlice.reducer;
