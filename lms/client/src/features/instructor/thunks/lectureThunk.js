
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createLectureService,
  getLecturesService,
  updateLectureService,
  deleteLectureService
} from "../services/lecture.services";

export const createLectureThunk = createAsyncThunk(
  "lectures/create",
  async ({ moduleId, formData }, thunkAPI) => {
    try {
      return await createLectureService(moduleId, formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create lecture"
      );
    }
  }
);


export const getLecturesThunk = createAsyncThunk(
  "lectures/fetch",
  async (moduleId, thunkAPI) => {
    try {
      return await getLecturesService(moduleId);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch lectures"
      );
    }
  }
);

export const updateLectureThunk = createAsyncThunk(
  "lectures/update",
  async ({ lectureId, formData }, thunkAPI) => {
    try {
      return await updateLectureService(lectureId, formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update lecture"
      );
    }
  }
);

export const deleteLectureThunk = createAsyncThunk(
  "lectures/delete",
  async (lectureId, thunkAPI) => {
    try {
      return await deleteLectureService(lectureId);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete lecture"
      );
    }
  }
);