import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

// Authentication
const Login = lazy(() => import("../features/auth/pages/Login.jsx"));
const Register = lazy(() => import("../features/auth/pages/Register.jsx"));
const VerifyOtp = lazy(() => import("../features/auth/pages/VerifyOtp.jsx"));
const GoogleAuthCallback = lazy(() => import("../features/auth/pages/GoogleAuthCallback.jsx"));
const ForgotPassword = lazy(() => import("../features/auth/components/ForgotPassword.jsx"));

// Student
const CourseCatalog = lazy(() => import("../features/courses/pages/CourseCatalog.jsx"));
const ModulesPage = lazy(() => import("../features/modules/pages/ModulesPage.jsx"));
const ModuleLecturesPage = lazy(() => import("../features/lectures/pages/ModuleLecturesPage.jsx"));
const StudentLayout = lazy(() => import("../features/dashboard/components/StudentLayout.jsx"));

// Admin
const AdminDashboard = lazy(() => import("../features/admin/pages/AdminDashboard.jsx"));

// Instructor
const InstructorDashboard = lazy(() => import("../features/instructor/pages/InstructorDashboard.jsx"));
const LiveRoom = lazy(() => import("../features/instructor/components/LiveRoom.jsx"));

// Live Classes
const LiveClassesPage = lazy(() => import("../features/liveClasses/pages/LiveClassesPage.jsx"));

// Organization
const OrganizationRequest = lazy(() => import("../features/adminRequests/pages/OrganizationRequest.jsx"));
const OrganizationAdminDashboard = lazy(() => import("../features/organizationAdmin/pages/OrganizationAdminDashboard.jsx"));
const OrganizationDetailsPage = lazy(() => import("../features/organizationAdmin/pages/OrganizationDetailsPage.jsx"));

const PaymentAnalyticsOverview = lazy(() => import("../features/paymentAnalytics/pages/SuperAdminPaymentAnalytics.jsx"));
const OrganizationPaymentAnalytics = lazy(() => import("../features/paymentAnalytics/pages/OrganizationPaymentAnalytics.jsx"));

const OrganizationBankDetails = lazy(() => import("../features/organizationBankDetails/pages/OrganizationBankDetails.jsx"));
const SuperAdminBankDetails = lazy(() => import("../features/organizationBankDetails/pages/SuperAdminBankDetails.jsx"));

const OrganizationPolicyAcceptancePage = lazy(() => import("../features/organizationPolicies/pages/OrganizationPolicyAcceptancePage.jsx"));

const IndependentInstructorDashboard = lazy(() => import("../features/independentInstructor/pages/IndependentInstructorDashboard.jsx"));

const OrganizationOverview = lazy(() => import("../features/org-ins/pages/OrganizationOverview.jsx"));

// Public Pages
const HomePage = lazy(() => import("../features/allPages/HomePage.jsx"));
const AboutPage = lazy(() => import("../features/allPages/AboutPage.jsx"));
const ContactPage = lazy(() => import("../features/allPages/ContactPage.jsx"));

// DSA & AI
const DsaDashboard = lazy(() => import("../features/dsa/pages/DsaDashboard.jsx"));
const AIChat = lazy(() => import("../features/ai/pages/AIChat.jsx"));

// Route Guards (remain normal imports)
import ProtectedRoute from "../routes/ProtectedRoute.jsx";
import OrganizationPolicyGuard from "../routes/OrganizationPolicyGuard.jsx";
import PublicOnlyRoute from "../routes/PublicOnlyRoute.jsx";

const TechLibraryPage = lazy(() =>  import("../features/tech-library/pages/TechLibraryPage.jsx"));
const TechnologyDetailPage = lazy(() =>  import("../features/tech-library/pages/TechnologyDetailPage.jsx"));
const FounderPage = lazy(()=> import("../features/allPages/FounderPage.jsx") )

// Reusable loading fallback
function LazyPage({ component: Component }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500" />
        </div>
      }
    >
      <Component />
    </Suspense>
  );
}

