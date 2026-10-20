import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.status = "succeeded";
      state.error = null;
    },

    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.status = "idle";
      state.error = null;
    },

    clearAuthError: (state) => {
      state.error = null;
    },
  },
});

export const { setCredentials, logout, clearAuthError } =
  authSlice.actions;

export default authSlice.reducer;
