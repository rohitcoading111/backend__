
import { createSlice } from "@reduxjs/toolkit";

import {
  loginUser,
  registerUser,
  verifyEmailLoginOtp,
  verifyMobileLoginOtp,
  verifyEmailRegistrationOtp,
  verifyMobileRegistrationOtp,
  restoreAuth,
  logoutUser,
  resetPassword,
} from "../authThunk/authThunks.js";

// Initial authentication state
const initialState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isRestoring: false,
  status: "idle",
  isLoggingOut: false,
  error: null,
  resetPasswordStatus: "idle",
  resetPasswordError: null,
};

// Handles different API response structures
const unwrapAuthResponse = (payload) => {
  let response = payload;

  // Axios response wrapper
  if (response?.data && typeof response.data === "object") {
    response = response.data;
  }

  // Backend API data wrapper
  if (response?.data && typeof response.data === "object") {
    response = response.data;
  }

  return response;
};

// Set authenticated user only when both are available
const applyAuthResponse = (state, payload) => {
  const response = unwrapAuthResponse(payload);

  if (!response?.user || !response?.accessToken) {
    return false;
  }

  state.user = response.user;
  state.accessToken = response.accessToken;
  state.isAuthenticated = true;
  state.status = "succeeded";
  state.isLoggingOut = false;
  state.error = null;

  return true;
};

// Clear local authentication state
const clearAuthState = (state) => {
  state.user = null;
  state.accessToken = null;
  state.isAuthenticated = false;
  state.isLoggingOut = false;
};



// Redux authentication slice
const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    // Save login credentials
    setCredentials: (state, action) => {
      const authenticated = applyAuthResponse(
        state,
        action.payload
      );

      if (!authenticated) {
        state.error = "User or access token missing.";
      }
    },

    // Clear local authentication
    logout: (state) => {
      clearAuthState(state);
      state.status = "idle";
      state.error = null;
    },

    // Clear authentication errors
    clearAuthError: (state) => {
      state.error = null;
    },

    // Update access token after refresh
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },

    clearResetPasswordState: (state) => {
     state.resetPasswordStatus = "idle";
      state.resetPasswordError = null;
    },

    // Google authentication
    setGoogleAuth: (state, action) => {
      const authenticated = applyAuthResponse(
        state,
        action.payload
      );

      if (!authenticated) {
        state.error = "Google authentication data is incomplete.";
      }
    },
  },

  extraReducers: (builder) => {
    builder

      // ---------------------------------
      // NORMAL LOGIN
      // ---------------------------------

      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        const authenticated = applyAuthResponse(
          state,
          action.payload
        );

        // Login may only initiate OTP verification.
        // Do not authenticate until user and access token exist.
        if (!authenticated) {
          state.status = "succeeded";
        }
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload ||
          action.error.message ||
          "Login failed.";
      })

      // ---------------------------------
      // REGISTRATION
      // ---------------------------------

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
          action.payload ||
          action.error.message ||
          "Registration failed.";
      })

      // ---------------------------------
      // EMAIL LOGIN OTP
      // ---------------------------------

      .addCase(verifyEmailLoginOtp.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(verifyEmailLoginOtp.fulfilled, (state, action) => {
        const authenticated = applyAuthResponse(
          state,
          action.payload
        );

        if (!authenticated) {
          state.status = "failed";
          state.error = "Email login response is incomplete.";
        }
      })

      .addCase(verifyEmailLoginOtp.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload ||
          action.error.message ||
          "Email OTP verification failed.";
      })

      // ---------------------------------
      // MOBILE LOGIN OTP
      // ---------------------------------

      .addCase(verifyMobileLoginOtp.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(verifyMobileLoginOtp.fulfilled, (state, action) => {
        const authenticated = applyAuthResponse(
          state,
          action.payload
        );

        if (!authenticated) {
          state.status = "failed";
          state.error = "Mobile login response is incomplete.";
        }
      })

      .addCase(verifyMobileLoginOtp.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload ||
          action.error.message ||
          "Mobile OTP verification failed.";
      })

      // ---------------------------------
      // EMAIL REGISTRATION OTP
      // ---------------------------------

      .addCase(verifyEmailRegistrationOtp.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(
        verifyEmailRegistrationOtp.fulfilled,
        (state, action) => {
          const authenticated = applyAuthResponse(
            state,
            action.payload
          );

          if (!authenticated) {
            state.status = "failed";
            state.error =
              "Email registration response is incomplete.";
          }
        }
      )

      .addCase(
        verifyEmailRegistrationOtp.rejected,
        (state, action) => {
          state.status = "failed";
          state.error =
            action.payload ||
            action.error.message ||
            "Registration OTP verification failed.";
        }
      )

      // ---------------------------------
      // MOBILE REGISTRATION OTP
      // ---------------------------------

      .addCase(verifyMobileRegistrationOtp.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(
        verifyMobileRegistrationOtp.fulfilled,
        (state, action) => {
          const authenticated = applyAuthResponse(
            state,
            action.payload
          );

          if (!authenticated) {
            state.status = "failed";
            state.error =
              "Mobile registration response is incomplete.";
          }
        }
      )

      .addCase(
        verifyMobileRegistrationOtp.rejected,
        (state, action) => {
          state.status = "failed";
          state.error =
            action.payload ||
            action.error.message ||
            "Mobile OTP verification failed.";
        }
      )

      // ---------------------------------
      // RESTORE AUTHENTICATION
      // ---------------------------------

      .addCase(restoreAuth.pending, (state) => {
        state.isRestoring = true;
        state.error = null;
      })

      .addCase(restoreAuth.fulfilled, (state, action) => {
        state.isRestoring = false;
        const authenticated = applyAuthResponse(
          state,
          action.payload
        );

        if (!authenticated) {
          clearAuthState(state);
          state.status = "idle";
          state.error = null;
        }
      })

      .addCase(restoreAuth.rejected, (state) => {
        state.isRestoring = false;
        clearAuthState(state);
        state.status = "idle";
        state.error = null;
      })

      // ---------------------------------
      // LOGOUT
      // ---------------------------------

      .addCase(logoutUser.pending, (state) => {
        state.isLoggingOut = true;
        state.error = null;
      })

      .addCase(logoutUser.fulfilled, (state) => {
        clearAuthState(state);
        state.status = "idle";
        state.error = null;
      })

      .addCase(logoutUser.rejected, (state, action) => {
        // Clear local session even if server logout fails.
        clearAuthState(state);
        state.status = "idle";
        state.error =
          action.payload ||
          action.error.message ||
          "Logout request failed.";
      })
// ---------------------------------
// RESET PASSWORD
// ---------------------------------

.addCase(resetPassword.pending, (state) => {
  state.resetPasswordStatus = "loading";
  state.resetPasswordError = null;
})

.addCase(resetPassword.fulfilled, (state) => {
  state.resetPasswordStatus = "succeeded";
  state.resetPasswordError = null;
})

.addCase(resetPassword.rejected, (state, action) => {
  state.resetPasswordStatus = "failed";
  state.resetPasswordError =
    action.payload ||
    action.error.message ||
    "Password reset failed. Please try again.";
})
      
  },
  
});

export const {
  setCredentials,
  logout,
  clearAuthError,
  setGoogleAuth,
  setAccessToken,
  clearResetPasswordState,
} = authSlice.actions;

export default authSlice.reducer;
