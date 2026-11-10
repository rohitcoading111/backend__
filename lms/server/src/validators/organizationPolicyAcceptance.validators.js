export const validatePolicyAcceptanceRequest = (req, res, next) => {
  if (req.body === undefined || (
    req.body &&
    typeof req.body === "object" &&
    !Array.isArray(req.body) &&
    Object.keys(req.body).length === 0
  )) {
    return next();
  }

  return res.status(400).json({
    success: false,
    message: "Policy acceptance must not include client-supplied identity or versions.",
  });
};
