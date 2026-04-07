const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");

router.get("/admin", auth, role("admin"), (req, res) => {
    res.render("admin");
});

module.exports = router;