const express = require("express");
const router = express.Router();
const User = require("../models/user.model");

router.post("/", async (req, res) => {
    const user = await User.create(req.body);
    res.json(user);
});

router.get("/", async (req, res) => {
    const users = await User.find();
    res.json(users);
});

router.delete("/:id", async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User soft deleted" });
});

router.get("/deleted/all", async (req, res) => {
    const users = await User.find({ isDeleted: true });
    res.json(users);
});

module.exports = router;