export const superAdminMiddleware = (req, res, next) => {
  if (
    req.user?.role !== "ADMIN" ||
    req.user?.adminType !== "SUPER_ADMIN"
  ) {
    return res.status(403).json({
      success: false,
      message: "Super Admin access required",
    });
  }

  next();
};