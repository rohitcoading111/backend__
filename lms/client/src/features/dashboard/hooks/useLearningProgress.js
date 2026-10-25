
import { useCallback, useEffect, useState } from "react";
import { getLearningSummary } from "../services/progressService.js";

function useLearningProgress() {
  const [summary, setSummary] = useState({
    enrolledCourses: 0,
    totalLessons: 0,
    completedLessons: 0,
    overallProgress: 0,
    learningHours: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchLearningProgress = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getLearningSummary();

      if (!response?.success || !response?.data?.summary) {
        throw new Error(
          response?.message || "Failed to load learning progress."
        );
      }

      setSummary(response.data.summary);
    } catch (err) {
      console.error("Learning progress error:", err);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to load learning progress."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLearningProgress();
  }, [fetchLearningProgress]);

  return {
    summary,
    loading,
    error,
    refreshProgress: fetchLearningProgress,
  };
}

export default useLearningProgress;
