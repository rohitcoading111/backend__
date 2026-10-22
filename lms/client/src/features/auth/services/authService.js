
import api from "../../../services/api";

const authService = {
  // 1. Register
  register: async (userData) => {
    const response = await api.post("/auth/register", userData);
    return response.data;
  },

  // 2. Login
  login: async (credentials) => {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  },

  // 3. Verify mobile registration OTP
  verifyMobileRegistrationOtp: async ({ mobile, code }) => {
    const response = await api.post("/auth/verify-otp", {
      mobile,
      code,
    });
    return response.data;
  },

  // 4. Verify mobile login OTP
  verifyMobileLoginOtp: async ({ mobile, code }) => {
    const response = await api.post("/auth/verify-login-otp", {
      mobile,
      code,
    });
    return response.data;
  },

  // 5. Verify email registration OTP
  verifyEmailRegistrationOtp: async ({ email, code }) => {
    const response = await api.post("/auth/verify-email-otp", {
      email,
      code,
    });
    return response.data;
  },

  // 6. Verify email login OTP
  verifyEmailLoginOtp: async ({ email, code }) => {
    const response = await api.post("/auth/verify-email-login-otp", {
      email,
      code,
    });
    return response.data;
  },

  // 7. Refresh access token
  refreshToken: async () => {
    const response = await api.post("/auth/refresh");
    return response.data;
  },

  // 8. Logout
  logout: async () => {
    const response = await api.post("/auth/logout");
    return response.data;
  },

  // 9. Get logged-in user
  getMe: async () => {
    const response = await api.get("/auth/me");
    return response.data;
  },

  // 10. Admin-only test
  adminTest: async () => {
    const response = await api.get("/auth/admin-test");
    return response.data;
  },

  // 11. Forgot password
  forgotPassword: async (data) => {
    const response = await api.post("/auth/forgot-password", data);
    return response.data;
  },

  // 12. Verify password-reset OTP
  verifyResetOtp: async (data) => {
    const response = await api.post("/auth/verify-reset-otp", data);
    return response.data;
  },

  // 13. Reset password
  resetPassword: async (data) => {
    const response = await api.post("/auth/reset-password", data);
    return response.data;
  },

  // 14. Google OAuth URL
  getGoogleAuthUrl: () => {
    return `${api.defaults.baseURL}/auth/google`;
  },
};

export default authService;
