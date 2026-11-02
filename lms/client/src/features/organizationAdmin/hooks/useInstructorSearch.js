import { useState } from "react";

import {
  searchIndependentInstructor,
} from "../services/organizationAdminService.js";

function useInstructorSearch() {
  const [identifier, setIdentifier] = useState("");
  const [instructor, setInstructor] = useState(null);

  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (event) => {
    event?.preventDefault();

    const value = identifier.trim();

    if (!value) {
      setError("Enter an Instructor ID or email address.");
      setInstructor(null);
      setHasSearched(false);
      return;
    }

    try {
      setIsSearching(true);
      setError("");
      setInstructor(null);
      setHasSearched(false);

      // Normalize based on identifier type
      const normalizedIdentifier = value.includes("@")
        ? value.toLowerCase()
        : value.toUpperCase();

      const response = await searchIndependentInstructor(
        normalizedIdentifier
      );

      if (!response?.success) {
        throw new Error(
          response?.message || "Instructor search failed"
        );
      }

      // Supports common controller response shapes
      const foundInstructor =
        response?.data?.instructor ??
        response?.data?.user ??
        response?.data;

      if (
        !foundInstructor ||
        typeof foundInstructor !== "object" ||
        Array.isArray(foundInstructor) ||
        !foundInstructor._id
      ) {
        setInstructor(null);
        setHasSearched(true);
        return;
      }

      setInstructor(foundInstructor);
      setHasSearched(true);
    } catch (err) {
      setInstructor(null);
      setHasSearched(true);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "No independent instructor found with this ID or email."
      );
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setIdentifier("");
    setInstructor(null);
    setError("");
    setHasSearched(false);
  };

  return {
    identifier,
    setIdentifier,

    instructor,
    isSearching,
    error,
    hasSearched,

    handleSearch,
    clearSearch,
  };
}

export default useInstructorSearch;