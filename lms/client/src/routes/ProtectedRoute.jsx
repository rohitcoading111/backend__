import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { getDashboardPath } from "../features/auth/utils/getDashboardPath.js";

function ProtectedRoute({
  allowedRoles = [],
  allowedAdminTypes = [],
  instructorType,
}) {
  const location = useLocation();

  // Current authenticated user
  const user = useSelector((state) => state.auth?.user);

  // Not logged in
  if (!user || !user.role) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  const role = String(user.role).toUpperCase();

  // Suspended organization admin cannot access dashboards
  if (
    role === "ADMIN" &&
    user.adminStatus === "SUSPENDED"
  ) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ message: "Your organization account is suspended." }}
      />
    );
  }

  // Check allowed role
  if (!allowedRoles.includes(role)) {
    try {
      return (
        <Navigate
          to={getDashboardPath(user)}
          replace
        />
      );
    } catch {
      return <Navigate to="/login" replace />;
    }
  }

  // Admin type verification
  if (
    role === "ADMIN" &&
    allowedAdminTypes.length > 0 &&
    !allowedAdminTypes.includes(
      String(user.adminType || "").toUpperCase()
    )
  ) {
    try {
      return (
        <Navigate
          to={getDashboardPath(user)}
          replace
        />
      );
    } catch {
      return <Navigate to="/login" replace />;
    }
  }

  // Instructor employment verification
  if (role === "INSTRUCTOR" && instructorType) {
    const isHired =
      Boolean(user.organizationId) &&
      Boolean(user.hiredBy) &&
      user.employmentStatus === "ACTIVE";

    if (
      instructorType === "ORGANIZATION" &&
      !isHired
    ) {
      return (
        <Navigate
          to="/instructor-dashboard"
          replace
        />
      );
    }

    if (
      instructorType === "INDEPENDENT" &&
      isHired
    ) {
      return (
        <Navigate
          to="/organization-instructor-dashboard"
          replace
        />
      );
    }
  }

  return <Outlet />;
}

export default ProtectedRoute;