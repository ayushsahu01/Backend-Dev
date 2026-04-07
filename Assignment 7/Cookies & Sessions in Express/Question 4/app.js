const express = require("express");
const session = require("express-session");
const authRoutes = require("./routes/auth.routes");

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 5 * 60 * 1000 
    }
}));

app.use("/", authRoutes);

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});