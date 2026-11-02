import config from "./config.js";

const gmailConfig = {
  EMAIL_PROVIDER: (process.env.EMAIL_PROVIDER || "gmail-api").trim().toLowerCase(),
  GMAIL_API_CLIENT_ID: process.env.GMAIL_API_CLIENT_ID?.trim(),
  GMAIL_API_CLIENT_SECRET: process.env.GMAIL_API_CLIENT_SECRET?.trim(),
  GMAIL_API_REFRESH_TOKEN: process.env.GMAIL_API_REFRESH_TOKEN?.trim(),
  GMAIL_API_REDIRECT_URI:
    process.env.GMAIL_API_REDIRECT_URI?.trim() ||
    "http://localhost:3001/oauth2callback",
  GMAIL_SENDER_EMAIL: process.env.GMAIL_SENDER_EMAIL?.trim(),
  GMAIL_SENDER_NAME: process.env.GMAIL_SENDER_NAME?.trim() || "LearnHub",
  NODE_ENV: config.NODE_ENV,
  IS_RENDER: config.IS_RENDER,
};

export default gmailConfig;
