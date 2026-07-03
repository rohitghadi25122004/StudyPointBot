const whatsappService = require("./whatsapp.service");
const messages = require("../constants/messages.constant");
const commands = require("../constants/commands.constant");

const MENU_BUTTONS = [
    { id: commands.CLASSES, title: "Classes" },
    { id: commands.RESULTS, title: "Results" },
    { id: commands.ADMISSION, title: "Admission" },
];

async function sendWelcome(to) {
    await whatsappService.sendText(to, messages.WELCOME);
    await sendMenu(to);
}

async function sendMenu(to) {
    return whatsappService.sendButtons(to, messages.MENU, MENU_BUTTONS);
}

async function sendClasses(to) {
    return whatsappService.sendText(to, messages.CLASSES);
}

async function sendResults(to) {
    return whatsappService.sendText(to, messages.RESULTS);
}

async function sendContact(to) {
    return whatsappService.sendText(to, messages.CONTACT);
}

async function sendHelp(to) {
    return whatsappService.sendText(to, messages.HELP);
}

async function sendUnknown(to) {
    return whatsappService.sendText(to, messages.UNKNOWN);
}

async function sendError(to) {
    return whatsappService.sendText(to, messages.ERROR);
}

module.exports = {
    sendWelcome,
    sendMenu,
    sendClasses,
    sendResults,
    sendContact,
    sendHelp,
    sendUnknown,
    sendError,
};
