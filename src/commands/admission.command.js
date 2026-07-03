const whatsappService = require("../services/whatsapp.service");
const sessionService = require("../services/session.service");
const leadRepository = require("../repositories/lead.repository");
const messages = require("../constants/messages.constant");
const commands = require("../constants/commands.constant");
const phoneFormatter = require("../utils/phoneFormatter");

const STEPS = {
    ASK_STUDENT_NAME: "ASK_STUDENT_NAME",
    ASK_PARENT_NAME: "ASK_PARENT_NAME",
    ASK_CLASS: "ASK_CLASS",
    ASK_MESSAGE: "ASK_MESSAGE",
    CONFIRM: "CONFIRM",
};

const CLASS_LABELS = {
    1: "Class 5 - 7",
    2: "Class 8 - 10 (SSC)",
    3: "Class 11 - 12 (HSC)",
};

// Entry point: user typed "admission" or tapped the Admission button.
async function handle(from) {
    sessionService.set(from, { flow: "ADMISSION", step: STEPS.ASK_STUDENT_NAME, lead: { phone: from } });
    return whatsappService.sendText(from, messages.ADMISSION_INTRO);
}

// Continuation: called by the dispatcher while the user is mid-flow.
async function handleStep(from, incoming) {
    const session = sessionService.get(from);
    const { lead, step } = session;

    switch (step) {
        case STEPS.ASK_STUDENT_NAME: {
            lead.studentName = incoming.text;
            session.step = STEPS.ASK_PARENT_NAME;
            sessionService.set(from, session);
            return whatsappService.sendText(from, messages.ADMISSION_ASK_PARENT);
        }

        case STEPS.ASK_PARENT_NAME: {
            lead.parentName = incoming.text;
            session.step = STEPS.ASK_CLASS;
            sessionService.set(from, session);
            return whatsappService.sendText(from, messages.ADMISSION_ASK_CLASS);
        }

        case STEPS.ASK_CLASS: {
            const choice = (incoming.text || "").trim();
            if (!CLASS_LABELS[choice]) {
                return whatsappService.sendText(from, messages.ADMISSION_ASK_CLASS_INVALID);
            }
            lead.classGroup = CLASS_LABELS[choice];
            session.step = STEPS.ASK_MESSAGE;
            sessionService.set(from, session);
            return whatsappService.sendText(from, messages.ADMISSION_ASK_MESSAGE);
        }

        case STEPS.ASK_MESSAGE: {
            const text = (incoming.text || "").trim();
            lead.message = /^skip$/i.test(text) ? "" : text;
            lead.phone = phoneFormatter.normalize(from);
            session.step = STEPS.CONFIRM;
            sessionService.set(from, session);
            return whatsappService.sendButtons(from, messages.admissionSummary(lead), [
                { id: commands.ADMISSION_CONFIRM, title: "Confirm" },
                { id: commands.ADMISSION_CANCEL, title: "Cancel" },
            ]);
        }

        case STEPS.CONFIRM: {
            if (incoming.buttonId === commands.ADMISSION_CONFIRM) {
                leadRepository.saveLead(lead);
                sessionService.clear(from);
                return whatsappService.sendText(from, messages.ADMISSION_SAVED);
            }
            sessionService.clear(from);
            return whatsappService.sendText(from, messages.ADMISSION_CANCELLED);
        }

        default:
            sessionService.clear(from);
            return whatsappService.sendText(from, messages.ERROR);
    }
}

module.exports = { handle, handleStep, STEPS };
