const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const cartMiddleware = require("./middleware/cart.middleware");
const cartRoutes = require("./routes/cart.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: true
}));

app.use(cartMiddleware);

app.use("/cart", cartRoutes);
app.use("/", authRoutes);

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});