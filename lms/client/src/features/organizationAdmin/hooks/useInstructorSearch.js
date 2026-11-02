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

      const normalizedIdentifier = value.includes("@")
        ? value.toLowerCase()
        : value.toUpperCase();

      const response = await searchIndependentInstructor(
        normalizedIdentifier
      );

      if (!response?.success) {
        throw new Error(
          response?.message || "Instructor search failed."
        );
      }

      const foundInstructor = response?.data?.instructor;

      // Backend returns id, while some frontend components use _id.
      const instructorId =
        foundInstructor?.id || foundInstructor?._id;

      if (!foundInstructor || !instructorId) {
        setInstructor(null);
        setError("No independent instructor found.");
        setHasSearched(true);
        return;
      }

      setInstructor({
        ...foundInstructor,
        id: instructorId,
        _id: instructorId,
      });

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