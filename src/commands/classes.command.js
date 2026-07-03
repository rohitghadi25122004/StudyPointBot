const messageService = require("../services/message.service");

async function handle(from) {
    return messageService.sendClasses(from);
}

module.exports = { handle };
