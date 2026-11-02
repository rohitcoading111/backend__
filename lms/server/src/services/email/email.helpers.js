import { randomUUID } from "node:crypto";
import { readFile } from "node:fs/promises";
import { basename } from "node:path";

export const createEmailError = (message, code) => {
  const error = new Error(message);
  error.code = code;
  return error;
};

const rejectHeaderBreaks = (value, label) => {
  const stringValue = String(value ?? "");
  if (/[\r\n]/.test(stringValue)) {
    throw createEmailError(`${label} contains invalid header characters.`, "GMAIL_INVALID_MESSAGE");
  }
  return stringValue;
};

const encodeHeader = (value) => {
  const safeValue = rejectHeaderBreaks(value, "Email header");
  if (/^[\x20-\x7e]*$/.test(safeValue)) return safeValue;
  return `=?UTF-8?B?${Buffer.from(safeValue, "utf8").toString("base64")}?=`;
};

const parseAddress = (value) => {
  let email;
  let name;

  if (typeof value === "string") {
    const formatted = value.trim().match(/^(.*?)\s*<([^<>]+)>$/);
    if (formatted) {
      name = formatted[1].trim().replace(/^["']|["']$/g, "");
      email = formatted[2].trim();
    } else {
      email = value.trim();
    }
  } else if (value && typeof value === "object") {
    email = value.email || value.address;
    name = value.name;
  }

  if (
    typeof email !== "string" ||
    !/^[^\s<>@,;]+@[^\s<>@,;]+\.[^\s<>@,;]+$/.test(email.trim())
  ) {
    throw createEmailError("An email address is invalid.", "GMAIL_INVALID_RECIPIENT");
  }

  return {
    email: email.trim(),
    ...(name ? { name: rejectHeaderBreaks(name, "Address name") } : {}),
  };
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

const formatAddress = ({ email, name }) => {
  if (!name) return email;
  const encodedName = encodeHeader(name);
  const formattedName = encodedName.startsWith("=?")
    ? encodedName
    : /^[A-Za-z0-9 _.-]+$/.test(encodedName)
      ? encodedName
      : `"${encodedName.replace(/(["\\])/g, "\\$1")}"`;
  return `${formattedName} <${email}>`;
};

const encodeBase64Lines = (value) =>
  Buffer.from(value).toString("base64").match(/.{1,76}/g)?.join("\r\n") || "";

const createBoundary = (kind) =>
  `----learnhub-${kind}-${randomUUID().replace(/-/g, "")}`;

const multipart = (subtype, boundary, parts) => ({
  contentType: `multipart/${subtype}; boundary="${boundary}"`,
  body: parts.map((part) => `--${boundary}\r\n${part}`).join("") +
    `--${boundary}--\r\n`,
});

const createBodyPart = (contentType, content) =>
  `Content-Type: ${contentType}; charset=UTF-8\r\n` +
  "Content-Transfer-Encoding: base64\r\n\r\n" +
  `${encodeBase64Lines(content)}\r\n`;

const readAttachment = async (attachment) => {
  if (
    attachment.raw ||
    attachment.href ||
    (attachment.content && typeof attachment.content.pipe === "function")
  ) {
    throw createEmailError(
      "Raw MIME, URL, and stream attachments are not supported.",
      "GMAIL_UNSUPPORTED_ATTACHMENT"
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
    throw createEmailError(
      "Attachment content must be a string, Buffer, Uint8Array, or local file path.",
      "GMAIL_UNSUPPORTED_ATTACHMENT"
    );
  }

  const safeFilename = rejectHeaderBreaks(filename || "attachment", "Attachment filename");
  const contentType = rejectHeaderBreaks(
    attachment.contentType || "application/octet-stream",
    "Attachment content type"
  );
  const safeAsciiFilename = safeFilename
    .replace(/[^\x20-\x7e]/g, "_")
    .replace(/["\\]/g, "_");
  const encodedFilename = encodeURIComponent(safeFilename);
  const disposition = attachment.cid ? "inline" : "attachment";

  return {
    inline: Boolean(attachment.cid),
    contentId: attachment.cid
      ? rejectHeaderBreaks(attachment.cid, "Attachment content ID")
      : undefined,
    part:
      `Content-Type: ${contentType}\r\n` +
      `Content-Disposition: ${disposition}; filename="${safeAsciiFilename}"; filename*=UTF-8''${encodedFilename}\r\n` +
      "Content-Transfer-Encoding: base64\r\n" +
      (attachment.cid ? `Content-ID: <${attachment.cid}>\r\n` : "") +
      `\r\n${encodeBase64Lines(content)}\r\n`,
  };
};

const createMessageBody = async (options) => {
  if (options.text == null && options.html == null) {
    throw createEmailError(
      "Email messages require a text or HTML body.",
      "GMAIL_CONTENT_REQUIRED"
    );
  }

  let bodyPart;
  if (options.text != null && options.html != null) {
    const alternative = multipart("alternative", createBoundary("alternative"), [
      createBodyPart("text/plain", String(options.text)),
      createBodyPart("text/html", String(options.html)),
    ]);
    bodyPart = `Content-Type: ${alternative.contentType}\r\n\r\n${alternative.body}`;
  } else if (options.html != null) {
    bodyPart = createBodyPart("text/html", String(options.html));
  } else {
    bodyPart = createBodyPart("text/plain", String(options.text));
  }

  const attachments = await Promise.all(
    (options.attachments || []).map(readAttachment)
  );
  const inlineParts = attachments.filter((item) => item.inline).map((item) => item.part);
  const regularParts = attachments.filter((item) => !item.inline).map((item) => item.part);

  if (inlineParts.length) {
    const related = multipart("related", createBoundary("related"), [
      bodyPart,
      ...inlineParts,
    ]);
    bodyPart = `Content-Type: ${related.contentType}\r\n\r\n${related.body}`;
  }

  if (regularParts.length) {
    const mixed = multipart("mixed", createBoundary("mixed"), [
      bodyPart,
      ...regularParts,
    ]);
    bodyPart = `Content-Type: ${mixed.contentType}\r\n\r\n${mixed.body}`;
  }

  return bodyPart;
};

export const createRawMessage = async (options, gmailConfig) => {
  const senderEmail = gmailConfig.GMAIL_SENDER_EMAIL;
  if (!senderEmail) {
    throw createEmailError(
      "GMAIL_SENDER_EMAIL is not configured.",
      "GMAIL_CONFIG_ERROR"
    );
  }

  const configuredSender = parseAddress(senderEmail);
  const from = options.from ? parseAddress(options.from) : configuredSender;
  if (from.email.toLowerCase() !== configuredSender.email.toLowerCase()) {
    throw createEmailError(
      "The From address must match the configured Gmail sender.",
      "GMAIL_SENDER_NOT_ALLOWED"
    );
  }
  from.name ||= gmailConfig.GMAIL_SENDER_NAME;

  const to = parseAddresses(options.to);
  if (!to.length) {
    throw createEmailError("At least one To recipient is required.", "GMAIL_INVALID_RECIPIENT");
  }
  const cc = parseAddresses(options.cc);
  const bcc = parseAddresses(options.bcc);
  const replyTo = parseAddresses(options.replyTo);

  const headers = [
    `From: ${formatAddress(from)}`,
    `To: ${to.map(formatAddress).join(", ")}`,
  ];
  if (cc.length) headers.push(`Cc: ${cc.map(formatAddress).join(", ")}`);
  if (bcc.length) headers.push(`Bcc: ${bcc.map(formatAddress).join(", ")}`);
  if (replyTo.length) headers.push(`Reply-To: ${replyTo.map(formatAddress).join(", ")}`);
  headers.push(`Subject: ${encodeHeader(options.subject || "")}`);
  headers.push(`Date: ${new Date().toUTCString()}`);
  headers.push(`Message-ID: <${randomUUID()}@${configuredSender.email.split("@")[1]}>`);
  headers.push("MIME-Version: 1.0");

  const body = await createMessageBody(options);
  const mimeMessage = `${headers.join("\r\n")}\r\n${body}`;
  return Buffer.from(mimeMessage, "utf8").toString("base64url");
};
