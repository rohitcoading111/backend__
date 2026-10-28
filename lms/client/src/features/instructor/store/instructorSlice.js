
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const instructorSlice = createSlice({
  name: "instructor",

  initialState: {
    courses: [],
    loading: false,
    error: null,
  },

  reducers: {
    clearInstructorError(state) {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // Fetch courses
      .addCase(fetchInstructorCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInstructorCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(fetchInstructorCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create course
      .addCase(addInstructorCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addInstructorCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.courses.unshift(action.payload);
      })
      .addCase(addInstructorCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update course
      .addCase(editInstructorCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editInstructorCourse.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.courses.findIndex(
          (course) => course._id === action.payload._id
        );

        if (index !== -1) {
          state.courses[index] = action.payload;
        }
      })
      .addCase(editInstructorCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete course
      .addCase(removeInstructorCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeInstructorCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = state.courses.filter(
          (course) => course._id !== action.payload
        );
      })
      .addCase(removeInstructorCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Publish course
      .addCase(publishInstructorCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(publishInstructorCourse.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.courses.findIndex(
          (course) => course._id === action.payload._id
        );

        if (index !== -1) {
          state.courses[index] = action.payload;
        }
      })
      .addCase(publishInstructorCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Unpublish course
      .addCase(unpublishInstructorCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(unpublishInstructorCourse.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.courses.findIndex(
          (course) => course._id === action.payload._id
        );

        if (index !== -1) {
          state.courses[index] = action.payload;
        }
      })
      .addCase(unpublishInstructorCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearInstructorError } = instructorSlice.actions;

export default instructorSlice.reducer;
