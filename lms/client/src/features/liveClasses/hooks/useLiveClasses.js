
import { useCallback, useEffect, useState } from "react";

import {
  
  getActiveLiveSession,
  joinLiveSession,
} from "../services/liveClassService.js";
import getMyEnrolledCourses from "../../enrollments/services/enrollmentService.js"

function useLiveClasses() {
  const [liveCourses, setLiveCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [joiningSessionId, setJoiningSessionId] = useState(null);

  const fetchLiveCourses = useCallback(async () => {
    try {
      setIsLoading(true);
      setError("");

      // Step 1: Fetch the logged-in student's enrollments.
      const enrollmentResponse = await getMyEnrolledCourses();

      if (!enrollmentResponse?.success) {
        throw new Error(
          enrollmentResponse?.message ||
            "Failed to fetch enrolled courses."
        );
      }

      const enrollments =
        enrollmentResponse?.data?.enrollments;

      if (!Array.isArray(enrollments)) {
        throw new Error("Invalid enrollment response.");
      }

      // Step 2: Keep enrollments that have a populated course.
      const enrolledCourses = enrollments
        .filter((enrollment) => enrollment.course?._id)
        .map((enrollment) => enrollment.course);

      // Step 3: Check each course for an active live session.
      const coursesWithLiveStatus = await Promise.all(
        enrolledCourses.map(async (course) => {
          try {
            const response = await getActiveLiveSession(
              course._id
            );

            return {
              course,
              activeSession: response?.success
                ? response.data
                : null,
              liveCheckError: "",
            };
          } catch (error) {
            // A 404 is expected when no session is live.
            if (error?.response?.status === 404) {
              return {
                course,
                activeSession: null,
                liveCheckError: "",
              };
            }

            // Keep the course visible if its live status
            // could not be checked because of another error.
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

      setLiveCourses(coursesWithLiveStatus);
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to load live classes."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Join an active session and return its access details.
  const joinCourseLiveSession = async (sessionId) => {
    try {
      setJoiningSessionId(sessionId);

      const response = await joinLiveSession(sessionId);

      if (!response?.success) {
        throw new Error(
          response?.message || "Unable to join live class."
        );
      }

      // Contains sessionId, roomId, courseId, token and liveKitUrl
      // according to the backend service you shared.
      return response.data;
    } finally {
      setJoiningSessionId(null);
    }
  };

  useEffect(() => {
    fetchLiveCourses();
  }, [fetchLiveCourses]);

  return {
    liveCourses,
    isLoading,
    error,
    joiningSessionId,
    refreshLiveCourses: fetchLiveCourses,
    joinCourseLiveSession,
  };
}

export default useLiveClasses;
