const jwt = require("jsonwebtoken");
const { verifyOTP } = require("./otpStore");

const SECRET = "your_jwt_secret";

const mfaMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            return res.status(401).json({ message: "No token provided" });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, SECRET);

        req.user = decoded;

        const otp = req.headers["x-otp"];

        if (!otp) {
            return res.status(401).json({ message: "OTP required" });
        }

        const isValidOTP = verifyOTP(decoded.userId, otp);

        if (!isValidOTP) {
            return res.status(403).json({ message: "Invalid or expired OTP" });
        }

        next();
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};

module.exports = mfaMiddleware;