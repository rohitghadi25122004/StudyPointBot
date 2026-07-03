const config = require("../config/env");
const logger = require("../utils/logger");
const { parseIncomingMessage } = require("../utils/messageParser");
const commandRouter = require("../commands");
const messageService = require("../services/message.service");

exports.home = (req, res) => {
    res.send("Study Point Bot is running");
};

exports.verifyWebhook = (req, res) => {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === config.verifyToken) {
        logger.info("Webhook verified successfully");
        return res.status(200).send(challenge);
    }

    logger.warn("Webhook verification failed");
    return res.sendStatus(403);
};

// Meta requires a 200 within a few seconds, so we ack immediately and
// process the message asynchronously rather than awaiting it inline.
exports.receiveWebhook = (req, res) => {
    res.sendStatus(200);

    const incoming = parseIncomingMessage(req.body);
    if (!incoming) {
        // Status updates (delivered/read) and other non-message events land here - nothing to do.
        return;
    }

    logger.info(`Incoming ${incoming.type} message from ${incoming.from}`);

    commandRouter.dispatch(incoming).catch(async (error) => {
        logger.error("Failed to handle incoming message:", error.message);
        try {
            await messageService.sendError(incoming.from);
        } catch (sendError) {
            logger.error("Failed to send error message:", sendError.message);
        }
    });
};
