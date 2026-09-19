import { configureStore } from "@reduxjs/toolkit";
import urlReducer from "../features/url/urlSlice.js";
const store = configureStore({
  reducer: {
    url: urlReducer
  }
});

export default store