const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("step1", { data: req.session.formData || {} });
});

router.post("/step1", (req, res) => {
    req.session.formData = {
        ...req.session.formData,
        name: req.body.name,
        age: req.body.age
    };

    res.redirect("/step2");
});

router.get("/step2", (req, res) => {
    res.render("step2", { data: req.session.formData || {} });
});

router.post("/step2", (req, res) => {
    req.session.formData = {
        ...req.session.formData,
        email: req.body.email,
        password: req.body.password
    };

    res.redirect("/success");
});

router.get("/success", (req, res) => {
    const data = req.session.formData;

    req.session.destroy();

    res.render("success", { data });
});

module.exports = router;