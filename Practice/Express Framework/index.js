const express = require('express');
const app = express();
const PORT = 7054;
app.get("/", (req, res) => {
    res.send("Welcome to Home Page");
})
app.get("/users", (req, res) => {
    res.send("<h1>This is Users Page<h1>")
})
app.get("/users/:id", (req, res) => {
    const userId = req.params.id
    res.send(`You are requesting for user:${userId}`)
})
app.listen(PORT, () => {
    console.log(`Server is Running on Port:${PORT}`);
}) 