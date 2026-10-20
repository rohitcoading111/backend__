
import { createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials) => {
    const response = await authService.login(credentials);
    return response;
  }
);


export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData) => {
    const response = await authService.register(userData);
    return response;
  }
);
