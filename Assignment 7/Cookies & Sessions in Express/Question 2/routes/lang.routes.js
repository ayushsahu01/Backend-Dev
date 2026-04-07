const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("home", {
        t: req.translations,
        lang: req.lang
    });
});

router.get("/change-lang/:lang", (req, res) => {
    const lang = req.params.lang;

    res.cookie("lang", lang, { maxAge: 7 * 24 * 60 * 60 * 1000 });

    res.redirect("/");
});

module.exports = router;