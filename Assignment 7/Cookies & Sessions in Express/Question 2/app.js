const express = require("express");
const cookieParser = require("cookie-parser");
const languageMiddleware = require("./middleware/language.middleware");
const langRoutes = require("./routes/lang.routes");

const app = express();

app.set("view engine", "ejs");

app.use(cookieParser());

app.use(languageMiddleware);

app.use("/", langRoutes);

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});