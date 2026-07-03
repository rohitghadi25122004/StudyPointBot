const messageService = require("../services/message.service");

async function handle(from) {
    return messageService.sendContact(from);
}

module.exports = { handle };
