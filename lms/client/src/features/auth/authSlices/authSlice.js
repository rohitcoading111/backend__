
import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser,verifyEmailLoginOtp,verifyMobileLoginOtp } from "../authThunk/authThunks.js";

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

  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;

        // Backend response mein user ho tabhi set karo.
        if (action.payload?.user) {
          state.user = action.payload.user;
          state.isAuthenticated = true;
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
  state.status = "failed";
  state.error =
    action.payload || action.error.message || "Login failed";
})

      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
    .addCase(registerUser.rejected, (state, action) => {
  state.status = "failed";
  state.error =
    action.payload || action.error.message || "Registration failed";
})
.addCase(verifyEmailLoginOtp.pending, (state) => {
  state.status = "loading";
  state.error = null;
})
.addCase(verifyEmailLoginOtp.fulfilled, (state, action) => {
  state.status = "succeeded";
  state.error = null;

  const response = action.payload?.data ?? action.payload;

  if (response?.user) {
    state.user = response.user;
    state.isAuthenticated = true;
  }
})
.addCase(verifyEmailLoginOtp.rejected, (state, action) => {
  state.status = "failed";
  state.error =
    action.payload || "Email OTP verification failed.";
})

.addCase(verifyMobileLoginOtp.pending, (state) => {
  state.status = "loading";
  state.error = null;
})
.addCase(verifyMobileLoginOtp.fulfilled, (state, action) => {
  state.status = "succeeded";
  state.error = null;

  const response = action.payload?.data ?? action.payload;

  if (response?.user) {
    state.user = response.user;
    state.isAuthenticated = true;
  }
})
.addCase(verifyMobileLoginOtp.rejected, (state, action) => {
  state.status = "failed";
  state.error =
    action.payload || "Mobile OTP verification failed.";
})

  },
});

export const { setCredentials, logout, clearAuthError } =
  authSlice.actions;

export default authSlice.reducer;
