const express = require("express");
const webhookRoutes = require("./routes/webhook.routes");
const errorHandler = require("./middlewares/errorHandler.middleware");

const app = express();

// Keep the raw body around so verifySignature.middleware.js can HMAC-verify it -
// JSON.stringify(req.body) would not reproduce Meta's original byte-for-byte payload.
app.use(
    express.json({
        verify: (req, res, buf) => {
            req.rawBody = buf;
        },
    })
);

app.use("/", webhookRoutes);
app.use(errorHandler);

module.exports = app;
