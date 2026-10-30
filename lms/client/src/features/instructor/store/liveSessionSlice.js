
import { createSlice } from "@reduxjs/toolkit";

import {
  createLiveSessionThunk,
  getActiveLiveSessionThunk,
  endLiveSessionThunk,
  getLiveKitRoomThunk,
} from "../thunks/liveSessionThunk";

const initialState = {
  session: null,
  activeSession: null,
  token: null,
  liveKitUrl: null,
  room: null,
  loading: false,
  error: null,
};

const liveSessionSlice = createSlice({
  name: "liveSession",
  initialState,
  reducers: {
    clearLiveSessionError(state) {
      state.error = null;
    },

    clearLiveSession(state) {
      state.session = null;
      state.activeSession = null;
      state.token = null;
      state.liveKitUrl = null;
      state.room = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // Create live session
      .addCase(createLiveSessionThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createLiveSessionThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.session = action.payload.session;
        state.token = action.payload.token;
        state.liveKitUrl = action.payload.liveKitUrl;

        state.activeSession = action.payload.session;
      })
      .addCase(createLiveSessionThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get active session
      .addCase(getActiveLiveSessionThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getActiveLiveSessionThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.activeSession = action.payload;
      })
      .addCase(getActiveLiveSessionThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // End live session
      .addCase(endLiveSessionThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(endLiveSessionThunk.fulfilled, (state) => {
        state.loading = false;

        state.session = null;
        state.activeSession = null;
        state.token = null;
        state.liveKitUrl = null;
        state.room = null;
      })
      .addCase(endLiveSessionThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get LiveKit room
      .addCase(getLiveKitRoomThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLiveKitRoomThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.room = action.payload;
      })
      .addCase(getLiveKitRoomThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearLiveSessionError,
  clearLiveSession,
} = liveSessionSlice.actions;

export default liveSessionSlice.reducer;
