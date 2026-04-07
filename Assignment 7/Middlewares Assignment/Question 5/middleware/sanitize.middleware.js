const xss = require("xss");
const mongoSanitize = require("mongo-sanitize");

const sanitizeData = (data) => {
    if (typeof data === "string") {
        return xss(data);
    }

    if (Array.isArray(data)) {
        return data.map(sanitizeData);
    }

    if (typeof data === "object" && data !== null) {
        const sanitizedObj = {};

        for (let key in data) {
            const cleanKey = mongoSanitize(key);
            sanitizedObj[cleanKey] = sanitizeData(data[key]);
        }

        return sanitizedObj;
    }

    return data;
};

const sanitizeMiddleware = (req, res, next) => {
    if (req.body) req.body = sanitizeData(req.body);
    if (req.query) req.query = sanitizeData(req.query);
    if (req.params) req.params = sanitizeData(req.params);

    next();
};

module.exports = sanitizeMiddleware;