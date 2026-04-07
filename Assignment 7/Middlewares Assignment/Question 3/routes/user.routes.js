const express = require("express");
const router = express.Router();
const User = require("../models/user.model");

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    await user.recordLogin();

    res.json({ message: "Login successful", user });
});

router.post("/logout", async (req, res) => {
    const { userId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    await user.recordLogout();

    res.json({ message: "Logout successful" });
});

router.put("/update-profile", async (req, res) => {
    const { userId, email } = req.body;

    await User.findByIdAndUpdate(userId, { email });

    res.json({ message: "Profile updated" });
});

module.exports = router;