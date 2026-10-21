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
