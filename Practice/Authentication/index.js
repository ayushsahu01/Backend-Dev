import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";
import router from "./src/routes/user.routes.js";

dotenv.config();
await connectDB();
const app = express();

app.use(express.json());
app.use("/auth", router);

const PORT = process.env.PORT || 7054;

app.listen(PORT, ()=> {
    console.log(`Server running at http://localhost: ${PORT}`)
})