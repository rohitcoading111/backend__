import { createAsyncThunk } from "@reduxjs/toolkit";
import dsaService from "../services/dsaService";

// Get All DSA Questions
export const getAllDsaQuestions = createAsyncThunk(
  "dsa/getAllQuestions",
  async (params, { rejectWithValue }) => {
    try {
      const response = await dsaService.getAllDsaQuestions(params);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch DSA questions. Please try again."
      );
    }
  }
);

// Get Single DSA Question
export const getSingleDsaQuestion = createAsyncThunk(
  "dsa/getSingleQuestion",
  async (questionId, { rejectWithValue }) => {
    try {
      return await dsaService.getSingleDsaQuestion(questionId);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch question."
      );
    }
  }
);

// Create DSA Question
export const createDsaQuestion = createAsyncThunk(
  "dsa/createQuestion",
  async (questionData, { rejectWithValue }) => {
    try {
      return await dsaService.createDsaQuestion(questionData);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to create question."
      );
    }
  }
);

// Update DSA Question
export const updateDsaQuestion = createAsyncThunk(
  "dsa/updateQuestion",
  async ({ questionId, updateData }, { rejectWithValue }) => {
    try {
      return await dsaService.updateDsaQuestion(questionId, updateData);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to update question."
      );
    }
  }
);

// Delete DSA Question
export const deleteDsaQuestion = createAsyncThunk(
  "dsa/deleteQuestion",
  async (questionId, { rejectWithValue }) => {
    try {
      return await dsaService.deleteDsaQuestion(questionId);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete question."
      );
    }
  }
);

// Mark Question Solved
export const markQuestionSolved = createAsyncThunk(
  "dsa/markSolved",
  async (questionId, { rejectWithValue }) => {
    try {
      return await dsaService.markQuestionSolved(questionId);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to mark question solved."
      );
    }
  }
);

// Get Student DSA Progress
export const getStudentDsaProgress = createAsyncThunk(
  "dsa/getStudentProgress",
  async (_, { rejectWithValue }) => {
    try {
      return await dsaService.getStudentDsaProgress();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch progress."
      );
    }
  }
);

// Get Due Revisions
export const getDueRevisions = createAsyncThunk(
  "dsa/getDueRevisions",
  async (_, { rejectWithValue }) => {
    try {
      return await dsaService.getDueRevisions();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch due revisions."
      );
    }
  }
);

// Mark Question Revised
export const markQuestionRevised = createAsyncThunk(
  "dsa/markRevised",
  async (questionId, { rejectWithValue }) => {
    try {
      return await dsaService.markQuestionRevised(questionId);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to mark revision."
      );
    }
  }
);

// Get Student DSA Revision History
export const getStudentDsaRevisionHistory = createAsyncThunk(
  "dsa/getRevisionHistory",
  async (_, { rejectWithValue }) => {
    try {
      return await dsaService.getStudentDsaRevisionHistory();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch revision history."
      );
    }
  }
);
