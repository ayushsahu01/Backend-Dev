const express = require("express");
const router = express.Router();

router.post("/create", (req, res) => {
    res.json({
        message: "Data received safely",
        data: req.body
    });
});

module.exports = router;