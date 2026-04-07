const fs = require("fs");
const path = require("path");

const languageMiddleware = (req, res, next) => {

    const lang = req.cookies.lang || "en";

    try {
        const filePath = path.join(__dirname, `../locales/${lang}.json`);
        const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

        req.translations = data;
        req.lang = lang;

    } catch (err) {
        req.translations = {};
        req.lang = "en";
    }

    next();
};

module.exports = languageMiddleware;