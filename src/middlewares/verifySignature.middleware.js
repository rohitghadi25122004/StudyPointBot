const crypto = require("crypto");
const config = require("../config/env");
const logger = require("../utils/logger");

// Validates the X-Hub-Signature-256 header Meta sends on every webhook POST,
// proving the payload actually came from Meta and wasn't forged. Requires
// APP_SECRET to be set and requires the raw request body (see app.js).
function verifySignature(req, res, next) {
    if (!config.appSecret) {
        logger.warn("APP_SECRET not set - skipping webhook signature verification");
        return next();
    }

    const signatureHeader = req.get("x-hub-signature-256");
    if (!signatureHeader || !req.rawBody) {
        return res.sendStatus(401);
    }

    const expectedSignature =
        "sha256=" + crypto.createHmac("sha256", config.appSecret).update(req.rawBody).digest("hex");

    const received = Buffer.from(signatureHeader);
    const expected = Buffer.from(expectedSignature);

    if (received.length !== expected.length || !crypto.timingSafeEqual(received, expected)) {
        logger.warn("Webhook signature verification failed");
        return res.sendStatus(401);
    }

    return next();
}

module.exports = verifySignature;
