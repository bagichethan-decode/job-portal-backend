const roleMiddleware = (...allowedRoles) => {
    return (req, res, next) => {
        console.log("ROLE MIDDLEWARE:", {
            userRole: req.user?.role,
            allowedRoles: allowedRoles
        });

        if (!req.user || !req.user.role) {
            return res.status(403).json({
                message: "User role not found"
            });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                message: "Access denied"
            });
        }

        next();
    };
};

module.exports = roleMiddleware;