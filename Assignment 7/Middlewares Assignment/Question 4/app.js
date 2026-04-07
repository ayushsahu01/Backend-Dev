const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/user.routes");

const app = express();

connectDB();

app.use(express.json());

app.use("/api/users", userRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});