
import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getCourseModules,
  createModule,
  updateModule,
  deleteModule,
} from "../services/moduleService";

// Fetch modules for a course
export const fetchCourseModules = createAsyncThunk(
  "modules/fetchByCourse",
  async (courseId, { rejectWithValue }) => {
    try {
      return await getCourseModules(courseId);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch modules"
      );
    }
  }
);

// Create a module
export const addModule = createAsyncThunk(
  "modules/create",
  async ({ courseId, moduleData }, { rejectWithValue }) => {
    try {
      return await createModule(courseId, moduleData);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create module"
      );
    }
  }
);

// Update a module
export const editModule = createAsyncThunk(
  "modules/update",
  async ({ moduleId, moduleData }, { rejectWithValue }) => {
    try {
      return await updateModule(moduleId, moduleData);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update module"
      );
    }
  }
);

// Delete a module
export const removeModule = createAsyncThunk(
  "modules/delete",
  async (moduleId, { rejectWithValue }) => {
    try {
      await deleteModule(moduleId);
      return moduleId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete module"
      );
    }
  }
);
