const commands = require("../constants/commands.constant");
const sessionService = require("../services/session.service");

const startCommand = require("./start.command");
const menuCommand = require("./menu.command");
const classesCommand = require("./classes.command");
const resultsCommand = require("./results.command");
const contactCommand = require("./contact.command");
const helpCommand = require("./help.command");
const admissionCommand = require("./admission.command");
const unknownCommand = require("./unknown.command");

const BUTTON_HANDLERS = {
    [commands.MENU]: menuCommand.handle,
    [commands.CLASSES]: classesCommand.handle,
    [commands.RESULTS]: resultsCommand.handle,
    [commands.CONTACT]: contactCommand.handle,
    [commands.ADMISSION]: admissionCommand.handle,
};

const TEXT_HANDLERS = {
    menu: menuCommand.handle,
    classes: classesCommand.handle,
    results: resultsCommand.handle,
    contact: contactCommand.handle,
    admission: admissionCommand.handle,
    help: helpCommand.handle,
    1: classesCommand.handle,
    2: resultsCommand.handle,
    3: admissionCommand.handle,
    4: contactCommand.handle,
    5: contactCommand.handle,
};

// Routes a parsed incoming message to the right command. An in-progress
// admission flow always takes priority over global keywords so free-text
// answers (names, messages) aren't misread as commands.
async function dispatch(incoming) {
    const { from, text, buttonId } = incoming;

    const session = sessionService.get(from);
    if (session && session.flow === "ADMISSION") {
        return admissionCommand.handleStep(from, incoming);
    }

    if (buttonId === commands.ADMISSION_CONFIRM || buttonId === commands.ADMISSION_CANCEL) {
        // Stale button tap with no active session - nothing to confirm/cancel.
        return unknownCommand.handle(from);
    }

    if (buttonId && BUTTON_HANDLERS[buttonId]) {
        return BUTTON_HANDLERS[buttonId](from);
    }

    const normalizedText = (text || "").trim().toLowerCase();

    if (commands.START.includes(normalizedText)) {
        return startCommand.handle(from);
    }

    if (TEXT_HANDLERS[normalizedText]) {
        return TEXT_HANDLERS[normalizedText](from);
    }

    return unknownCommand.handle(from);
}

module.exports = { dispatch };
