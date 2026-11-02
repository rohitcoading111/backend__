import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getInstructorOrganizationOverview,
} from "../services/orgInstructorService.js";

export default function useOrgInstructor() {
  const navigate = useNavigate();

  const [organization, setOrganization] = useState(null);
  const [courses, setCourses] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch organization overview
  const refreshOverview = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getInstructorOrganizationOverview();

      setOrganization(response?.organization || null);
      setCourses(
        Array.isArray(response?.courses)
          ? response.courses
          : []
      );
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to load organization overview."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshOverview();
  }, [refreshOverview]);

  // Navigate to personal dashboard
  const handlePersonalDashboard = useCallback(() => {
    navigate("/instructor-dashboard");
  }, [navigate]);

  // Navigate to existing organization course dashboard
  const handleOrganizationCourses = useCallback(() => {
    navigate("/organization-instructor-dashboard", {
      state: {
        activeSection: "courses",
      },
    });
  }, [navigate]);

  return {
    organization,
    courses,
    loading,
    error,

    refreshOverview,

    handlePersonalDashboard,
    handleOrganizationCourses,
  };
}