
import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  createLiveSessionService,
  getActiveLiveSessionService,
  endLiveSessionService,
  getLiveKitRoomService,
} from "../services/liveSession.services";

// 1. Create live session
export const createLiveSessionThunk = createAsyncThunk(
  "liveSession/create",
  async (courseId, thunkAPI) => {
    try {
      return await createLiveSessionService(courseId);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create live session"
      );
    }
  }
);

// 2. Get active live session
export const getActiveLiveSessionThunk = createAsyncThunk(
  "liveSession/getActive",
  async (courseId, thunkAPI) => {
    try {
      return await getActiveLiveSessionService(courseId);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch active session"
      );
    }
  }
);

// 3. End live session
export const endLiveSessionThunk = createAsyncThunk(
  "liveSession/end",
  async (sessionId, thunkAPI) => {
    try {
      return await endLiveSessionService(sessionId);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to end live session"
      );
    }
  }
);

// 4. Get LiveKit room
export const getLiveKitRoomThunk = createAsyncThunk(
  "liveSession/getRoom",
  async (roomId, thunkAPI) => {
    try {
      return await getLiveKitRoomService(roomId);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch LiveKit room"
      );
    }
  }
);
