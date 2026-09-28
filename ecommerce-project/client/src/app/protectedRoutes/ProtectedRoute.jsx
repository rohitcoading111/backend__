import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {

    const isAuthenticated = useSelector(
        (state) => state.auth.isAuthenticated
    );

    const isLoading = useSelector(
        (state) => state.auth.isLoading
    );

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p>Checking session...</p>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;