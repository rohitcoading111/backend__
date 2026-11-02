import { createBrowserRouter, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Authentication
import Login from "../features/auth/pages/Login.jsx";
import Register from "../features/auth/pages/Register.jsx";
import VerifyOtp from "../features/auth/pages/VerifyOtp.jsx";
import GoogleAuthCallback from "../features/auth/pages/GoogleAuthCallback.jsx";

// Student
import CourseCatalog from "../features/courses/pages/CourseCatalog.jsx";
import ModulesPage from "../features/modules/pages/ModulesPage.jsx";
import ModuleLecturesPage from "../features/lectures/pages/ModuleLecturesPage.jsx";
import StudentLayout from "../features/dashboard/components/StudentLayout.jsx";

// Admin
import AdminDashboard from "../features/admin/pages/AdminDashboard.jsx";

// Instructor
import InstructorDashboard from "../features/instructor/pages/InstructorDashboard.jsx";
import LiveRoom from "../features/instructor/components/LiveRoom.jsx";

// Live Classes
import LiveClassesPage from "../features/liveClasses/pages/LiveClassesPage.jsx";

// Organization
import OrganizationRequest from "../features/adminRequests/pages/OrganizationRequest.jsx";
import OrganizationAdminDashboard from "../features/organizationAdmin/pages/OrganizationAdminDashboard.jsx";
import OrganizationDetailsPage from "../features/organizationAdmin/pages/OrganizationDetailsPage.jsx";
// Route Guards
import ProtectedRoute from "../routes/ProtectedRoute.jsx";
import PublicOnlyRoute from "../routes/PublicOnlyRoute.jsx";


// Temporary Independent Instructor Dashboard
function IndependentInstructorDashboard() {
  const user = useSelector((state) => state.auth?.user);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 p-6 text-white">
      <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center">

        <h1 className="text-2xl font-bold">
          Independent Instructor Dashboard
        </h1>

        <p className="mt-3 text-sm text-slate-400">
          Your instructor account is active.
          You can access LMS management after joining an organization.
        </p>

        <div className="mt-6 rounded-xl border border-slate-700 bg-slate-800 p-4 text-left">
          <p className="text-xs text-slate-400">
            Instructor ID
          </p>

          <p className="mt-1 font-semibold text-indigo-400">
            {user?.instructorCode || "Not available"}
          </p>

          <p className="mt-4 text-xs text-slate-400">
            Employment Status
          </p>

          <p className="mt-1 font-semibold">
            {user?.employmentStatus || "INDEPENDENT"}
          </p>
        </div>

      </div>
    </div>
  );
}


export const router = createBrowserRouter([

  // Root
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },


  // Public Authentication Routes
  {
    element: <PublicOnlyRoute />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/register-organization",
        element: <OrganizationRequest />,
      },
    ],
  },


  // OTP Verification
  {
    path: "/verify-otp",
    element: <VerifyOtp />,
  },


  // Google Authentication
  {
    path: "/auth/google/callback",
    element: <GoogleAuthCallback />,
  },


  // Student Routes
  {
    element: (
      <ProtectedRoute allowedRoles={["STUDENT"]} />
    ),

    children: [
      {
        path: "/dashboard",
        element: <StudentLayout />,
      },
      {
        path: "/courses",
        element: <CourseCatalog />,
      },
      {
        path: "/courses/:courseId/modules",
        element: <ModulesPage />,
      },
      {
        path: "/courses/:courseId/modules/:moduleId/lectures",
        element: <ModuleLecturesPage />,
      },
      {
        path: "/live-classes",
        element: <LiveClassesPage />,
      },
    ],
  },


  // Independent Instructor Routes
  {
    element: (
      <ProtectedRoute
        allowedRoles={["INSTRUCTOR"]}
        instructorType="INDEPENDENT"
      />
    ),

    children: [
      {
        path: "/instructor-dashboard",
        element: <IndependentInstructorDashboard />,
      },
    ],
  },


  // Organization Instructor Routes
  {
    element: (
      <ProtectedRoute
        allowedRoles={["INSTRUCTOR"]}
        instructorType="ORGANIZATION"
      />
    ),

    children: [
      {
        path: "/organization-instructor-dashboard",
        element: <InstructorDashboard />,
      },
      {
        path: "/instructor/live-room",
        element: <LiveRoom />,
      },
    ],
  },


  // Organization Admin Routes
  // Organization Admin Routes
{
  element: (
    <ProtectedRoute
      allowedRoles={["ADMIN"]}
      allowedAdminTypes={["ORGANIZATION_ADMIN"]}
    />
  ),

  children: [
    {
      path: "/organization-admin-dashboard",
      element: <OrganizationAdminDashboard />,
    },
    {
      path: "/organization-details",
      element: <OrganizationDetailsPage />,
    },
  ],
},


  // Super Admin Routes
  {
    element: (
      <ProtectedRoute
        allowedRoles={["ADMIN"]}
        allowedAdminTypes={["SUPER_ADMIN"]}
      />
    ),

    children: [
      {
        path: "/super-admin-dashboard",
        element: <AdminDashboard />,
      },

      // Backward compatibility
      {
        path: "/adminDashboard",
        element: (
          <Navigate
            to="/super-admin-dashboard"
            replace
          />
        ),
      },
    ],
  },

]);