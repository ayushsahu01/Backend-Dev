const fs = require("fs");
const path = require("path");

// Log file path
const logFile = path.join(__dirname, "requests.log");

const logger = (req, res, next) => {
    const start = Date.now();

    res.on("finish", () => {
        const end = Date.now();
        const responseTime = end - start;

        const log = `${new Date().toISOString()} | ${req.method} | ${req.originalUrl} | ${res.statusCode} | ${responseTime}ms\n`;

        fs.appendFile(logFile, log, (err) => {
            if (err) console.error("Error writing log:", err);
        });
    });

    next();
};

module.exports = logger;