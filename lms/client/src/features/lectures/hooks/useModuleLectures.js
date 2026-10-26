
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  getModuleLectures,
  getLectureVideo,
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

  const [completedLectureIds, setCompletedLectureIds] = useState([]);

  // Find the selected lecture from the fetched list.
  const selectedLecture = useMemo(
    () =>
      lectures.find(
        (lecture) => lecture._id === selectedLectureId
      ) || null,
    [lectures, selectedLectureId]
  );

  // Fetch all lectures belonging to this module.
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

      // Keep the current selection if it still exists.
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

  // Load the selected lecture's authorized video URL.
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

  // Fetch lectures when the module changes.
  useEffect(() => {
    setSelectedLectureId(null);
    setCompletedLectureIds([]);
    setVideoUrl("");
    fetchLectures();
  }, [fetchLectures]);

  const selectLecture = useCallback((lectureId) => {
    setSelectedLectureId(lectureId);
  }, []);

  const currentIndex = lectures.findIndex(
    (lecture) => lecture._id === selectedLectureId
  );

  const goToPreviousLecture = useCallback(() => {
    if (currentIndex > 0) {
      setSelectedLectureId(lectures[currentIndex - 1]._id);
    }
  }, [currentIndex, lectures]);

  const goToNextLecture = useCallback(() => {
    if (currentIndex >= 0 && currentIndex < lectures.length - 1) {
      setSelectedLectureId(lectures[currentIndex + 1]._id);
    }
  }, [currentIndex, lectures]);

  const markLectureCompleted = useCallback(() => {
    if (!selectedLectureId) return;

    setCompletedLectureIds((previous) =>
      previous.includes(selectedLectureId)
        ? previous
        : [...previous, selectedLectureId]
    );
  }, [selectedLectureId]);

  const retryVideo = useCallback(() => {
    setVideoRetry((previous) => previous + 1);
  }, []);

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
    selectLecture,
    goToPreviousLecture,
    goToNextLecture,
    markLectureCompleted,
    retryVideo,
    refreshLectures: fetchLectures,
  };
};

export default useModuleLectures;
