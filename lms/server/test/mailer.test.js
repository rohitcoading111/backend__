import assert from "node:assert/strict";
import { after, test } from "node:test";

const originalEnv = { ...process.env };
process.env.EMAIL_PROVIDER = "gmail-api";
process.env.GMAIL_API_CLIENT_ID = "sender-client-id";
process.env.GMAIL_API_CLIENT_SECRET = "sender-client-secret";
process.env.GMAIL_API_REFRESH_TOKEN = "private-refresh-token";
process.env.GMAIL_SENDER_EMAIL = "rp538220@gmail.com";
process.env.GMAIL_SENDER_NAME = "LearnHub";
const { default: gmailConfig } = await import("../src/config/gmail.config.js");
const { createGmailApiProvider } = await import(
  "../src/services/email/gmailApi.provider.js"
);
const { createRawMessage } = await import(
  "../src/services/email/email.helpers.js"
);
const { sendEmailOTP } = await import("../src/services/emailOTP.services.js");
const { default: emailService } = await import(
  "../src/services/email/email.service.js"
);

after(() => {
  for (const key of [
    "EMAIL_PROVIDER",
    "GMAIL_API_CLIENT_ID",
    "GMAIL_API_CLIENT_SECRET",
    "GMAIL_API_REFRESH_TOKEN",
    "GMAIL_SENDER_EMAIL",
    "GMAIL_SENDER_NAME",
  ]) {
    if (originalEnv[key] === undefined) delete process.env[key];
    else process.env[key] = originalEnv[key];
  }
});

const getConfig = (overrides = {}) => ({
  EMAIL_PROVIDER: "gmail-api",
  GMAIL_API_CLIENT_ID: "sender-client-id",
  GMAIL_API_CLIENT_SECRET: "sender-client-secret",
  GMAIL_API_REFRESH_TOKEN: "private-refresh-token",
  GMAIL_SENDER_EMAIL: "rp538220@gmail.com",
  GMAIL_SENDER_NAME: "LearnHub",
  NODE_ENV: "test",
  IS_RENDER: false,
  ...overrides,
});

const createMockGoogle = ({ response, error } = {}) => {
  const calls = { auth: null, request: null, options: null };
  class OAuth2 {
    constructor(clientId, clientSecret) {
      calls.auth = { clientId, clientSecret };
    }

    setCredentials(credentials) {
      calls.credentials = credentials;
    }
  }

  const googleApi = {
    auth: { OAuth2 },
    gmail(options) {
      calls.options = options;
      return {
        users: {
          messages: {
            send: async (request) => {
              calls.request = request;
              if (error) throw error;
              return response || { data: { id: "gmail-message-id" } };
            },
          },
        },
      };
    },
  };
  return { googleApi, calls };
};

test("selects Gmail API in local and production configurations", async () => {
  assert.equal(gmailConfig.EMAIL_PROVIDER, "gmail-api");
  assert.equal(gmailConfig.GMAIL_API_CLIENT_ID, "sender-client-id");

  const { googleApi, calls } = createMockGoogle();
  const productionProvider = createGmailApiProvider({
    googleApi,
    gmailConfig: getConfig({ NODE_ENV: "production" }),
  });
  const info = await productionProvider.sendMail({
    to: "recipient@example.com",
    subject: "Production config",
    text: "Mocked send",
  });

  assert.equal(info.messageId, "gmail-message-id");
  assert.equal(calls.options.auth.constructor.name, "OAuth2");
});

test("sets the refresh token on the dedicated Gmail OAuth client", async () => {
  const { googleApi, calls } = createMockGoogle();
  const provider = createGmailApiProvider({
    googleApi,
    gmailConfig: getConfig(),
  });

  await provider.sendMail({
    to: "recipient@example.com",
    subject: "Refresh token",
    text: "Mocked send",
  });

  assert.deepEqual(calls.auth, {
    clientId: "sender-client-id",
    clientSecret: "sender-client-secret",
  });
  assert.deepEqual(calls.credentials, {
    refresh_token: "private-refresh-token",
  });
  assert.equal(calls.options.version, "v1");
});

