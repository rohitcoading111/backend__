import { createAsyncThunk } from "@reduxjs/toolkit";
import dsaService from "../services/dsaService";
import { getRequestErrorMessage } from "../../../utils/errorHandler";

// Get All DSA Questions
export const getAllDsaQuestions = createAsyncThunk(
    "dsa/getAllQuestions",
    async (params, { rejectWithValue }) => {
        try {
            const response = await dsaService.getAllDsaQuestions(params);
            return response;
        } catch (error) {
            return rejectWithValue(
                getRequestErrorMessage(
                    error,
                    "Failed to fetch DSA questions. Please try again."
                )
            );
        }
    }
);


export const getSingleDsaQuestion = createAsyncThunk(
  "dsa/getSingleQuestion",
  async (questionId, { rejectWithValue }) => {
    try {
      return await dsaService.getSingleDsaQuestion(questionId);
    } catch (error) {
      return rejectWithValue(
        getRequestErrorMessage(error, "Failed to fetch question.")
      );
    }
  }
);

export const createDsaQuestion = createAsyncThunk(
  "dsa/createQuestion",
  async (questionData, { rejectWithValue }) => {
    try {
      return await dsaService.createDsaQuestion(questionData);
    } catch (error) {
      return rejectWithValue(
        getRequestErrorMessage(error, "Failed to create question.")
      );
    }
  }
);

export const updateDsaQuestion = createAsyncThunk(
  "dsa/updateQuestion",
  async ({ questionId, updateData }, { rejectWithValue }) => {
    try {
      return await dsaService.updateDsaQuestion(questionId, updateData);
    } catch (error) {
      return rejectWithValue(
        getRequestErrorMessage(error, "Failed to update question.")
      );
    }
  }
);

export const deleteDsaQuestion = createAsyncThunk(
  "dsa/deleteQuestion",
  async (questionId, { rejectWithValue }) => {
    try {
      return await dsaService.deleteDsaQuestion(questionId);
    } catch (error) {
      return rejectWithValue(
        getRequestErrorMessage(error, "Failed to delete question.")
      );
    }
  }
);

export const markQuestionSolved = createAsyncThunk(
  "dsa/markSolved",
  async (questionId, { rejectWithValue }) => {
    try {
      return await dsaService.markQuestionSolved(questionId);
    } catch (error) {
      return rejectWithValue(
        getRequestErrorMessage(error, "Failed to mark question solved.")
      );
    }
  }
);

export const getStudentDsaProgress = createAsyncThunk(
  "dsa/getStudentProgress",
  async (_, { rejectWithValue }) => {
    try {
      return await dsaService.getStudentDsaProgress();
    } catch (error) {
      return rejectWithValue(
        getRequestErrorMessage(error, "Failed to fetch progress.")
      );
    }
  }
);

export const getDueRevisions = createAsyncThunk(
  "dsa/getDueRevisions",
  async (_, { rejectWithValue }) => {
    try {
      return await dsaService.getDueRevisions();
    } catch (error) {
      return rejectWithValue(
        getRequestErrorMessage(error, "Failed to fetch due revisions.")
      );
    }
  }
);

export const markQuestionRevised = createAsyncThunk(
  "dsa/markRevised",
  async (questionId, { rejectWithValue }) => {
    try {
      return await dsaService.markQuestionRevised(questionId);
    } catch (error) {
      return rejectWithValue(
        getRequestErrorMessage(error, "Failed to mark revision.")
      );
    }
  }
);

export const getStudentDsaRevisionHistory = createAsyncThunk(
  "dsa/getRevisionHistory",
  async (_, { rejectWithValue }) => {
    try {
      return await dsaService.getStudentDsaRevisionHistory();
    } catch (error) {
      return rejectWithValue(
        getRequestErrorMessage(error, "Failed to fetch revision history.")
      );
    }
  }
);
