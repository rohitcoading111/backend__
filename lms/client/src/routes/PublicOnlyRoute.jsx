
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import AuthPageSkeleton from "../features/auth/components/AuthPageSkeleton.jsx";

function PublicOnlyRoute() {
  const location = useLocation();
  const { user, isAuthenticated, isRestoring } = useSelector(
    (state) => state.auth
  );
  const pathname = location.pathname.replace(/\/+$/, "") || "/";
  const isAuthFormRoute = ["/login", "/register"].includes(pathname);

  if (isRestoring && isAuthFormRoute) {
    return (
      <AuthPageSkeleton
        variant={pathname === "/register" ? "register" : "login"}
      />
    );
  }

  if (isRestoring) {
    return (
      <div
        className="flex min-h-screen items-center justify-center bg-[#050505]"
        role="status"
        aria-label="Loading"
      >
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white/80" />
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
