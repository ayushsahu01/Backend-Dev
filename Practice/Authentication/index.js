import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";
import router from "./src/routes/user.routes.js";
import passport from "./src/config/passport.js";
import session from "express-session";

dotenv.config();
await connectDB();
const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use("/auth", router);

const PORT = process.env.PORT || 7054;

app.listen(PORT, ()=> {
    console.log(`Server running at http://localhost: ${PORT}`)
})