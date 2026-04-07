const express = require("express");
const router = express.Router();
const User = require("../models/user.model");

router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (!user) {
        return res.send("Invalid credentials");
    }

    req.session.user = {
        id: user._id,
        role: user.role
    };

    res.redirect("/dashboard");
});

router.get("/dashboard", (req, res) => {
    res.render("dashboard", { user: req.session.user });
});

router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/login");
});

module.exports = router;