export const router = createBrowserRouter([
  // Public Pages
  {
    path: "/",
    element: <LazyPage component={HomePage} />,
  },
  {
    path: "/about",
    element: <LazyPage component={AboutPage} />,
  },
  {
    path: "/contact",
    element: <LazyPage component={ContactPage} />,
  },
  {
    path: "/ai-assistant",
    element: <LazyPage component={AIChat} />,
  },
  {
  path: "/technologies",
  element: <LazyPage component={TechLibraryPage} />,
},
{
  path: "/technologies/:slug",
  element: <LazyPage component={TechnologyDetailPage} />,
},
{
    path:"/founder",
    element: <LazyPage component={FounderPage} />
},


  // Public Authentication Routes
  {
    element: <PublicOnlyRoute />,
    children: [
      {
        path: "/login",
        element: <LazyPage component={Login} />,
      },
      {
        path: "/register",
        element: <LazyPage component={Register} />,
      },
      {
        path: "/register-organization",
        element: <LazyPage component={OrganizationRequest} />,
      },
    ],
  },

  // OTP Verification
  {
    path: "/verify-otp",
    element: <LazyPage component={VerifyOtp} />,
  },

  // Google Authentication
  {
    path: "/auth/google/callback",
    element: <LazyPage component={GoogleAuthCallback} />,
  },

  // Student Routes
  {
    element: <ProtectedRoute allowedRoles={["STUDENT"]} />,
    children: [
      {
        path: "/dashboard",
        element: <LazyPage component={StudentLayout} />,
      },
      {
        path: "/courses",
        element: <LazyPage component={CourseCatalog} />,
      },
      {
        path: "/courses/:courseId/modules",
        element: <LazyPage component={ModulesPage} />,
      },
      {
        path: "/courses/:courseId/modules/:moduleId/lectures",
        element: <LazyPage component={ModuleLecturesPage} />,
      },
      {
        path: "/live-classes",
        element: <LazyPage component={LiveClassesPage} />,
      },
      {
        path: "/dsa",
        element: <LazyPage component={DsaDashboard} />,
      },
    ],
  },

  // Independent Instructor Routes
  {
    element: <ProtectedRoute allowedRoles={["INSTRUCTOR"]} />,
    children: [
      {
        path: "/instructor-dashboard",
        element: <LazyPage component={IndependentInstructorDashboard} />,
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
        path: "/organization-overview",
        element: <LazyPage component={OrganizationOverview} />,
      },
      {
        path: "/organization-instructor-dashboard",
        element: <LazyPage component={InstructorDashboard} />,
      },
      {
        path: "/instructor/live-room",
        element: <LazyPage component={LiveRoom} />,
      },
    ],
  },

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
        path: "/organization-policy-acceptance",
        element: <LazyPage component={OrganizationPolicyAcceptancePage} />,
      },
      {
        element: <OrganizationPolicyGuard />,
        children: [
          {
            path: "/organization-admin-dashboard",
            element: <LazyPage component={OrganizationAdminDashboard} />,
          },
          {
            path: "/organization-details",
            element: <LazyPage component={OrganizationDetailsPage} />,
          },
          {
            path: "/organization-admin/payment-analytics",
            element: <LazyPage component={OrganizationPaymentAnalytics} />,
          },
          {
            path: "/organization-admin/bank-details",
            element: <LazyPage component={OrganizationBankDetails} />,
          },
        ],
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
        element: <LazyPage component={AdminDashboard} />,
      },
      {
        path: "/super-admin/payment-analytics",
        element: <LazyPage component={PaymentAnalyticsOverview} />,
      },
      {
        path: "/super-admin/payment-analytics/:organizationId",
        element: <LazyPage component={PaymentAnalyticsOverview} />,
      },
      {
        path: "/super-admin/bank-details",
        element: <LazyPage component={SuperAdminBankDetails} />,
      },

      // Backward compatibility
      {
        path: "/adminDashboard",
        element: <Navigate to="/super-admin-dashboard" replace />,
      },
    ],
  },

  // Forgot Password
  {
    path: "/forgot-password",
    element: <LazyPage component={ForgotPassword} />,
  },
]);
