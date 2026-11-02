import config from "../config/config.js";

export const refreshCookieOptions = () => {
  const isSecureRuntime =
    config.NODE_ENV === "production" || config.IS_RENDER;

  return {
    httpOnly: true,
    secure: isSecureRuntime,
    sameSite: isSecureRuntime ? "none" : "lax",
    path: "/",
  };
};

export const setRefreshCookie = (res, token) => {
  res.cookie("refreshToken", token, {
    ...refreshCookieOptions(),
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export const clearRefreshCookie = (res) => {
  res.clearCookie("refreshToken", refreshCookieOptions());
};
