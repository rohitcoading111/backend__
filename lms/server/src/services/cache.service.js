import redis from "../config/redis.js";

export const invalidatePublishedCoursesCache = async () => {
  try {
    await redis.del("courses:published");
    console.log("Published courses cache invalidated");
  } catch (error) {
    console.error("Cache invalidation error:", error.message);
  }
};