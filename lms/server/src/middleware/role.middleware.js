export const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user?.role;
    const adminType = req.user?.adminType;

    const hasAccess = allowedRoles.some((allowedRole) => {
      if (allowedRole === userRole) {
        return true;
      }

      if (userRole === "ADMIN") {
        if (allowedRole === "SUPER_ADMIN" && adminType === "SUPER_ADMIN") {
          return true;
        }

        if (
          allowedRole === "ORGANIZATION_ADMIN" &&
          adminType === "ORGANIZATION_ADMIN"
        ) {
          return true;
        }
      }

      return false;
    });

    if (hasAccess) {
      return next();
    }

    return res.status(403).json({
      success: false,
      message: "Access denied",
    });
  };
};