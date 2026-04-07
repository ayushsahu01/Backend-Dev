const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/user.routes");
const activityMiddleware = require("./middleware/activity.middleware");

const app = express();

connectDB();

app.use(express.json());


app.use((req, res, next) => {
    req.user = { id: "PUT_VALID_USER_ID_HERE" };
    next();
});

app.use(activityMiddleware);

app.use("/api/users", userRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});