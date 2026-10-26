
import { useCallback, useEffect, useState } from "react";
import { getModuleLectures } from "../services/lectureService.js";

const useModuleLectures = (moduleId) => {
  const [lectures, setLectures] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchLectures = useCallback(async () => {
    if (!moduleId) {
      setLectures([]);
      setError("Module ID is missing.");
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const response = await getModuleLectures(moduleId);

      if (!response?.success) {
        throw new Error(
          response?.message || "Failed to fetch lectures."
        );
      }

      // Assumes the API returns { success, data: { lectures: [] } }
      const moduleLectures = response?.data?.lectures;

      if (!Array.isArray(moduleLectures)) {
        throw new Error("Invalid lectures response from server.");
      }

      setLectures(moduleLectures);
    } catch (err) {
      setLectures([]);
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to load lectures."
      );
    } finally {
      setIsLoading(false);
    }
  }, [moduleId]);

  useEffect(() => {
    fetchLectures();
  }, [fetchLectures]);

  return {
    lectures,
    isLoading,
    error,
    refreshLectures: fetchLectures,
  };
};

export default useModuleLectures;
