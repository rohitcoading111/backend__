import assert from "node:assert/strict";
import { test } from "node:test";
import config from "../src/config/config.js";
import {
  clearRefreshCookie,
  refreshCookieOptions,
  setRefreshCookie,
} from "../src/utils/refreshCookie.js";

test("uses a secure cross-site cookie in production", () => {
  const previousEnvironment = config.NODE_ENV;
  const previousRender = config.IS_RENDER;
  config.NODE_ENV = "production";
  config.IS_RENDER = false;

  try {
    assert.deepEqual(refreshCookieOptions(), {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });
  } finally {
    config.NODE_ENV = previousEnvironment;
    config.IS_RENDER = previousRender;
  }
});

test("uses a local-development cookie without Secure or cross-site SameSite", () => {
  const previousEnvironment = config.NODE_ENV;
  const previousRender = config.IS_RENDER;
  config.NODE_ENV = "development";
  config.IS_RENDER = false;

  try {
    assert.deepEqual(refreshCookieOptions(), {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });
  } finally {
    config.NODE_ENV = previousEnvironment;
    config.IS_RENDER = previousRender;
  }
});

test("sets and clears the refresh cookie with matching identity attributes", () => {
  let setOptions;
  let clearedName;
  let clearOptions;
  const response = {
    cookie(name, value, options) {
      assert.equal(name, "refreshToken");
      assert.equal(value, "mock-refresh-token");
      setOptions = options;
    },
    clearCookie(name, options) {
      clearedName = name;
      clearOptions = options;
    },
  };
  const previousEnvironment = config.NODE_ENV;
  const previousRender = config.IS_RENDER;
  config.NODE_ENV = "production";
  config.IS_RENDER = false;

  try {
    setRefreshCookie(response, "mock-refresh-token");
    clearRefreshCookie(response);
    assert.equal(clearedName, "refreshToken");
    assert.deepEqual(clearOptions, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });
    assert.deepEqual(
      Object.fromEntries(
        ["httpOnly", "secure", "sameSite", "path"].map((key) => [
          key,
          setOptions[key],
        ])
      ),
      clearOptions
    );
    assert.equal(setOptions.maxAge, 7 * 24 * 60 * 60 * 1000);
  } finally {
    config.NODE_ENV = previousEnvironment;
    config.IS_RENDER = previousRender;
  }
});
