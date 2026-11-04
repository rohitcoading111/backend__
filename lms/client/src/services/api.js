
import axios from "axios";
import { store } from "../app/store.js";
import {
  setAccessToken,
  logout,
} from "../features/auth/authSlices/authSlice";

const productionApiUrl = "https://learnhub-com.onrender.com/api";
const developmentApiUrl = "http://localhost:3000/api";
const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();

const isLocalApiUrl = (value) => {
  try {
    const hostname = new URL(value).hostname.replace(/^\[|\]$/g, "");
    return ["localhost", "127.0.0.1", "::1"].includes(hostname);
  } catch {
    return false;
  }
};

const fallbackApiUrl = import.meta.env.DEV
  ? developmentApiUrl
  : productionApiUrl;

const baseURL =
  import.meta.env.PROD && configuredApiUrl && isLocalApiUrl(configuredApiUrl)
    ? productionApiUrl
    : configuredApiUrl || fallbackApiUrl;

// Main Axios instance
const api = axios.create({
  baseURL,
  withCredentials: true,
});

// Separate instance for refreshing access token
const refreshApi = axios.create({
  baseURL,
  withCredentials: true,
});

let refreshPromise = null;

// REQUEST INTERCEPTOR
api.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.accessToken;

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // Only handle unauthorized requests
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
      // Share one refresh request between concurrent API failures
      if (!refreshPromise) {
        refreshPromise = refreshApi
          .post("/auth/refresh")
          .then((response) => {
            const newAccessToken =
              response.data?.data?.accessToken;

            if (!newAccessToken) {
              throw new Error("Access token missing from refresh response.");
            }

            store.dispatch(setAccessToken(newAccessToken));

            return newAccessToken;
          })
          .finally(() => {
            refreshPromise = null;
          });
      }

      const newToken = await refreshPromise;

      originalRequest.headers = originalRequest.headers || {};
      originalRequest.headers.Authorization = `Bearer ${newToken}`;

      // Retry original request with new access token
      return api(originalRequest);

    } catch (refreshError) {
      store.dispatch(logout());
      return Promise.reject(refreshError);
    }
  }
);

export default api;
