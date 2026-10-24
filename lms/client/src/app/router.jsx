
import { createBrowserRouter } from "react-router-dom";

import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import Dashboard from "../features/dashboard/pages/Dashboard";
import VerifyOtp from "../features/auth/pages/VerifyOtp";
import GoogleAuthCallback from "../features/auth/pages/GoogleAuthCallback";
import CourseCatalog from "../features/courses/pages/CourseCatalog";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/verify-otp",
    element: <VerifyOtp />,
  },
  {
    path: "/courses",
    element: <CourseCatalog />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/auth/google/callback",
    element: <GoogleAuthCallback />,
  },
]);
