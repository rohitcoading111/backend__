import redis from "../config/redis.js";
import { getGeneration } from "./cacheGeneration.js";

const TTL_JITTER = 60 + Math.floor(Math.random() * 15);

let pendingFetch = null;

export const getOrFetchCourses = async (cacheKey, fetchFromDB) => {

  // If a fetch is already running, reuse it
  if (pendingFetch) {
    return pendingFetch;
  }

  // Capture current generation before DB fetch
  const currentGeneration = getGeneration();

  pendingFetch = (async () => {
    try {
      // Fetch data from MongoDB
      const data = await fetchFromDB();

      // Check whether cache was invalidated during the fetch
      if (currentGeneration !== getGeneration()) {
        return data;
      }

      // Store the fetched data in Redis
      try {
        await redis.set(
          cacheKey,
          JSON.stringify(data),
          "EX",
          TTL_JITTER
        );
      } catch (error) {
        console.error("Redis error:", error.message);
      }

      // Return fetched data
      return data;

    } finally {
      // Clear the pending request
      pendingFetch = null;
    }
  })();

  return pendingFetch;
};