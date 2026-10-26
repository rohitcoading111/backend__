
import { createBrowserRouter } from "react-router-dom";

import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import VerifyOtp from "../features/auth/pages/VerifyOtp";
import GoogleAuthCallback from "../features/auth/pages/GoogleAuthCallback";

import Dashboard from "../features/dashboard/pages/Dashboard";
import CourseCatalog from "../features/courses/pages/CourseCatalog";
import ModulesPage from "../features/modules/pages/ModulesPage.jsx";
import ModuleLecturesPage from "../features/lectures/pages/ModuleLecturesPage.jsx";

import AdminDashboard from "../features/admin/pages/AdminDashboard.jsx";
import LiveClassesPage from "../features/liveClasses/pages/LiveClassesPage.jsx";

import ProtectedRoute from "../routes/ProtectedRoute.jsx";
import PublicOnlyRoute from "../routes/PublicOnlyRoute.jsx";

export const router = createBrowserRouter([
  // Routes accessible only to logged-out users
  {
    element: <PublicOnlyRoute />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },

  // Routes protected by authentication
  {
    element: <ProtectedRoute />,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/courses", element: <CourseCatalog /> },

      {
        path: "/courses/:courseId/modules",
        element: <ModulesPage />,
      },

      {
        path: "/courses/:courseId/modules/:moduleId/lectures",
        element: <ModuleLecturesPage />,
      },

      { path: "/live-classes", element: <LiveClassesPage /> },
    ],
  },

  // Authentication callback routes
  {
    path: "/verify-otp",
    element: <VerifyOtp />,
  },
  {
    path: "/auth/google/callback",
    element: <GoogleAuthCallback />,
  },

  // Admin dashboard
  {
    path: "/adminDashboard",
    element: <AdminDashboard />,
  },
]);
