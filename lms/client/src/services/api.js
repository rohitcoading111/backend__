import axios from "axios";
import { store } from "../app/store.js";
import { setAccessToken, logout } from "../features/auth/authSlices/authSlice";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// Main Axios instance
const api = axios.create({
  baseURL,
  withCredentials: true,
});

// Separate instance for refresh token
const refreshApi = axios.create({
  baseURL,
  withCredentials: true,
});

let refreshPromise = null;

// REQUEST INTERCEPTOR
api.interceptors.request.use((config) => {
  const token = store.getState().auth.accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry ||
      originalRequest.url?.includes("/auth/")
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      if (!refreshPromise) {
        refreshPromise = refreshApi
          .post("/auth/refresh")
          .then((res) => {
            const token = res.data.data.accessToken;

            store.dispatch(setAccessToken(token));

            return token;
          })
          .finally(() => {
            refreshPromise = null;
          });
      }

      const newToken = await refreshPromise;

      originalRequest.headers.Authorization = `Bearer ${newToken}`;

      return api(originalRequest);
    } catch (error) {
      store.dispatch(logout());
      return Promise.reject(error);
    }
  }
);

export default api;