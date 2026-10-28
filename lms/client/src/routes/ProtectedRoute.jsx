
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({ allowedRoles }) {
  const location = useLocation();

  const { user, isAuthenticated, status } = useSelector(
    (state) => state.auth
  );

  if (status === "loading") {
    return (
      <div className="p-6 text-center">
        Checking session...
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    const roleDashboard = {
      STUDENT: "/dashboard",
      INSTRUCTOR: "/instructor-dashboard",
      ADMIN: "/adminDashboard",
    };

    return (
      <Navigate
        to={roleDashboard[user.role] || "/login"}
        replace
      />
    );
  }

  return <Outlet />;
}

export default ProtectedRoute;
