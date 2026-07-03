const messageService = require("../services/message.service");

async function handle(from) {
    return messageService.sendUnknown(from);
}

module.exports = { handle };
