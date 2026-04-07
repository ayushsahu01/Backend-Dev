import express from "express";
const app = express();

//dotenv
import dotenv from "dotenv";
dotenv.config();

//bcryptjs
import bcrypt from "bcrypt";

//salt
const salt = await bcrypt.genSalt(10);

//pepper
const pepper = process.env.PEPPER;

//hash your values
const password = "123456" + pepper;

const hashedPassword = await bcrypt.hash(password, salt);

console.log(salt);
console.log(hashedPassword);

const password_2 = "123456" + pepper;

//Password verifivation
const isMatch = await bcrypt.compare(password_2, hashedPassword);
console.log(isMatch);

const PORT = 7054;

app.listen(PORT, ()=> {
    console.log(`Server running at http://localhost: ${PORT}`)
})