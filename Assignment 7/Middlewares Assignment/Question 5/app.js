const express = require("express");
const sanitizeMiddleware = require("./middleware/sanitize.middleware");
const userRoutes = require("./routes/user.routes");

const app = express();

app.use(express.json());

app.use(sanitizeMiddleware);

app.use("/api/users", userRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});