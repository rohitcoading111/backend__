import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  getAvailableOrganizations,
} from "../services/independentInstructorService.js";

function useAvailableOrganizations() {
  const [organizations, setOrganizations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch organizations
  const fetchOrganizations = useCallback(
    async ({ silent = false } = {}) => {
      try {
        if (!silent) {
          setIsLoading(true);
        }

        setError("");

        const response = await getAvailableOrganizations();

        if (!response?.success) {
          throw new Error(
            response?.message || "Unable to fetch organizations"
          );
        }

        const list = response?.data?.organizations;

        if (!Array.isArray(list)) {
          throw new Error("Invalid organizations response");
        }

        setOrganizations(list);
      } catch (err) {
        setError(
          err?.response?.data?.message ||
            err?.message ||
            "Unable to load organizations"
        );
      } finally {
        if (!silent) {
          setIsLoading(false);
        }
      }
    },
    []
  );

  // Search by organization name or email
  const filteredOrganizations = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) return organizations;

    return organizations.filter((organization) => {
      const name = organization.name?.toLowerCase() || "";
      const email = organization.email?.toLowerCase() || "";

      return name.includes(query) || email.includes(query);
    });
  }, [organizations, searchTerm]);

  // Initial fetch and refresh when returning to the tab
  useEffect(() => {
    fetchOrganizations();

    const handleFocus = () => {
      fetchOrganizations({ silent: true });
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, [fetchOrganizations]);

  return {
    organizations,
    filteredOrganizations,

    searchTerm,
    setSearchTerm,

    isLoading,
    error,

    fetchOrganizations,
  };
}

export default useAvailableOrganizations;