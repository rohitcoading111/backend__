import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";

import { updateEnvFile } from "../src/utils/updateEnvFile.js";

test("updates an existing env variable and preserves other values", async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), "lms-env-"));
  const envPath = path.join(directory, ".env");

  try {
    await writeFile(
      envPath,
      "GMAIL_API_CLIENT_ID=keep-this\r\nGMAIL_API_REFRESH_TOKEN=old-token\r\n",
      "utf8"
    );

    await updateEnvFile(envPath, "GMAIL_API_REFRESH_TOKEN", "new-token");

    assert.equal(
      await readFile(envPath, "utf8"),
      "GMAIL_API_CLIENT_ID=keep-this\r\nGMAIL_API_REFRESH_TOKEN=new-token\r\n"
    );
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test("appends an env variable when it is missing", async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), "lms-env-"));
  const envPath = path.join(directory, ".env");

  try {
    await writeFile(envPath, "EMAIL_PROVIDER=gmail-api", "utf8");

    await updateEnvFile(envPath, "GMAIL_API_REFRESH_TOKEN", "new-token");

    assert.equal(
      await readFile(envPath, "utf8"),
      "EMAIL_PROVIDER=gmail-api\nGMAIL_API_REFRESH_TOKEN=new-token"
    );
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
