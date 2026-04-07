const express = require("express");
const mfaMiddleware = require("./mfaMiddleware");

const app = express();
app.use(express.json());

app.post("/secure-action", mfaMiddleware, (req, res) => {
    res.json({ message: "Sensitive action performed!" });
});

app.listen(3000, () => console.log("Server running"));