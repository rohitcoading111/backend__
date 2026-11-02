import { useCallback, useEffect, useState } from "react";

import {
  getOrganizationInstructors,
  hireInstructor,
  removeInstructor,
} from "../services/organizationAdminService.js";

function useOrganizationInstructors() {
  const [instructors, setInstructors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [activeInstructorId, setActiveInstructorId] = useState(null);
  const [activeAction, setActiveAction] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch instructors belonging to the logged-in organization
  const fetchInstructors = useCallback(async ({ silent = false } = {}) => {
    try {
      if (!silent) {
        setIsLoading(true);
      }

      setError("");

      const response = await getOrganizationInstructors();

      if (!response?.success) {
        throw new Error(
          response?.message || "Failed to fetch organization instructors"
        );
      }

      const fetchedInstructors =
        response?.data?.instructors ??
        response?.data?.users ??
        (Array.isArray(response?.data) ? response.data : null);

      if (!Array.isArray(fetchedInstructors)) {
        throw new Error("Invalid instructors response from server");
      }

      setInstructors(fetchedInstructors);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to load instructors"
      );
    } finally {
      if (!silent) {
        setIsLoading(false);
      }
    }
  }, []);

  // Common handler for hire and remove operations
  const executeAction = async (instructorId, action, apiFunction) => {
    if (activeInstructorId) return false;

    try {
      setActiveInstructorId(instructorId);
      setActiveAction(action);
      setError("");
      setSuccess("");

      const response = await apiFunction();

      if (response?.success === false) {
        throw new Error(
          response?.message || `Unable to ${action.toLowerCase()} instructor`
        );
      }

      setSuccess(
        response?.message ||
          `Instructor ${action.toLowerCase()} operation successful`
      );

      // Refresh organization instructor list after action
      await fetchInstructors({ silent: true });

      return true;
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          `Unable to ${action.toLowerCase()} instructor`
      );

      return false;
    } finally {
      setActiveInstructorId(null);
      setActiveAction("");
    }
  };

  // Hire instructor
  const handleHireInstructor = (userId) => {
    return executeAction(userId, "HIRE", () =>
      hireInstructor(userId)
    );
  };

  // Remove instructor
  const handleRemoveInstructor = (instructorId) => {
    return executeAction(instructorId, "REMOVE", () =>
      removeInstructor(instructorId)
    );
  };

  // Initial fetch when organization dashboard opens
  useEffect(() => {
    fetchInstructors();
  }, [fetchInstructors]);

  return {
    instructors,
    isLoading,
    error,
    success,

    activeInstructorId,
    activeAction,

    fetchInstructors,
    handleHireInstructor,
    handleRemoveInstructor,
  };
}

export default useOrganizationInstructors;