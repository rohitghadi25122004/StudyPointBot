const messageService = require("../services/message.service");

async function handle(from) {
    return messageService.sendMenu(from);
}

module.exports = { handle };
