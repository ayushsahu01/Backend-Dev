const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("login");
});

router.post("/login", (req, res) => {
    req.session.user = { name: "Ayush" };

    req.session.startTime = Date.now();

    res.redirect("/dashboard");
});

router.get("/dashboard", (req, res) => {
    if (!req.session.user) {
        return res.redirect("/");
    }

    res.render("dashboard", {
        sessionTime: req.session.cookie.maxAge 
    });
});

router.get("/extend-session", (req, res) => {
    req.session.touch();
    res.json({ message: "Session extended" });
});

router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
});

module.exports = router;