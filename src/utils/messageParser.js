// Extracts a normalized { from, type, text, buttonId } shape from a raw WhatsApp webhook payload.
function parseIncomingMessage(body) {
    const entry = body.entry && body.entry[0];
    const change = entry && entry.changes && entry.changes[0];
    const value = change && change.value;
    const message = value && value.messages && value.messages[0];

    if (!message) {
        return null;
    }

    const base = {
        from: message.from,
        messageId: message.id,
        type: message.type,
        text: null,
        buttonId: null,
    };

    switch (message.type) {
        case "text":
            base.text = message.text.body.trim();
            break;
        case "interactive": {
            const interactive = message.interactive;
            if (interactive.type === "button_reply") {
                base.buttonId = interactive.button_reply.id;
                base.text = interactive.button_reply.title;
            } else if (interactive.type === "list_reply") {
                base.buttonId = interactive.list_reply.id;
                base.text = interactive.list_reply.title;
            }
            break;
        }
        case "button":
            base.buttonId = message.button.payload;
            base.text = message.button.text;
            break;
        default:
            break;
    }

    return base;
}

module.exports = { parseIncomingMessage };
