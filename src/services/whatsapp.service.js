const apiClient = require("../utils/apiClient");
const whatsappConfig = require("../config/whatsapp.config");
const logger = require("../utils/logger");

function headers() {
    return {
        Authorization: `Bearer ${whatsappConfig.accessToken}`,
        "Content-Type": "application/json",
    };
}

async function sendText(to, body) {
    const payload = {
        messaging_product: "whatsapp",
        to,
        type: "text",
        text: { body },
    };
    logger.info(`Sending text message to ${to}`);
    return apiClient.post(whatsappConfig.graphUrl, payload, headers());
}

// buttons: [{ id, title }] - WhatsApp allows a max of 3 reply buttons per message.
async function sendButtons(to, bodyText, buttons) {
    const payload = {
        messaging_product: "whatsapp",
        to,
        type: "interactive",
        interactive: {
            type: "button",
            body: { text: bodyText },
            action: {
                buttons: buttons.map((btn) => ({
                    type: "reply",
                    reply: { id: btn.id, title: btn.title },
                })),
            },
        },
    };
    logger.info(`Sending button message to ${to}`);
    return apiClient.post(whatsappConfig.graphUrl, payload, headers());
}

module.exports = { sendText, sendButtons };
