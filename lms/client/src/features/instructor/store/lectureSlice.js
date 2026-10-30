
import { createSlice } from "@reduxjs/toolkit";
import {
  createLectureThunk,
  getLecturesThunk
} from "../thunks/lectureThunk";

const lecture = createSlice({
  name: "lecture",

  initialState: {
    lecture: null,
    loading: false,
    error: null,
    lectures: []
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
        state.lecture = action.payload.data.lecture;
        state.lectures.unshift(action.payload.data.lecture);
      })

      .addCase(createLectureThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })// Fetch lectures
      .addCase(getLecturesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
})

      .addCase(getLecturesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.lectures = action.payload.data.lectures;
})

      .addCase(getLecturesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
        });  
       },
  
});

export const { clearLectureError } = lecture.actions;

export default lecture.reducer;
