import Redis from "ioredis";
import config from "./config.js";

const redis = new Redis(config.REDIS_URL);

redis.on("connect", () => {
  console.log("Redis connected successfully");
});

redis.on("error", (error) => {
  console.error("Redis connection error:", error.message);
});

export default redis;