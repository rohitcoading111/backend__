
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
import InstructorDashboard from "../features/instructor/pages/InstructorDashboard.jsx";

import LiveRoom from "../features/instructor/components/LiveRoom.jsx";

import ProtectedRoute from "../routes/ProtectedRoute.jsx";
import PublicOnlyRoute from "../routes/PublicOnlyRoute.jsx";

export const router = createBrowserRouter([
  {
    element: <PublicOnlyRoute />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },

  // Student routes
  {
    element: <ProtectedRoute allowedRoles={["STUDENT"]} />,
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

// Instructor routes
{
  element: <ProtectedRoute allowedRoles={["INSTRUCTOR"]} />,
  children: [
    {
      path: "/instructor-dashboard",
      element: <InstructorDashboard />,
    },
    {
      path: "/instructor/live-room",
      element: <LiveRoom />,
    },
  ],
},

  // Admin routes
  {
    element: <ProtectedRoute allowedRoles={["ADMIN"]} />,
    children: [
      {
        path: "/adminDashboard",
        element: <AdminDashboard />,
      },
    ],
  },

  // Authentication callbacks
  { path: "/verify-otp", element: <VerifyOtp /> },
  {
    path: "/auth/google/callback",
    element: <GoogleAuthCallback />,
  },
]);
