import { useCallback, useEffect, useState } from "react";
import { getLearningSummary } from "../services/progressService.js";

const INITIAL_SUMMARY = {
  enrolledCourses: 0,
  totalLessons: 0,
  completedLessons: 0,
  overallProgress: 0,
  learningHours: 0,
};

const useLearningProgress = () => {
  const [summary, setSummary] = useState(INITIAL_SUMMARY);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchLearningProgress = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getLearningSummary();

      if (!response?.success || !response?.data?.summary) {
        throw new Error(
          response?.message || "Failed to load learning progress."
        );
      }

      const data = response.data.summary;

      setSummary({
        enrolledCourses: Number(data.enrolledCourses) || 0,
        totalLessons: Number(data.totalLessons) || 0,
        completedLessons: Number(data.completedLessons) || 0,
        overallProgress: Number(data.overallProgress) || 0,
        learningHours: Number(data.learningHours) || 0,
      });
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
};

export default useLearningProgress;
