import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getAllInterviewQuestions,
  getSingleInterviewQuestion,
  markQuestionCompleted,
  getMyInterviewProgress,
} from "../services/interviewPrepService";

// Fetch all questions
export const fetchInterviewQuestions = createAsyncThunk(
  "interviewPrep/fetchQuestions",
  async (params = {}, { rejectWithValue }) => {
    try {
      return await getAllInterviewQuestions(params);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch interview questions"
      );
    }
  }
);

// Fetch single question
export const fetchSingleInterviewQuestion = createAsyncThunk(
  "interviewPrep/fetchSingleQuestion",
  async (questionId, { rejectWithValue }) => {
    try {
      return await getSingleInterviewQuestion(questionId);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch question"
      );
    }
  }
);

// Mark question completed
export const completeInterviewQuestion = createAsyncThunk(
  "interviewPrep/completeQuestion",
  async (questionId, { rejectWithValue }) => {
    try {
      return await markQuestionCompleted(questionId);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to mark question as completed"
      );
    }
  }
);

// Fetch user's progress
export const fetchMyInterviewProgress = createAsyncThunk(
  "interviewPrep/fetchProgress",
  async (_, { rejectWithValue }) => {
    try {
      return await getMyInterviewProgress();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch interview progress"
      );
    }
  }
);