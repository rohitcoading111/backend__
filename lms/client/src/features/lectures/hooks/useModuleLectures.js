import { useCallback, useEffect, useMemo, useState } from "react";

import {
  getModuleLectures,
  getLectureVideo,
  completeLecture,
} from "../services/lectureService.js";

const useModuleLectures = (moduleId) => {
  const [lectures, setLectures] = useState([]);
  const [selectedLectureId, setSelectedLectureId] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [videoUrl, setVideoUrl] = useState("");
  const [videoLoading, setVideoLoading] = useState(false);
  const [videoError, setVideoError] = useState("");
  const [videoRetry, setVideoRetry] = useState(0);

  // Completed lecture IDs
  const [completedLectureIds, setCompletedLectureIds] = useState([]);

  // Completion button states
  const [completionLoading, setCompletionLoading] = useState(false);
  const [completionError, setCompletionError] = useState("");

  // Find currently selected lecture
  const selectedLecture = useMemo(
    () =>
      lectures.find(
        (lecture) => lecture._id === selectedLectureId
      ) || null,
    [lectures, selectedLectureId]
  );

  // Fetch lectures for the current module
  const fetchLectures = useCallback(async () => {
    if (!moduleId) {
      setLectures([]);
      setSelectedLectureId(null);
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

      const fetchedLectures = response?.data?.lectures;

      if (!Array.isArray(fetchedLectures)) {
        throw new Error("Invalid lectures response.");
      }

      setLectures(fetchedLectures);

      setSelectedLectureId((currentId) => {
        if (
          currentId &&
          fetchedLectures.some(
            (lecture) => lecture._id === currentId
          )
        ) {
          return currentId;
        }

        return fetchedLectures[0]?._id || null;
      });
    } catch (err) {
      setLectures([]);
      setSelectedLectureId(null);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to load lectures."
      );
    } finally {
      setIsLoading(false);
    }
  }, [moduleId]);

  // Fetch video for the selected lecture
  useEffect(() => {
    let cancelled = false;

    const fetchVideo = async () => {
      setVideoUrl("");
      setVideoError("");

      if (!selectedLecture) {
        setVideoLoading(false);
        return;
      }

      if (!selectedLecture.videoAvailable) {
        setVideoLoading(false);
        setVideoError(
          "Video has not been uploaded for this lecture yet."
        );
        return;
      }

      try {
        setVideoLoading(true);

        const response = await getLectureVideo(
          selectedLecture._id
        );

        if (!response?.success || !response?.data?.videoUrl) {
          throw new Error(
            response?.message || "Unable to load this video."
          );
        }

        if (!cancelled) {
          setVideoUrl(response.data.videoUrl);
        }
      } catch (err) {
        if (!cancelled) {
          setVideoError(
            err?.response?.data?.message ||
              err?.message ||
              "Unable to load this video."
          );
        }
      } finally {
        if (!cancelled) {
          setVideoLoading(false);
        }
      }
    };

    fetchVideo();

    return () => {
      cancelled = true;
    };
  }, [selectedLecture, videoRetry]);

  // Load lectures when module changes
  useEffect(() => {
    setSelectedLectureId(null);
    setCompletedLectureIds([]);
    setVideoUrl("");
    setCompletionError("");

    fetchLectures();
  }, [fetchLectures]);

  // Select a lecture
  const selectLecture = useCallback((lectureId) => {
    setSelectedLectureId(lectureId);
    setCompletionError("");
  }, []);

  // Current lecture index
  const currentIndex = lectures.findIndex(
    (lecture) => lecture._id === selectedLectureId
  );

  // Previous lecture
  const goToPreviousLecture = useCallback(() => {
    if (currentIndex > 0) {
      setSelectedLectureId(lectures[currentIndex - 1]._id);
    }
  }, [currentIndex, lectures]);

  // Next lecture
  const goToNextLecture = useCallback(() => {
    if (
      currentIndex >= 0 &&
      currentIndex < lectures.length - 1
    ) {
      setSelectedLectureId(lectures[currentIndex + 1]._id);
    }
  }, [currentIndex, lectures]);

  // Mark lecture as completed in the backend
  const markLectureCompleted = useCallback(async () => {
    if (!selectedLectureId || completionLoading) {
      return;
    }

    // Avoid unnecessary duplicate requests
    if (completedLectureIds.includes(selectedLectureId)) {
      return;
    }

    try {
      setCompletionLoading(true);
      setCompletionError("");

      const response = await completeLecture(selectedLectureId);

      if (!response?.success) {
        throw new Error(
          response?.message || "Could not complete lecture."
        );
      }

      // Update frontend state after backend success
      setCompletedLectureIds((previous) =>
        previous.includes(selectedLectureId)
          ? previous
          : [...previous, selectedLectureId]
      );
    } catch (err) {
      setCompletionError(
        err?.response?.data?.message ||
          err?.message ||
          "Could not complete lecture."
      );
    } finally {
      setCompletionLoading(false);
    }
  }, [
    selectedLectureId,
    completionLoading,
    completedLectureIds,
  ]);

  // Retry loading the video
  const retryVideo = useCallback(() => {
    setVideoRetry((previous) => previous + 1);
  }, []);

  // Local progress calculation
  const completedCount = completedLectureIds.length;

  const progressPercentage = lectures.length
    ? Math.round((completedCount / lectures.length) * 100)
    : 0;

  return {
    lectures,
    selectedLecture,
    currentIndex,

    isLoading,
    error,

    videoUrl,
    videoLoading,
    videoError,

    completedLectureIds,
    completedCount,
    progressPercentage,

    completionLoading,
    completionError,

    selectLecture,
    goToPreviousLecture,
    goToNextLecture,
    markLectureCompleted,

    retryVideo,
    refreshLectures: fetchLectures,
  };
};

export default useModuleLectures;
