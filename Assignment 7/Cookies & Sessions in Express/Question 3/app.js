const express = require("express");
const session = require("express-session");
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth.routes");
const adminRoutes = require("./routes/admin.routes");

const app = express();

connectDB();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: false
}));

app.use("/", authRoutes);
app.use("/", adminRoutes);

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});