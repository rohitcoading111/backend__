import assert from "node:assert/strict";
import { test } from "node:test";
import mongoose from "mongoose";

import ChatCooldown from "../src/models/chatCooldown.models.js";
import ChatMessage from "../src/models/chatMessage.models.js";
import Enrollment from "../src/models/enrollment.models.js";
import LiveSession from "../src/models/liveSession.models.js";
import { registerChatHandlers } from "../src/sockets/chat.socket.js";
import {
  createChatCooldownService,
} from "../src/services/chatCooldown.service.js";

const now = 1_800_000_000_000;

test("cooldown claim uses a user-session conditional upsert", async () => {
  let update;
  const service = createChatCooldownService({
    now: () => now,
    cooldownModel: {
      findOneAndUpdate(filter, change, options) {
        update = { filter, change, options };
        return Promise.resolve({
          expiresAt: change.$set.expiresAt,
        });
      },
    },
  });

  const result = await service.claim({
    liveSessionId: "session",
    userId: "user",
    cooldownSeconds: 5,
  });

  assert.equal(result.accepted, true);
  assert.equal(result.remainingMs, 5000);
  assert.equal(update.filter._id, "session:user");
  assert.equal(update.filter.liveSession, "session");
  assert.equal(update.filter.user, "user");
  assert.deepEqual(update.filter.$or, [
    { expiresAt: { $lte: new Date(now) } },
    { expiresAt: { $exists: false } },
  ]);
  assert.equal(update.options.upsert, true);
});

test("cooldown ledger uses a deterministic primary key and TTL index", async () => {
  const cooldown = new ChatCooldown({
    _id: "session:user",
    liveSession: new mongoose.Types.ObjectId(),
    user: new mongoose.Types.ObjectId(),
    expiresAt: new Date(),
  });

  await cooldown.validate();
  assert.equal(ChatCooldown.schema.path("_id").instance, "String");
  assert.equal(
    ChatCooldown.schema
      .indexes()
      .some(
        ([keys, options]) =>
          keys.expiresAt === 1 && options.expireAfterSeconds === 0
      ),
    true
  );
});

test("duplicate concurrent claim returns the active remaining time", async () => {
  const service = createChatCooldownService({
    now: () => now,
    cooldownModel: {
      findOneAndUpdate() {
        const error = new Error("duplicate key");
        error.code = 11000;
        throw error;
      },
      findOne() {
        return {
          select() {
            return this;
          },
          lean: async () => ({
            expiresAt: new Date(now + 3200),
          }),
        };
      },
    },
  });

  const result = await service.claim({
    liveSessionId: "session",
    userId: "user",
    cooldownSeconds: 5,
  });

  assert.deepEqual(result, {
    accepted: false,
    remainingMs: 3200,
  });
});

test("an expired entry removed by TTL is retried once", async () => {
  let attempts = 0;
  const service = createChatCooldownService({
    now: () => now,
    cooldownModel: {
      findOneAndUpdate(_filter, change) {
        attempts += 1;
        if (attempts === 1) {
          const error = new Error("duplicate key");
          error.code = 11000;
          throw error;
        }
        return Promise.resolve({
          expiresAt: change.$set.expiresAt,
        });
      },
      findOne() {
        return {
          select() {
            return this;
          },
          lean: async () => ({
            expiresAt: new Date(now - 1),
          }),
        };
      },
    },
  });

  const result = await service.claim({
    liveSessionId: "session",
    userId: "user",
    cooldownSeconds: 10,
  });

  assert.equal(result.accepted, true);
  assert.equal(attempts, 2);
});

test("no cooldown skips persistence and unsupported values are rejected", async () => {
  const service = createChatCooldownService({
    cooldownModel: {
      findOneAndUpdate() {
        throw new Error("no-cooldown claims must not write");
      },
    },
  });

  assert.deepEqual(
    await service.claim({
      liveSessionId: "session",
      userId: "user",
      cooldownSeconds: 0,
    }),
    { accepted: true, remainingMs: 0 }
  );
  await assert.rejects(
    service.claim({
      liveSessionId: "session",
      userId: "user",
      cooldownSeconds: 7,
    }),
    /Invalid chat cooldown duration/
  );
});

test("chat:send rejects a second message before saving it", async () => {
  const liveSessionId = new mongoose.Types.ObjectId();
  const courseId = new mongoose.Types.ObjectId();
  const session = {
    _id: liveSessionId,
    course: courseId,
    instructor: new mongoose.Types.ObjectId(),
    status: "LIVE",
    isChatEnabled: true,
    chatCooldownSeconds: 5,
  };
  const originalFindById = LiveSession.findById;
  const originalEnrollmentFindOne = Enrollment.findOne;
  const originalCooldownFindOneAndUpdate =
    ChatCooldown.findOneAndUpdate;
  const originalCooldownFindOne = ChatCooldown.findOne;
  const originalMessageCreate = ChatMessage.create;
  const savedMessages = [];
  let expiresAt = null;

  LiveSession.findById = () => ({
    select: async () => session,
  });
  Enrollment.findOne = async () => ({ _id: "enrollment" });
  ChatCooldown.findOneAndUpdate = (_filter, change) => {
    if (expiresAt && expiresAt > new Date()) {
      const error = new Error("duplicate key");
      error.code = 11000;
      throw error;
    }

    expiresAt = change.$set.expiresAt;
    return Promise.resolve({ expiresAt });
  };
  ChatCooldown.findOne = () => ({
    select() {
      return this;
    },
    lean: async () => ({ expiresAt }),
  });
  ChatMessage.create = async (message) => {
    savedMessages.push(message);
    return {
      ...message,
      _id: new mongoose.Types.ObjectId(),
      createdAt: new Date(),
    };
  };

  try {
    const handlers = new Map();
    const emitted = [];
    const socket = {
      user: {
        id: new mongoose.Types.ObjectId().toString(),
        name: "Student",
        role: "STUDENT",
      },
      rooms: new Set([`live:${liveSessionId}`]),
      on(event, handler) {
        handlers.set(event, handler);
      },
      emit(event, data) {
        emitted.push({ event, data });
      },
    };
    const broadcastMessages = [];
    const io = {
      to() {
        return {
          emit(event, data) {
            broadcastMessages.push({ event, data });
          },
        };
      },
    };
    registerChatHandlers(io, socket);
    const send = handlers.get("chat:send");
    const payload = {
      liveSessionId: liveSessionId.toString(),
      message: "Hello",
    };
    let firstResponse;
    let secondResponse;

    await send(payload, (response) => {
      firstResponse = response;
    });
    await send(payload, (response) => {
      secondResponse = response;
    });

    assert.equal(firstResponse.success, true);
    assert.equal(secondResponse.success, false);
    assert.equal(secondResponse.code, "CHAT_COOLDOWN");
    assert.ok(secondResponse.remainingMs > 0);
    assert.equal(savedMessages.length, 1);
    assert.equal(broadcastMessages.length, 1);
    assert.equal(broadcastMessages[0].event, "chat:new-message");
    assert.equal(
      emitted.some(({ data }) => data.code === "CHAT_COOLDOWN"),
      true
    );
  } finally {
    LiveSession.findById = originalFindById;
    Enrollment.findOne = originalEnrollmentFindOne;
    ChatCooldown.findOneAndUpdate =
      originalCooldownFindOneAndUpdate;
    ChatCooldown.findOne = originalCooldownFindOne;
    ChatMessage.create = originalMessageCreate;
  }
});
