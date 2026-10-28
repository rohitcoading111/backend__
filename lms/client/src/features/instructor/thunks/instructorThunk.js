import {
  getMyCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  publishCourse,
  unpublishCourse,
} from "../services/instructorCourseService.js";

// Fetch instructor's courses
export const fetchInstructorCourses = createAsyncThunk(
  "instructor/fetchCourses",
  async (_, { rejectWithValue }) => {
    try {
      return await getMyCourses();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch courses"
      );
    }
  }
);

// Create course
export const addInstructorCourse = createAsyncThunk(
  "instructor/createCourse",
  async (formData, { rejectWithValue }) => {
    try {
      return await createCourse(formData);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create course"
      );
    }
  }
);

// Update course
export const editInstructorCourse = createAsyncThunk(
  "instructor/updateCourse",
  async ({ courseId, formData }, { rejectWithValue }) => {
    try {
      return await updateCourse(courseId, formData);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update course"
      );
    }
  }
);

// Delete course
export const removeInstructorCourse = createAsyncThunk(
  "instructor/deleteCourse",
  async (courseId, { rejectWithValue }) => {
    try {
      await deleteCourse(courseId);
      return courseId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete course"
      );
    }
  }
);

// Publish course
export const publishInstructorCourse = createAsyncThunk(
  "instructor/publishCourse",
  async (courseId, { rejectWithValue }) => {
    try {
      return await publishCourse(courseId);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to publish course"
      );
    }
  }
);

// Unpublish course
export const unpublishInstructorCourse = createAsyncThunk(
  "instructor/unpublishCourse",
  async (courseId, { rejectWithValue }) => {
    try {
      return await unpublishCourse(courseId);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to unpublish course"
      );
    }
  }
);
