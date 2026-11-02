import assert from "node:assert/strict";
import { after, test } from "node:test";
import nodemailer from "nodemailer";

process.env.MAIL_PROVIDER = "mailjet";
process.env.MAILJET_API_KEY = "test-api-key";
process.env.MAILJET_SECRET_KEY = "test-secret-key";
process.env.MAILJET_SENDER_EMAIL = "verified@example.com";
process.env.MAILJET_SENDER_NAME = "LearnHub";
process.env.EMAIL_USER = "local@example.com";
process.env.EMAIL_APP_PASSWORD = "test-app-password";

const originalFetch = globalThis.fetch;
const { default: config } = await import("../src/config/config.js");
const { default: mailer } = await import("../src/config/mailer.js");
const { sendEmailOTP } = await import("../src/services/emailOTP.services.js");
assert.equal(config.MAIL_PROVIDER, "mailjet");

after(() => {
  globalThis.fetch = originalFetch;
});

test("keeps local Gmail SMTP behind the gmail provider setting", async () => {
  const originalCreateTransport = nodemailer.createTransport;
  let transportOptions;
  let sentMessage;

  config.MAIL_PROVIDER = "gmail";
  nodemailer.createTransport = (options) => {
    transportOptions = options;
    return {
      sendMail: async (message) => {
        sentMessage = message;
        return { messageId: "gmail-message-id" };
      },
    };
  };

  try {
    const info = await mailer.sendMail({
      to: "recipient@example.com",
      subject: "Local Gmail test",
      text: "Test",
    });

    assert.equal(transportOptions.service, "gmail");
    assert.deepEqual(transportOptions.auth, {
      user: "local@example.com",
      pass: "test-app-password",
    });
    assert.equal(sentMessage.from, "local@example.com");
    assert.equal(info.messageId, "gmail-message-id");
  } finally {
    nodemailer.createTransport = originalCreateTransport;
    config.MAIL_PROVIDER = "mailjet";
  }
});

test("never allows Gmail SMTP in production, even if misconfigured", async () => {
  const originalCreateTransport = nodemailer.createTransport;
  const originalEnvironment = config.NODE_ENV;
  const originalRenderFlag = config.IS_RENDER;
  config.NODE_ENV = "production";
  config.IS_RENDER = false;
  config.MAIL_PROVIDER = "gmail";
  nodemailer.createTransport = () => {
    throw new Error("Gmail transport must not be initialized");
  };

  try {
    assert.throws(
      () =>
        mailer.sendMail({
          to: "recipient@example.com",
          subject: "Production test",
          text: "Test",
        }),
      (error) => error.code === "MAIL_PROVIDER_INVALID"
    );
  } finally {
    nodemailer.createTransport = originalCreateTransport;
    config.NODE_ENV = originalEnvironment;
    config.IS_RENDER = originalRenderFlag;
    config.MAIL_PROVIDER = "mailjet";
  }
});

