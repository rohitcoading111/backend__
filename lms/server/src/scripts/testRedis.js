import redis from "../config/redis.js";

const test = async () => {
  try {
    const result = await redis.del("courses:published");

    console.log("Delete result:", result);
  } catch (error) {
    console.error("Redis error:", error.message);
  } finally {
    redis.quit();
  }
};

test();