import { useCallback, useEffect, useState } from "react";

import { getMyEnrollments } from "../../enrollments/services/enrollmentService.js";

import {
  getCourseModulesForProgress,
  getModuleLecturesForProgress,
} from "../services/courseProgressService.js";

const getItems = (response, key) => {
  if (Array.isArray(response?.data?.[key])) {
    return response.data[key];
  }

  if (Array.isArray(response?.[key])) {
    return response[key];
  }

  if (Array.isArray(response?.data)) {
    return response.data;
  }

  return [];
};

const useMyCourses = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchEnrollments = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getMyEnrollments();

      if (!response?.success) {
        throw new Error(
          response?.message || "Failed to load enrolled courses."
        );
      }

      const fetchedEnrollments = response?.data?.enrollments;

      if (!Array.isArray(fetchedEnrollments)) {
        throw new Error("Invalid enrollments response.");
      }

      const coursesWithProgress = await Promise.all(
        fetchedEnrollments.map(async (enrollment) => {
          const course = enrollment?.course;

          if (!course?._id) {
            return {
              ...enrollment,
              completedLessons: 0,
              totalLessons: 0,
              progress: 0,
            };
          }

          try {
            const modulesResponse =
              await getCourseModulesForProgress(course._id);

            const modules = getItems(modulesResponse, "modules");

            const lectureGroups = await Promise.all(
              modules.map(async (module) => {
                if (!module?._id) return [];

                const lecturesResponse =
                  await getModuleLecturesForProgress(module._id);

                return getItems(lecturesResponse, "lectures");
              })
            );

            const lectures = lectureGroups.flat();

            const completedIds = new Set(
              (enrollment.completedLectures || []).map((lecture) =>
                String(
                  typeof lecture === "object"
                    ? lecture._id
                    : lecture
                )
              )
            );

            const totalLessons = lectures.length;

            const completedLessons = lectures.filter((lecture) =>
              completedIds.has(String(lecture._id))
            ).length;

            const progress =
              totalLessons > 0
                ? Math.round(
                    (completedLessons / totalLessons) * 100
                  )
                : 0;

            return {
              ...enrollment,
              completedLessons,
              totalLessons,
              progress,
            };
          } catch (courseError) {
            console.error(
              `Progress fetch failed for ${course.title}:`,
              courseError
            );

            return {
              ...enrollment,
              completedLessons: 0,
              totalLessons: 0,
              progress: 0,
              progressError: true,
            };
          }
        })
      );

      setEnrollments(coursesWithProgress);
    } catch (err) {
      console.error("Fetch enrolled courses error:", err);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to load your courses."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEnrollments();
  }, [fetchEnrollments]);

  return {
    enrollments,
    loading,
    error,
    refreshCourses: fetchEnrollments,
  };
};

export default useMyCourses;
