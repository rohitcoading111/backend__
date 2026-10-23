import { createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authService.register(userData);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    }
  }
);



export const verifyEmailLoginOtp = createAsyncThunk(
  "auth/verifyEmailLoginOtp",
  async (otpData, { rejectWithValue }) => {
    try {
      const response = await authService.verifyEmailLoginOtp(otpData);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Email OTP verification failed. Please try again."
      );
    }
  }
);

export const verifyMobileLoginOtp = createAsyncThunk(
  "auth/verifyMobileLoginOtp",
  async (otpData, { rejectWithValue }) => {
    try {
      const response = await authService.verifyMobileLoginOtp(otpData);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Mobile OTP verification failed. Please try again."
      );
    }
  }
);


export const verifyEmailRegistrationOtp = createAsyncThunk(
  "auth/verifyEmailRegistrationOtp",
  async (otpData, { rejectWithValue }) => {
    try {
      return await authService.verifyEmailRegistrationOtp(otpData);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Registration OTP verification failed. Please try again."
      );
    }
  }
);


// Verify mobile registration OTP
export const verifyMobileRegistrationOtp = createAsyncThunk(
  "auth/verifyMobileRegistrationOtp",
  async (otpData, { rejectWithValue }) => {
    try {
      return await authService.verifyMobileRegistrationOtp(otpData);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Mobile OTP verification failed. Please try again."
      );
    }
  }
);


export const restoreAuth = createAsyncThunk(
  "auth/restoreAuth",
  async (_, { rejectWithValue }) => {
    try {
      // Step 1: Naya access token lo
      const refreshResult = await authService.refreshAccessToken();
      const accessToken = refreshResult?.data?.accessToken;

      if (!accessToken) {
        throw new Error("Access token missing from refresh response.");
      }

      // Step 2: Access token se user details lo
      const meResult = await authService.getMe(accessToken);
      const user = meResult?.data?.user;

      if (!user) {
        throw new Error("User data missing from /me response.");
      }

      // Step 3: Dono Redux ko return karo
      return { user, accessToken };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to restore authentication."
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.logout();
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Logout failed. Please try again."
      );
    }
  }
);