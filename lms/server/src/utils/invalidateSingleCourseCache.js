import redis from "../config/redis.js";

export const invalidateSingleCourseCache = async (
  courseId,
  instructorId,
  organizationId
) => {
  const cacheKey = `course:${courseId}:${instructorId}:${organizationId || "individual"}`;

  try {
    await redis.del(cacheKey);
    console.log("Single course cache invalidated");
  } catch (error) {
    console.error("Single course cache invalidation error:", error.message);
  }
};