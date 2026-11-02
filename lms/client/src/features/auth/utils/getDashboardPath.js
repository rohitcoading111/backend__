export const getDashboardPath = (user) => {
  if (!user?.role) {
    throw new Error(
      "User role is missing from authentication response."
    );
  }

  const role = String(user.role).toUpperCase();
  const handlePersonalDashboard = useCallback(() => {
  navigate("/instructor-dashboard");
}, [navigate]);

  switch (role) {
    case "STUDENT":
      return "/courses";

    case "INSTRUCTOR": {
      const isHiredInstructor =
        Boolean(user.organizationId) &&
        Boolean(user.hiredBy) &&
        String(user.employmentStatus).toUpperCase() === "ACTIVE";

      return isHiredInstructor
        ? "/organization-overview"
        : "/instructor-dashboard";
    }

    case "ADMIN": {
      const adminType = String(
        user.adminType || ""
      ).toUpperCase();

      if (adminType === "SUPER_ADMIN") {
        return "/super-admin-dashboard";
      }

      if (adminType === "ORGANIZATION_ADMIN") {
        return "/organization-admin-dashboard";
      }

      throw new Error("Admin type is missing or invalid.");
    }

    default:
      throw new Error(`Unsupported user role: ${role}`);
  }
};