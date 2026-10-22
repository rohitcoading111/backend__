
import api from "../../../services/api";

const login = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

const register = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

// Verify email login OTP
const verifyEmailLoginOtp = async ({ email, code }) => {
  const response = await api.post("/auth/verify-email-login-otp", {
    email,
    code,
  });

  return response.data;
};

// Verify mobile login 
const verifyMobileLoginOtp = async ({ mobile, code }) => {
  const response = await api.post("/auth/verify-login-otp", {
    mobile,
    code, 
  });

  return response.data;
};

const verifyEmailRegistrationOtp = async ({ email, code }) => {
  const response = await api.post("/auth/verify-email-otp", {
    email,
    code,
  });

  return response.data;
};

// Verify mobile registration OTP
const verifyMobileRegistrationOtp = async ({ mobile, code }) => {
  const response = await api.post("/auth/verify-otp", {
    mobile,
    code,
  });

  return response.data;
};

const getMe = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};

const logout = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

const authService = {
  login,
  register,
  verifyEmailRegistrationOtp,
  verifyEmailLoginOtp,
  verifyMobileLoginOtp,
  getMe,
  logout,
  verifyMobileRegistrationOtp
};
export default authService;
