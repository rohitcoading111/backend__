import { readFile } from "node:fs/promises";
import { basename } from "node:path";
import nodemailer from "nodemailer";
import config from "./config.js";

const MAILJET_SEND_API_URL = "https://api.mailjet.com/v3.1/send";
let gmailTransporter;

const createMailError = (message, code, statusCode) => {
  const error = new Error(message);
  error.code = code;
  if (statusCode) error.statusCode = statusCode;
  return error;
};

const parseAddress = (value) => {
  if (typeof value === "string") {
    const formattedAddress = value.trim().match(/^(.*?)\s*<([^<>]+)>$/);
    if (formattedAddress) {
      return {
        Email: formattedAddress[2].trim(),
        ...(formattedAddress[1].trim()
          ? { Name: formattedAddress[1].trim().replace(/^["']|["']$/g, "") }
          : {}),
      };
    }

    return { Email: value.trim() };
  }

  if (value && typeof value === "object") {
    const email = value.email || value.address;
    if (!email) {
      throw createMailError(
        "An email address is required for every recipient.",
        "MAIL_ADDRESS_INVALID"
      );
    }

    return {
      Email: String(email).trim(),
      ...(value.name ? { Name: String(value.name) } : {}),
    };
  }

  throw createMailError(
    "An email address is required for every recipient.",
    "MAIL_ADDRESS_INVALID"
  );
};

const parseAddresses = (value) => {
  if (!value) return [];

  const addresses = Array.isArray(value)
    ? value
    : typeof value === "string"
      ? value.split(",")
      : [value];

  return addresses.map(parseAddress);
};

const getProviderErrorDetails = (payload) => {
  const messages = Array.isArray(payload?.Messages) ? payload.Messages : [];
  const details = messages.flatMap((message) =>
    Array.isArray(message?.Errors) ? message.Errors : []
  );

  return details
    .map((detail) => detail?.ErrorMessage || detail?.ErrorCode)
    .filter(Boolean)
    .join("; ") ||
    payload?.ErrorMessage ||
    payload?.ErrorIdentifier ||
    "";
};

const getMailjetErrorCode = (statusCode, details = "") => {
  if (statusCode === 401 || statusCode === 403) {
    return "MAILJET_AUTH_FAILED";
  }
  if (statusCode === 429) return "MAILJET_RATE_LIMIT";

  const normalizedDetails = details.toLowerCase();
  if (normalizedDetails.includes("sender") || normalizedDetails.includes("from address")) {
    return "MAILJET_SENDER_REJECTED";
  }
  if (
    normalizedDetails.includes("recipient") ||
    normalizedDetails.includes("to address")
  ) {
    return "MAILJET_RECIPIENT_REJECTED";
  }
  if (statusCode >= 400 && statusCode < 500) {
    return "MAILJET_REQUEST_REJECTED";
  }
  return "MAILJET_PROVIDER_ERROR";
};

const mapAttachment = async (attachment) => {
  if (
    attachment.raw ||
    attachment.href ||
    (attachment.content && typeof attachment.content.pipe === "function")
  ) {
    throw createMailError(
      "Mailjet attachments must use a local path, string, Buffer, or Uint8Array; raw MIME, URLs, and streams are unsupported.",
      "MAILJET_UNSUPPORTED_ATTACHMENT"
    );
  }

  let content = attachment.content;
  let filename = attachment.filename;

  if (attachment.path) {
    content = await readFile(attachment.path);
    filename ||= basename(attachment.path);
  }

  if (typeof content === "string") {
    content = Buffer.from(content, attachment.encoding || "utf8");
  } else if (content instanceof Uint8Array && !Buffer.isBuffer(content)) {
    content = Buffer.from(content);
  }

  if (!Buffer.isBuffer(content)) {
    throw createMailError(
      "Mailjet attachment content must be a string, Buffer, Uint8Array, or local file path.",
      "MAILJET_UNSUPPORTED_ATTACHMENT"
    );
  }

  const mappedAttachment = {
    ContentType: attachment.contentType || "application/octet-stream",
    Filename: filename || "attachment",
    Base64Content: content.toString("base64"),
  };

  if (attachment.cid) {
    return {
      ...mappedAttachment,
      ContentID: attachment.cid,
    };
  }

  return mappedAttachment;
};

const getMailjetMessage = async (options) => {
  const senderEmail = config.MAILJET_SENDER_EMAIL;
  const from = options.from
    ? parseAddress(options.from)
    : senderEmail
      ? { Email: senderEmail }
      : null;

  if (!from?.Email) {
    throw createMailError(
      "MAILJET_SENDER_EMAIL must be configured with a verified sender address.",
      "MAILJET_CONFIG_ERROR"
    );
  }

  if (!config.MAILJET_API_KEY || !config.MAILJET_SECRET_KEY) {
    throw createMailError(
      "Mailjet API credentials are not configured.",
      "MAILJET_CONFIG_ERROR"
    );
  }

  const to = parseAddresses(options.to);
  if (!to.length) {
    throw createMailError(
      "At least one To recipient is required.",
      "MAIL_ADDRESS_INVALID"
    );
  }

  if (options.text == null && options.html == null) {
    throw createMailError(
      "Mailjet messages require a text or HTML body.",
      "MAIL_CONTENT_REQUIRED"
    );
  }

  const message = {
    From: {
      ...from,
      Name: from.Name || config.MAILJET_SENDER_NAME,
    },
    To: to,
    Subject: options.subject || "",
  };

  if (options.text != null) message.TextPart = String(options.text);
  if (options.html != null) message.HTMLPart = String(options.html);

  const cc = parseAddresses(options.cc);
  const bcc = parseAddresses(options.bcc);
  if (cc.length) message.Cc = cc;
  if (bcc.length) message.Bcc = bcc;

  const replyTo = parseAddresses(options.replyTo);
  if (replyTo.length > 1) {
    throw createMailError(
      "Mailjet supports one Reply-To address per message.",
      "MAILJET_UNSUPPORTED_OPTION"
    );
  }
  if (replyTo.length) message.ReplyTo = replyTo[0];

  if (options.attachments?.length) {
    const mappedAttachments = await Promise.all(
      options.attachments.map(mapAttachment)
    );
    const inlineAttachments = mappedAttachments.filter((item) => item.ContentID);
    const regularAttachments = mappedAttachments.filter((item) => !item.ContentID);

    if (regularAttachments.length) message.Attachments = regularAttachments;
    if (inlineAttachments.length) {
      message.InlinedAttachments = inlineAttachments;
    }
  }

  return message;
};

const sendWithMailjet = async (options) => {
  const message = await getMailjetMessage(options);
  const authorization = Buffer.from(
    `${config.MAILJET_API_KEY}:${config.MAILJET_SECRET_KEY}`
  ).toString("base64");

  let response;
  try {
    response = await fetch(MAILJET_SEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Basic ${authorization}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Messages: [message] }),
    });
  } catch {
    throw createMailError(
      "Mailjet request failed because the provider could not be reached.",
      "MAILJET_NETWORK_ERROR"
    );
  }

  let payload;
  try {
    payload = await response.json();
  } catch {
    throw createMailError(
      "Mailjet returned an invalid response.",
      "MAILJET_INVALID_RESPONSE",
      response.status
    );
  }

  const providerDetails = getProviderErrorDetails(payload);
  const result = payload?.Messages?.[0];
  if (!response.ok || result?.Status !== "success") {
    const statusCode = response.status;
    const code = getMailjetErrorCode(statusCode, providerDetails);
    const detail = providerDetails ? `: ${providerDetails}` : "";
    throw createMailError(
      `Mailjet rejected the email request (HTTP ${statusCode})${detail}`,
      code,
      statusCode
    );
  }

  const recipients = ["To", "Cc", "Bcc"].flatMap((key) =>
    Array.isArray(result[key]) ? result[key] : []
  );
  const firstRecipient = recipients[0];

  return {
    messageId:
      firstRecipient?.MessageUUID ||
      (firstRecipient?.MessageID != null
        ? String(firstRecipient.MessageID)
        : undefined),
    accepted: recipients.map((recipient) => recipient.Email),
    rejected: [],
    response: "Mailjet accepted the email request.",
  };
};

const sendWithGmail = (options) => {
  gmailTransporter ||= nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.EMAIL_USER,
      pass: config.EMAIL_APP_PASSWORD,
    },
  });

  return gmailTransporter.sendMail({
    ...options,
    from: options.from || config.EMAIL_USER,
  });
};

const mailer = {
  sendMail(options) {
    if (config.MAIL_PROVIDER === "mailjet") {
      return sendWithMailjet(options);
    }

    if (config.MAIL_PROVIDER === "gmail") {
      return sendWithGmail(options);
    }

    throw createMailError(
      `Unsupported MAIL_PROVIDER "${config.MAIL_PROVIDER}". Use "gmail" or "mailjet".`,
      "MAIL_PROVIDER_INVALID"
    );
  },
};

export default mailer;