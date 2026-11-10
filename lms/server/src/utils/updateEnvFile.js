import { randomBytes } from "node:crypto";
import { readFile, rename, rm, writeFile } from "node:fs/promises";

export const updateEnvFile = async (envPath, key, value) => {
  if (!/^[A-Z_][A-Z0-9_]*$/.test(key) || /[\r\n]/.test(value)) {
    throw new Error("Invalid environment variable assignment.");
  }

  const contents = await readFile(envPath, "utf8");
  const newline = contents.includes("\r\n") ? "\r\n" : "\n";
  const lines = contents.split(/\r?\n/);
  const hasTrailingNewline = /\r?\n$/.test(contents);
  if (hasTrailingNewline) lines.pop();

  const keyPattern = new RegExp(`^\\s*${key}\\s*=`);
  const existingIndex = lines.findIndex((line) => keyPattern.test(line));

  if (existingIndex >= 0) {
    lines[existingIndex] = lines[existingIndex].replace(
      new RegExp(`^(\\s*${key}\\s*=\\s*).*$`),
      (_line, prefix) => `${prefix}${value}`
    );
  } else {
    lines.push(`${key}=${value}`);
  }

  const updatedContents =
    lines.join(newline) + (hasTrailingNewline ? newline : "");
  const temporaryPath = `${envPath}.${process.pid}.${randomBytes(6).toString("hex")}.tmp`;

  try {
    await writeFile(temporaryPath, updatedContents, {
      encoding: "utf8",
      flag: "wx",
      mode: 0o600,
    });
    await rename(temporaryPath, envPath);
  } catch (error) {
    await rm(temporaryPath, { force: true });
    throw error;
  }
};
