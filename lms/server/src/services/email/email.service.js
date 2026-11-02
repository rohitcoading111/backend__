import gmailConfig from "../../config/gmail.config.js";
import gmailApiProvider from "./gmailApi.provider.js";

console.info("[email] provider configuration", {
  provider: gmailConfig.EMAIL_PROVIDER,
  environment: gmailConfig.NODE_ENV,
  render: gmailConfig.IS_RENDER,
  oauthClientConfigured: Boolean(
    gmailConfig.GMAIL_API_CLIENT_ID && gmailConfig.GMAIL_API_CLIENT_SECRET
  ),
  refreshTokenConfigured: Boolean(gmailConfig.GMAIL_API_REFRESH_TOKEN),
  senderConfigured: Boolean(gmailConfig.GMAIL_SENDER_EMAIL),
});

if (gmailConfig.EMAIL_PROVIDER !== "gmail-api") {
  console.error("[email] Invalid provider configuration; expected gmail-api.");
}

if (
  !gmailConfig.GMAIL_API_CLIENT_ID ||
  !gmailConfig.GMAIL_API_CLIENT_SECRET ||
  !gmailConfig.GMAIL_API_REFRESH_TOKEN ||
  !gmailConfig.GMAIL_SENDER_EMAIL
) {
  console.error("[email] Gmail API configuration is incomplete.");
}

export default {
  sendMail: (options) => gmailApiProvider.sendMail(options),
};