test("sends a mapped message and returns the Mailjet acceptance ID", async () => {
  let request;
  globalThis.fetch = async (url, options) => {
    request = { url, options, payload: JSON.parse(options.body) };
    return new Response(
      JSON.stringify({
        Messages: [
          {
            Status: "success",
            To: [
              {
                Email: "recipient@example.com",
                MessageID: 456,
                MessageUUID: "mailjet-uuid",
              },
            ],
          },
        ],
      }),
      { status: 200 }
    );
  };

  const info = await mailer.sendMail({
    to: { name: "Recipient", address: "recipient@example.com" },
    cc: "copy@example.com",
    bcc: [{ email: "hidden@example.com" }],
    replyTo: "reply@example.com",
    subject: "Test email",
    text: "Plain text",
    html: "<p>HTML</p>",
    attachments: [
      {
        filename: "note.txt",
        content: Buffer.from("file content"),
      },
      {
        filename: "inline.png",
        cid: "inline-image",
        content: Buffer.from([1, 2, 3]),
      },
    ],
  });

  assert.equal(request.url, "https://api.mailjet.com/v3.1/send");
  assert.equal(
    request.options.headers.Authorization,
    `Basic ${Buffer.from("test-api-key:test-secret-key").toString("base64")}`
  );
  assert.deepEqual(request.payload.Messages[0].From, {
    Email: "verified@example.com",
    Name: "LearnHub",
  });
  assert.deepEqual(request.payload.Messages[0].To, [
    { Email: "recipient@example.com", Name: "Recipient" },
  ]);
  assert.deepEqual(request.payload.Messages[0].Cc, [
    { Email: "copy@example.com" },
  ]);
  assert.deepEqual(request.payload.Messages[0].Bcc, [
    { Email: "hidden@example.com" },
  ]);
  assert.deepEqual(request.payload.Messages[0].ReplyTo, {
    Email: "reply@example.com",
  });
  assert.equal(
    request.payload.Messages[0].Attachments[0].Base64Content,
    Buffer.from("file content").toString("base64")
  );
  assert.equal(
    request.payload.Messages[0].InlinedAttachments[0].ContentID,
    "inline-image"
  );
  assert.equal(info.messageId, "mailjet-uuid");
  assert.deepEqual(info.accepted, ["recipient@example.com"]);
});

test("reports invalid Mailjet credentials without exposing secrets", async () => {
  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({ ErrorMessage: "Invalid API key" }),
      { status: 401 }
    );

  await assert.rejects(
    mailer.sendMail({
      to: "recipient@example.com",
      subject: "Test",
      text: "Test",
    }),
    (error) => {
      assert.equal(error.code, "MAILJET_AUTH_FAILED");
      assert.equal(error.statusCode, 401);
      assert.doesNotMatch(error.message, /test-api-key|test-secret-key/);
      return true;
    }
  );
});

test("email OTP reports an API rejection instead of false success", async () => {
  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        Messages: [
          {
            Status: "error",
            Errors: [{ ErrorMessage: "Sender address is not validated" }],
          },
        ],
      }),
      { status: 200 }
    );

  await assert.rejects(
    sendEmailOTP("recipient@example.com", "123456"),
    (error) => error.code === "MAILJET_SENDER_REJECTED"
  );
});

test("reports a rejected sender or recipient even with HTTP 200", async () => {
  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        Messages: [
          {
            Status: "error",
            Errors: [{ ErrorMessage: "Sender address is not validated" }],
          },
        ],
      }),
      { status: 200 }
    );

  await assert.rejects(
    mailer.sendMail({
      to: "recipient@example.com",
      subject: "Test",
      text: "Test",
    }),
    (error) => error.code === "MAILJET_SENDER_REJECTED"
  );

  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        Messages: [
          {
            Status: "error",
            Errors: [{ ErrorMessage: "Invalid recipient address" }],
          },
        ],
      }),
      { status: 200 }
    );

  await assert.rejects(
    mailer.sendMail({
      to: "recipient@example.com",
      subject: "Test",
      text: "Test",
    }),
    (error) => error.code === "MAILJET_RECIPIENT_REJECTED"
  );
});

test("reports rate limits and provider network failures", async () => {
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ ErrorMessage: "Rate limit exceeded" }), {
      status: 429,
    });

  await assert.rejects(
    mailer.sendMail({
      to: "recipient@example.com",
      subject: "Test",
      text: "Test",
    }),
    (error) => error.code === "MAILJET_RATE_LIMIT"
  );

  globalThis.fetch = async () => {
    throw new Error("network unavailable");
  };

  await assert.rejects(
    mailer.sendMail({
      to: "recipient@example.com",
      subject: "Test",
      text: "Test",
    }),
    (error) => {
      assert.equal(error.code, "MAILJET_NETWORK_ERROR");
      assert.doesNotMatch(error.message, /test-api-key|test-secret-key/);
      return true;
    }
  );
});