test("sends a base64url RFC 2822 message with supported recipient and body options", async () => {
  const { googleApi, calls } = createMockGoogle();
  const provider = createGmailApiProvider({
    googleApi,
    gmailConfig: getConfig(),
  });
  const info = await provider.sendMail({
    to: { name: "Recipient", address: "recipient@example.com" },
    cc: "copy@example.com",
    bcc: [{ email: "hidden@example.com" }],
    replyTo: "reply@example.com",
    subject: "Hello",
    text: "Plain text",
    html: "<p>HTML</p>",
    attachments: [
      { filename: "note.txt", content: Buffer.from("file content") },
      {
        filename: "inline.png",
        cid: "inline-image",
        content: Buffer.from([1, 2, 3]),
      },
    ],
  });

  assert.equal(calls.request.userId, "me");
  assert.equal(info.messageId, "gmail-message-id");
  assert.deepEqual(info.rejected, []);
  const mime = Buffer.from(calls.request.requestBody.raw, "base64url").toString(
    "utf8"
  );
  assert.match(mime, /From: LearnHub <rp538220@gmail\.com>/);
  assert.match(mime, /To: Recipient <recipient@example\.com>/);
  assert.match(mime, /Cc: copy@example\.com/);
  assert.match(mime, /Bcc: hidden@example\.com/);
  assert.match(mime, /Reply-To: reply@example\.com/);
  assert.match(mime, /multipart\/mixed/);
  assert.match(mime, /multipart\/related/);
  assert.match(mime, /multipart\/alternative/);
  assert.match(mime, /Content-ID: <inline-image>/);
  assert.ok(mime.includes(Buffer.from("Plain text").toString("base64")));
});

test("rejects a From address that is not the configured Gmail sender", async () => {
  await assert.rejects(
    createRawMessage(
      {
        from: "spoof@example.com",
        to: "recipient@example.com",
        subject: "Sender check",
        text: "Body",
      },
      getConfig()
    ),
    (error) => error.code === "GMAIL_SENDER_NOT_ALLOWED"
  );
});

test("rejects malformed recipient addresses before making an API request", async () => {
  const { googleApi, calls } = createMockGoogle();
  const provider = createGmailApiProvider({
    googleApi,
    gmailConfig: getConfig(),
  });

  await assert.rejects(
    provider.sendMail({
      to: "not-an-address",
      subject: "Recipient check",
      text: "Body",
    }),
    (error) => error.code === "GMAIL_INVALID_RECIPIENT"
  );
  assert.equal(calls.request, null);
});

test("maps authentication, revoked token, permission, invalid message, quota, and network failures", async (t) => {
  const cases = [
    [
      "authentication failure",
      { response: { status: 401, data: { error: "unauthorized" } } },
      "GMAIL_AUTH_FAILED",
    ],
    [
      "revoked refresh token",
      { response: { status: 400, data: { error: "invalid_grant" } } },
      "GMAIL_REFRESH_TOKEN_INVALID",
    ],
    [
      "permission failure",
      {
        response: {
          status: 403,
          data: { error: { status: "PERMISSION_DENIED", message: "insufficient scope" } },
        },
      },
      "GMAIL_PERMISSION_DENIED",
    ],
    [
      "invalid MIME message",
      { response: { status: 400, data: { error: { message: "Invalid message" } } } },
      "GMAIL_INVALID_MESSAGE",
    ],
    [
      "invalid recipient rejected by Gmail",
      { response: { status: 400, data: { error: { message: "Invalid To header" } } } },
      "GMAIL_INVALID_RECIPIENT",
    ],
    [
      "quota failure",
      {
        response: {
          status: 403,
          data: { error: { message: "userRateLimitExceeded" } },
        },
      },
      "GMAIL_QUOTA_OR_RATE_LIMIT",
    ],
    [
      "network failure",
      Object.assign(new Error("request failed"), { code: "ETIMEDOUT" }),
      "GMAIL_NETWORK_ERROR",
    ],
  ];

  for (const [name, error, expectedCode] of cases) {
    await t.test(name, async () => {
      const { googleApi } = createMockGoogle({ error });
      const provider = createGmailApiProvider({
        googleApi,
        gmailConfig: getConfig(),
        logger: { info() {}, error() {} },
      });

      await assert.rejects(
        provider.sendMail({
          to: "recipient@example.com",
          subject: "Error mapping",
          text: "Body",
        }),
        (mappedError) => mappedError.code === expectedCode
      );
    });
  }
});

test("returns a failure if Gmail API does not provide an accepted message ID", async () => {
  const { googleApi } = createMockGoogle({ response: { data: {} } });
  const provider = createGmailApiProvider({
    googleApi,
    gmailConfig: getConfig(),
    logger: { info() {}, error() {} },
  });

  await assert.rejects(
    provider.sendMail({
      to: "recipient@example.com",
      subject: "Invalid response",
      text: "Body",
    }),
    (error) => error.code === "GMAIL_INVALID_RESPONSE"
  );
});

test("email OTP service continues using the same centralized sendMail interface", async () => {
  const originalSendMail = emailService.sendMail;
  let captured;
  emailService.sendMail = async (options) => {
    captured = options;
    return { messageId: "mock-accepted" };
  };

  try {
    assert.equal(
      await sendEmailOTP("recipient@example.com", "123456"),
      "mock-accepted"
    );
    assert.equal(captured.to, "recipient@example.com");
    assert.equal(captured.subject, "Verify your email address");
    assert.match(captured.text, /123456/);
  } finally {
    emailService.sendMail = originalSendMail;
  }
});
