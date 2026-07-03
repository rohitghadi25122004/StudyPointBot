const messageService = require("../services/message.service");

async function handle(from) {
    return messageService.sendHelp(from);
}

module.exports = { handle };
