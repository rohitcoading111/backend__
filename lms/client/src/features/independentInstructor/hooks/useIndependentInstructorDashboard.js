import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logoutUser } from "../../auth/authThunk/authThunks.js";
import { logout } from "../../auth/authSlices/authSlice.js";

import useAvailableOrganizations from "./useAvailableOrganizations.js";

export default function useIndependentInstructorDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  const [loggingOut, setLoggingOut] = useState(false);

  const {
    organizations,
    filteredOrganizations,
    searchTerm,
    setSearchTerm,
    isLoading,
    error,
    isIndependent,
    refreshOrganizations,
  } = useAvailableOrganizations();

  const isHired =
    Boolean(user?.organizationId) &&
    Boolean(user?.hiredBy) &&
    String(user?.employmentStatus).toUpperCase() === "ACTIVE";

  const isOrganizationMember =
    Boolean(user?.organizationId) || Boolean(user?.hiredBy);

  const instructorName = user?.name?.trim() || "Instructor";
  const initial = instructorName.charAt(0).toUpperCase();

  const employmentLabel = isHired
    ? "Hired Instructor"
    : isIndependent
      ? "Independent Instructor"
      : "Instructor Account";

  const handleLogout = useCallback(async () => {
    if (loggingOut) return;

    try {
      setLoggingOut(true);

      await dispatch(logoutUser()).unwrap();
    } catch (error) {
      console.error("Logout failed:", error);
      dispatch(logout());
    } finally {
      navigate("/login", { replace: true });
      setLoggingOut(false);
    }
  }, [dispatch, loggingOut, navigate]);

  const handleOpenOrganization = useCallback(() => {
    if (!isHired) return;

    navigate("/organization-overview");
  }, [isHired, navigate]);

  return {
    user,
    instructorName,
    initial,

    isIndependent,
    isHired,
    isOrganizationMember,
    employmentLabel,

    organizations,
    filteredOrganizations,
    searchTerm,
    setSearchTerm,
    isLoading,
    error,
    refreshOrganizations,

    loggingOut,
    handleLogout,
    handleOpenOrganization,
  };
}