import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function PublicOnlyRoute() {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );

  if (isLoading) {
    return <div className="p-6 text-center">Checking session...</div>;
  }

  if (isAuthenticated && user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

export default PublicOnlyRoute;