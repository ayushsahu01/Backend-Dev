const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("cart", { cart: req.cart });
});

router.post("/add", (req, res) => {
    const { productId, name } = req.body;

    const item = { productId, name };

    req.cart.push(item);

    if (req.session.user) {
        req.session.cart = req.cart;
    } else {
        res.cookie("cart", JSON.stringify(req.cart), {
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
    }

    res.redirect("/cart");
});

module.exports = router;