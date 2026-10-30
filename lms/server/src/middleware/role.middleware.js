export const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {

    if (allowedRoles.includes(req.user.role)) {
      return next();
    }

    return res.status(403).json({
      success: false,
      message: "Access denied",
    });
  };
};