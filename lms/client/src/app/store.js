import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlices/authSlice";
import instructorReducer from "../features/instructor/services/instructorCourseService";



export const store = configureStore({
  reducer: {
    auth: authReducer,
    instructor: instructorReducer,
  },
});
