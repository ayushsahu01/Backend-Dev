const express = require("express");
const router = express.Router();

router.get("/login", (req, res) => {
    res.send(`
        <form method="POST">
            <button type="submit">Login</button>
        </form>
    `);
});

router.post("/login", (req, res) => {

    req.session.user = { id: "123", name: "Ayush" };

    let cookieCart = [];
    try {
        cookieCart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];
    } catch {}

    const sessionCart = req.session.cart || [];

    const mergedCart = [...sessionCart, ...cookieCart];

    req.session.cart = mergedCart;

    res.clearCookie("cart");

    res.redirect("/cart");
});

module.exports = router;