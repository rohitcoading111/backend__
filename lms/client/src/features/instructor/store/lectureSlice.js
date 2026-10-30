
import { createSlice } from "@reduxjs/toolkit";
import { createLectureThunk } from "../thunks/lectureThunk";

const lecture = createSlice({
  name: "lecture",

  initialState: {
    lecture: null,
    loading: false,
    error: null,
  },

  reducers: {
    clearLectureError(state) {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createLectureThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createLectureThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.lecture = action.payload;
      })

      .addCase(createLectureThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearLectureError } = lecture.actions;

export default lecture.reducer;
