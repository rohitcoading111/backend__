
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function PublicOnlyRoute() {
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

  if (isAuthenticated && user) {
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

export default PublicOnlyRoute;
