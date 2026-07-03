const messageService = require("../services/message.service");
const sessionService = require("../services/session.service");

async function handle(from) {
    sessionService.clear(from);
    return messageService.sendWelcome(from);
}

module.exports = { handle };
