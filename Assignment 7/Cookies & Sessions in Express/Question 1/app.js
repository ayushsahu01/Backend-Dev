const express = require("express");
const session = require("express-session");
const formRoutes = require("./routes/form.routes");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: "mysecretkey",
    resave: false,
    saveUninitialized: true
}));

app.set("view engine", "ejs");

app.use("/", formRoutes);

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});