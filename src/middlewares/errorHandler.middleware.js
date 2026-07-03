const logger = require("../utils/logger");

// Express error middleware (4-arg signature is required by Express to be recognized as such).
function errorHandler(err, req, res, next) {
    logger.error("Unhandled error:", err);
    if (res.headersSent) {
        return next(err);
    }
    res.sendStatus(500);
}

module.exports = errorHandler;
