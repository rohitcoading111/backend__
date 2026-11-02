import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useSelector } from "react-redux";

import {
  getAvailableOrganizations,
} from "../services/independentInstructorService.js";

export default function useAvailableOrganizations() {
  const user = useSelector((state) => state.auth.user);

  const isIndependent =
    String(user?.role).toUpperCase() === "INSTRUCTOR" &&
    !user?.organizationId &&
    !user?.hiredBy &&
    (
      String(user?.employmentStatus).toUpperCase() === "INDEPENDENT" ||
      !user?.employmentStatus
    );

  const [organizations, setOrganizations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const refreshOrganizations = useCallback(async () => {
    // Do not call independent-only API for hired instructors.
    if (!isIndependent) {
      setOrganizations([]);
      setError("");
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const response = await getAvailableOrganizations();

      const organizationList =
        response?.data?.organizations ||
        response?.organizations ||
        [];

      setOrganizations(
        Array.isArray(organizationList)
          ? organizationList
          : []
      );
    } catch (err) {
      setOrganizations([]);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to load organizations."
      );
    } finally {
      setIsLoading(false);
    }
  }, [isIndependent]);

  useEffect(() => {
    if (isIndependent) {
      refreshOrganizations();
    } else {
      setOrganizations([]);
      setSearchTerm("");
      setError("");
      setIsLoading(false);
    }
  }, [isIndependent, refreshOrganizations]);

  // Refresh when user returns to the tab.
  useEffect(() => {
    if (!isIndependent) return undefined;

    const handleFocus = () => {
      refreshOrganizations();
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, [isIndependent, refreshOrganizations]);

  const filteredOrganizations = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) return organizations;

    return organizations.filter((organization) => {
      return (
        organization.name?.toLowerCase().includes(query) ||
        organization.email?.toLowerCase().includes(query)
      );
    });
  }, [organizations, searchTerm]);

  return {
    organizations,
    filteredOrganizations,

    searchTerm,
    setSearchTerm,

    isLoading,
    error,
    isIndependent,

    refreshOrganizations,
  };
}