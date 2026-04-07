const express = require("express");
const router = express.Router();
const { saveOTP } = require("../otpStore");

router.post("/generate-otp", (req, res) => {
    const userId = req.body.userId;

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    saveOTP(userId, otp);

    console.log("OTP:", otp); 

    res.json({ message: "OTP generated (check console for now)" });
});

module.exports = router;