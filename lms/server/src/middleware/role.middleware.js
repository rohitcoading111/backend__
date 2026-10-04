export const roleMiddleware = (allowedRole) => {
    return (req, res, next) => {

        if (req.user.role === allowedRole) {
            return next();
        }

        return res.status(403).json({
            success: false,
            message: "Access denied",
        });
    };
};