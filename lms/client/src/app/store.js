import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlices/authSlice";
import instructorReducer from "../features/instructor/store/instructorSlice.js";
import moduleReducer from "../features/instructor/store/moduleSlice";



export const store = configureStore({
  reducer: {
    auth: authReducer,
    instructor: instructorReducer,
    modules: moduleReducer,
  },
});
