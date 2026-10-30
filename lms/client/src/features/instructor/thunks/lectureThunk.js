
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createLectureService,
  getLecturesService,
  updateLectureService
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
  async ({moduleId,formData},thunkAPI)=>{
    try {
      return await updateLectureService(moduleId,formData);
    } catch (error) {
       return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update lecture"
      );
    }
  }
)