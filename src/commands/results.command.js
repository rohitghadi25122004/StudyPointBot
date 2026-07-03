const messageService = require("../services/message.service");

async function handle(from) {
    return messageService.sendResults(from);
}

module.exports = { handle };
