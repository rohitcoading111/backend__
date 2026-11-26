import redis from "../config/redis.js";
import {  incrementGeneration,} from "./cacheGeneration.js";

export const invalidatePublishedCoursesCache = async () => {
  try {
    incrementGeneration();
    await redis.del("courses:published");

    console.log("Published courses cache invalidated");
  } catch (error) {
    console.error("Cache invalidation error:", error.message);
  }
};