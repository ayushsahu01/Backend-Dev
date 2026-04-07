const roleMiddleware = (role) => {
    return (req, res, next) => {
        if (req.session.user.role !== role) {
            return res.send("Access Denied ❌");
        }
        next();
    };
};

module.exports = roleMiddleware;