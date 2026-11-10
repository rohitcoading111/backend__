import crypto from "node:crypto";
import http from "node:http";
import { fileURLToPath } from "node:url";
import { google } from "googleapis";
import gmailConfig from "../config/gmail.config.js";
import { updateEnvFile } from "../utils/updateEnvFile.js";

const redirectUri =
  gmailConfig.GMAIL_API_REDIRECT_URI || "http://localhost:3001/oauth2callback";
const envPath = fileURLToPath(new URL("../../.env", import.meta.url));
const redirect = new URL(redirectUri);

if (redirect.protocol !== "http:" || redirect.hostname !== "localhost" || redirect.port !== "3001") {
  throw new Error("GMAIL_API_REDIRECT_URI must use http://localhost:3001.");
}
if (!gmailConfig.GMAIL_API_CLIENT_ID || !gmailConfig.GMAIL_API_CLIENT_SECRET) {
  throw new Error("Set GMAIL_API_CLIENT_ID and GMAIL_API_CLIENT_SECRET in the backend .env.");
}

const state = crypto.randomBytes(32).toString("hex");
const oauth2Client = new google.auth.OAuth2(
  gmailConfig.GMAIL_API_CLIENT_ID,
  gmailConfig.GMAIL_API_CLIENT_SECRET,
  redirectUri
);
const authorizationUrl = oauth2Client.generateAuthUrl({
  access_type: "offline",
  prompt: "consent",
  scope: ["https://www.googleapis.com/auth/gmail.send"],
  state,
});

const server = http.createServer(async (request, response) => {
  const callbackUrl = new URL(request.url, redirect.origin);
  if (callbackUrl.pathname !== redirect.pathname) {
    response.writeHead(404).end("Not found");
    return;
  }

  const receivedState = callbackUrl.searchParams.get("state") || "";
  const expected = Buffer.from(state);
  const actual = Buffer.from(receivedState);
  if (
    expected.length !== actual.length ||
    !crypto.timingSafeEqual(expected, actual)
  ) {
    response.writeHead(400).end("OAuth state validation failed. You may close this page.");
    console.error("Gmail authorization callback rejected: invalid state.");
    server.close();
    return;
  }

  const providerError = callbackUrl.searchParams.get("error");
  if (providerError) {
    response.writeHead(400).end("Google authorization was not completed. You may close this page.");
    console.error("Gmail authorization was not completed.");
    server.close();
    return;
  }

  const code = callbackUrl.searchParams.get("code");
  if (!code) {
    response.writeHead(400).end("Authorization code missing. You may close this page.");
    console.error("Gmail authorization callback did not include a code.");
    server.close();
    return;
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);
    if (!tokens.refresh_token) {
      throw new Error("Google did not issue a refresh token. Revoke this app's access and authorize again.");
    }
    await updateEnvFile(
      envPath,
      "GMAIL_API_REFRESH_TOKEN",
      tokens.refresh_token
    );
    response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Gmail authorization complete. The refresh token was saved to the backend .env file. Restart the backend.");
    console.log("Gmail authorization complete. Refresh token saved to the backend .env file.");
    console.log("Restart the backend so it loads the updated credentials.");
    server.close();
  } catch (error) {
    response.writeHead(500).end("Could not complete authorization. Check the terminal.");
    console.error("Gmail authorization failed; token was not saved. Check OAuth client, consent, redirect URI, and .env file permissions.");
    server.close();
    process.exitCode = 1;
  }
});

server.on("error", (error) => {
  console.error("Could not start the Gmail OAuth callback server:", error.message);
  process.exitCode = 1;
});

server.listen(3001, "localhost", () => {
  console.log("Open this URL in your browser to authorize the Gmail sender:");
  console.log(authorizationUrl);
  console.log("Waiting for the Google OAuth callback on localhost:3001.");
});
