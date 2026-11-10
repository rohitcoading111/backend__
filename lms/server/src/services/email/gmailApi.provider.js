import { google } from "googleapis";
import gmailConfig from "../../config/gmail.config.js";
import { createRawMessage, createEmailError } from "./email.helpers.js";

const getGoogleError = (error) => {
  const details = error?.response?.data?.error;
  if (typeof details === "string") return details;
  return [
    details?.status,
    details?.message,
    ...(Array.isArray(details?.errors)
      ? details.errors.map((item) => item?.reason || item?.message)
      : []),
    error?.message,
  ]
    .filter(Boolean)
    .join(" ");
};

const mapGoogleError = (error) => {
  const status = Number(error?.response?.status || error?.status || error?.code);
  const detail = getGoogleError(error).toLowerCase();

  if (
    detail.includes("invalid_grant") ||
    detail.includes("token has been expired or revoked") ||
    detail.includes("invalid refresh token")
  ) {
    return ["GMAIL_REFRESH_TOKEN_INVALID", "Gmail authorization must be renewed."];
  }
  if (status === 401) {
    return ["GMAIL_AUTH_FAILED", "Gmail API authentication failed."];
  }
  if (
    status === 429 ||
    detail.includes("ratelimit") ||
    detail.includes("quota") ||
    detail.includes("limitexceeded")
  ) {
    return ["GMAIL_QUOTA_OR_RATE_LIMIT", "Gmail API quota or rate limit was reached."];
  }
  if (status === 403) {
    return ["GMAIL_PERMISSION_DENIED", "Gmail API permission was denied."];
  }
  if (
    status === 400 &&
    (detail.includes("recipient") ||
      detail.includes("to header") ||
      detail.includes("invalid email"))
  ) {
    return ["GMAIL_INVALID_RECIPIENT", "Gmail rejected an email recipient."];
  }
  if (status === 400) {
    return ["GMAIL_INVALID_MESSAGE", "Gmail rejected the MIME message."];
  }
  if (
    [
      "ECONNRESET",
      "ETIMEDOUT",
      "ENOTFOUND",
      "EAI_AGAIN",
      "ECONNREFUSED",
      "EPIPE",
      "UND_ERR_CONNECT_TIMEOUT",
    ].includes(error?.code)
  ) {
    return ["GMAIL_NETWORK_ERROR", "Gmail API could not be reached."];
  }
  return ["GMAIL_PROVIDER_ERROR", "Gmail API rejected the email request."];
};

export const createGmailApiProvider = ({
  googleApi = google,
  gmailConfig,
  logger = console,
}) => {
  let gmail;

  const getGmailClient = () => {
    if (gmail) return gmail;
    if (gmailConfig.EMAIL_PROVIDER !== "gmail-api") {
      throw createEmailError(
        "EMAIL_PROVIDER must be set to gmail-api.",
        "EMAIL_PROVIDER_INVALID"
      );
    }

    const { GMAIL_API_CLIENT_ID, GMAIL_API_CLIENT_SECRET, GMAIL_API_REFRESH_TOKEN } =
      gmailConfig;
    if (!GMAIL_API_CLIENT_ID || !GMAIL_API_CLIENT_SECRET || !GMAIL_API_REFRESH_TOKEN) {
      throw createEmailError(
        "Gmail API OAuth credentials are not fully configured.",
        "GMAIL_CONFIG_ERROR"
      );
    }

    const auth = new googleApi.auth.OAuth2(
      GMAIL_API_CLIENT_ID,
      GMAIL_API_CLIENT_SECRET
    );
    auth.setCredentials({ refresh_token: GMAIL_API_REFRESH_TOKEN });
    gmail = googleApi.gmail({ version: "v1", auth });
    return gmail;
  };

  return {
    async sendMail(options) {
      const raw = await createRawMessage(options, gmailConfig);
      const client = getGmailClient();

      try {
        logger.info("[email] Gmail API send request started.");
        const response = await client.users.messages.send({
          userId: "me",
          requestBody: { raw },
        });
        const messageId = response?.data?.id;
        if (!messageId) {
          logger.error("[email] Gmail API returned no message ID.");
          throw createEmailError(
            "Gmail API returned an invalid success response.",
            "GMAIL_INVALID_RESPONSE"
          );
        }

        const accepted = ["to", "cc", "bcc"].flatMap((key) => {
          const value = options[key];
          return value ? (Array.isArray(value) ? value : [value]) : [];
        });
        logger.info("[email] Gmail API accepted the message.", {
          messageId,
          recipientCount: accepted.length,
        });
        return {
          messageId,
          accepted,
          rejected: [],
          response: "Gmail API accepted the email request.",
        };
      } 
catch (error) {
  if (
    typeof error.code === "string" &&
    error.code.startsWith("GMAIL_")
  ) {
    throw error;
  }

  const [code, message] = mapGoogleError(error);

  const statusCode =
    Number(error?.response?.status || error?.status) || undefined;

  logger.error("[email] Gmail API rejected the send request.", {
    statusCode,
    errorCode: code,
  });

  const mappedError = createEmailError(message, code);

  if (statusCode) mappedError.statusCode = statusCode;

  throw mappedError;
}

    },
  };
};

const gmailApiProvider = createGmailApiProvider({ gmailConfig });

export default gmailApiProvider;
