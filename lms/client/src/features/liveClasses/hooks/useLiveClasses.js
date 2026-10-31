
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { getMyEnrollments } from "../../enrollments/services/enrollmentService.js";

import {
  getActiveLiveSession,
  joinLiveSession,
} from "../services/liveClassService.js";

// Normalize Axios response and service-returned response
const getApiBody = (response) => {
  if (response?.data?.success !== undefined) {
    return response.data;
  }

  return response;
};

const useLiveClasses = () => {
  const [liveCourses, setLiveCourses] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [error, setError] = useState("");
  const [joiningSessionId, setJoiningSessionId] = useState(null);

  // Prevent outdated requests from updating latest state
  const requestIdRef = useRef(0);

  // Track initial data loading
  const hasLoadedRef = useRef(false);

  // Fetch enrolled courses and their live sessions
  const fetchLiveCourses = useCallback(async () => {
    const currentRequestId = ++requestIdRef.current;
    const isInitialRequest = !hasLoadedRef.current;

    try {
      if (isInitialRequest) {
        setIsLoading(true);
      } else {
        setIsRefreshing(true);
      }

      setError("");

      // 1. Fetch student enrollments
      const enrollmentResponse = await getMyEnrollments();
      const enrollmentBody = getApiBody(enrollmentResponse);

      if (!enrollmentBody?.success) {
        throw new Error(
          enrollmentBody?.message ||
            "Failed to fetch enrolled courses."
        );
      }

      const enrollments =
        enrollmentBody?.data?.enrollments ??
        enrollmentBody?.enrollments;

      if (!Array.isArray(enrollments)) {
        throw new Error("Invalid enrollment response.");
      }

      // 2. Extract unique enrolled courses
      const courseMap = new Map();

      enrollments.forEach((enrollment) => {
        const course = enrollment.course;

        if (course?._id) {
          courseMap.set(course._id, course);
        }
      });

      const enrolledCourses = [...courseMap.values()];

      // 3. Fetch live status for all courses in parallel
      const coursesWithLiveStatus = await Promise.all(
        enrolledCourses.map(async (course) => {
          try {
            const response = await getActiveLiveSession(course._id);
            const body = getApiBody(response);

            if (!body?.success) {
              return {
                course,
                activeSession: null,
                liveCheckError:
                  body?.message || "Could not check live status.",
              };
            }

            return {
              course,
              activeSession: body.data ?? null,
              liveCheckError: "",
            };
          } catch (err) {
            // No active session is a normal situation
            if (err?.response?.status === 404) {
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
                err?.response?.data?.message ||
                "Could not check live status.",
            };
          }
        })
      );

      // 4. Ignore outdated responses
      if (currentRequestId !== requestIdRef.current) {
        return;
      }

      setLiveCourses(coursesWithLiveStatus);
      hasLoadedRef.current = true;
    } catch (err) {
      if (currentRequestId !== requestIdRef.current) {
        return;
      }

      console.error("Live courses fetch error:", err);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to load live classes."
      );
    } finally {
      if (currentRequestId === requestIdRef.current) {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    }
  }, []);

  // Join a live session
  const joinCourseLiveSession = useCallback(
    async (sessionId) => {
      if (joiningSessionId) {
        throw new Error("A live session is already being joined.");
      }

      try {
        setJoiningSessionId(sessionId);

        const response = await joinLiveSession(sessionId);
        const body = getApiBody(response);

        if (!body?.success) {
          throw new Error(
            body?.message || "Unable to join live class."
          );
        }

        // Return LiveKit credentials
        return body.data;
      } finally {
        setJoiningSessionId(null);
      }
    },
    [joiningSessionId]
  );

  // Initial fetch
  useEffect(() => {
    fetchLiveCourses();

    return () => {
      // Invalidate pending requests on unmount
      requestIdRef.current += 1;
    };
  }, [fetchLiveCourses]);

  return {
    liveCourses,
    isLoading,
    isRefreshing,
    error,
    joiningSessionId,
    refreshLiveCourses: fetchLiveCourses,
    joinCourseLiveSession,
  };
};

export default useLiveClasses;
