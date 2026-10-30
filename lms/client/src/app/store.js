import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlices/authSlice";
import instructorReducer from "../features/instructor/store/instructorSlice.js";
import moduleReducer from "../features/instructor/store/moduleSlice";
import lectureReducer from "../features/instructor/store/lectureSlice.js"
import liveSessionReducer from "../features/instructor/store/liveSessionSlice";



export const store = configureStore({
  reducer: {
    auth: authReducer,
    instructor: instructorReducer,
    modules: moduleReducer,
    lectures: lectureReducer,
    liveSession: liveSessionReducer,
  },
});
