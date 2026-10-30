
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createLectureService } from "../services/lecture.services";

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
