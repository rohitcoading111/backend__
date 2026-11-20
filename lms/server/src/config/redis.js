import Redis from "ioredis";
import config from "./config.js";

const redis = new Redis(config.REDIS_URL, {
  connectTimeout: 2000,
  enableOfflineQueue: false,
  maxRetriesPerRequest: 1,

  retryStrategy(times) {
    if (times > 3) return null;
    return 1000;
  },
});

redis.on("connect", () => {
  console.log("Redis connected successfully");
});

redis.on("error", (error) => {
  console.error("Redis connection error:", error.message);
});

export default redis;