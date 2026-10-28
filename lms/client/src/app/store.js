import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlices/authSlice";
import instructorReducer from "../features/instructor/store/instructorSlice.js";



export const store = configureStore({
  reducer: {
    auth: authReducer,
    instructor: instructorReducer,
  },
});
