import { useCallback, useEffect, useState } from "react";

import { getMyEnrollments } from "../../enrollments/services/enrollmentService.js";

import {
  getActiveLiveSession,
  joinLiveSession,
} from "../services/liveClassService.js";

const useLiveClasses = () => {
  const [liveCourses, setLiveCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [joiningSessionId, setJoiningSessionId] = useState(null);

  // Fetch enrolled courses and check their live sessions
  const fetchLiveCourses = useCallback(async () => {
    try {
      setIsLoading(true);
      setError("");

      // 1. Fetch courses in which the student is enrolled
      const enrollmentResponse = await getMyEnrollments();

      if (!enrollmentResponse?.success) {
        throw new Error(
          enrollmentResponse?.message || "Failed to fetch enrolled courses."
        );
      }

      const enrollments = enrollmentResponse?.data?.enrollments;

      if (!Array.isArray(enrollments)) {
        throw new Error("Invalid enrollment response.");
      }

      // 2. Extract course objects from enrollments
      const enrolledCourses = enrollments
        .filter((enrollment) => enrollment.course?._id)
        .map((enrollment) => enrollment.course);

      // 3. Check the active live session for each enrolled course
      const coursesWithLiveStatus = await Promise.all(
        enrolledCourses.map(async (course) => {
          try {
            const response = await getActiveLiveSession(course._id);

            return {
              course,
              activeSession: response?.success ? response.data : null,
              liveCheckError: "",
            };
          } catch (error) {
            // No active session is a normal situation
            if (error?.response?.status === 404) {
              return {
                course,
                activeSession: null,
                liveCheckError: "",
              };
            }

            return {
              course,
              activeSession: null,
              liveCheckError:
                error?.response?.data?.message ||
                "Could not check live status.",
            };
          }
        })
      );

      // 4. Update the UI with course and live-session information
      setLiveCourses(coursesWithLiveStatus);
    } catch (error) {
      setLiveCourses([]);

      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to load live classes."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Join a live session
  const joinCourseLiveSession = useCallback(async (sessionId) => {
    try {
      setJoiningSessionId(sessionId);

      const response = await joinLiveSession(sessionId);

      if (!response?.success) {
        throw new Error(
          response?.message || "Unable to join live class."
        );
      }

      // Return token, room ID, and LiveKit URL to the page
      return response.data;
    } finally {
      setJoiningSessionId(null);
    }
  }, []);

  // Fetch courses when the hook is first used
  useEffect(() => {
    fetchLiveCourses();
  }, [fetchLiveCourses]);

  // Expose data and functions to the page
  return {
    liveCourses,
    isLoading,
    error,
    joiningSessionId,
    refreshLiveCourses: fetchLiveCourses,
    joinCourseLiveSession,
  };
};

export default useLiveClasses;