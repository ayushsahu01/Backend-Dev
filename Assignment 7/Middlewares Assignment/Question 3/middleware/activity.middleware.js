const User = require("../models/user.model");

const activityMiddleware = async (req, res, next) => {
    try {
        if (req.user && req.user.id) {
            await User.findByIdAndUpdate(req.user.id, {
                lastActive: new Date()
            });
        }
    } catch (err) {
        console.error("Activity update error:", err);
    }

    next();
};

module.exports = activityMiddleware;