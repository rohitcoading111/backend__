import "dotenv/config";
import redis from "../config/redis.js";

const testRedis = async () => {
  try {
    await redis.set("learnhub:test", "Redis is working");

    const result = await redis.get("learnhub:test");

    console.log("Redis test result:", result);

    await redis.del("learnhub:test");
  } catch (error) {
    console.error("Redis test failed:", error.message);
  } finally {
    await redis.quit();
  }
};

testRedis();