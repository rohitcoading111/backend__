import crypto from "crypto";
import config from "../config/config.js";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12;
const AUTH_TAG_LENGTH = 16;

const getEncryptionKey = () => {
  const key = config.bankEncryptionKey;

  if (!key || !/^[a-fA-F0-9]{64}$/.test(key)) {
    throw new Error(
      "Invalid BANK_ENCRYPTION_KEY. A 32-byte hexadecimal key is required."
    );
  }

  return Buffer.from(key, "hex");
};

// Encrypt bank account number
export const encryptBankAccountNumber = (accountNumber) => {
  if (!accountNumber || typeof accountNumber !== "string") {
    throw new Error("Valid bank account number is required");
  }

  const normalizedAccountNumber = accountNumber.replace(/\s/g, "");

  const key = getEncryptionKey();

  // Generate a fresh random IV for every encryption
  const iv = crypto.randomBytes(IV_LENGTH);

  const cipher = crypto.createCipheriv(ALGORITHM, key, iv, {
    authTagLength: AUTH_TAG_LENGTH,
  });

  const encrypted = Buffer.concat([
    cipher.update(normalizedAccountNumber, "utf8"),
    cipher.final(),
  ]);

  const authTag = cipher.getAuthTag();

  // Store IV + Auth Tag + Ciphertext
  return [
    iv.toString("hex"),
    authTag.toString("hex"),
    encrypted.toString("hex"),
  ].join(":");
};

// Decrypt bank account number
export const decryptBankAccountNumber = (encryptedData) => {
  if (!encryptedData || typeof encryptedData !== "string") {
    throw new Error("Encrypted bank account data is required");
  }

  const parts = encryptedData.split(":");

  if (parts.length !== 3) {
    throw new Error("Invalid encrypted bank account format");
  }

  const [ivHex, authTagHex, encryptedHex] = parts;

  if (
    !/^[a-fA-F0-9]{24}$/.test(ivHex) ||
    !/^[a-fA-F0-9]{32}$/.test(authTagHex) ||
    !/^(?:[a-fA-F0-9]{2})+$/.test(encryptedHex)
  ) {
    throw new Error("Invalid encrypted bank account data");
  }

  const key = getEncryptionKey();

  const iv = Buffer.from(ivHex, "hex");
  const authTag = Buffer.from(authTagHex, "hex");
  const encrypted = Buffer.from(encryptedHex, "hex");

  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv, {
    authTagLength: AUTH_TAG_LENGTH,
  });

  decipher.setAuthTag(authTag);

  const decrypted = Buffer.concat([
    decipher.update(encrypted),
    decipher.final(),
  ]);

  return decrypted.toString("utf8");
};
