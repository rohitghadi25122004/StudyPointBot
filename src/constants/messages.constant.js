// Static copy sourced from studypointofficial.in (scraped 2026-07-03).
module.exports = {
    BUSINESS_NAME: "Study Point",
    ADDRESS: "Shop No 101, 1st Floor, Study Point, Vyankatesh Heights, Diva-Agasan Rd, Diva-612",
    PHONE_DISPLAY: "+91 93261 66821",
    INSTAGRAM: "https://instagram.com/study_point_diva",
    YOUTUBE: "https://youtube.com/@studypoint20005",

    WELCOME:
        "👋 Welcome to *Study Point*, Diva!\n\n" +
        "We offer concept-oriented teaching for Class 5th to 12th (SSC & HSC - Science/Commerce), " +
        "with free study material and limited batch sizes for individual attention.\n\n" +
        "Admissions for *2026-27* are now open!\n\n" +
        "How can we help you today?",

    MENU:
        "Please choose an option:\n\n" +
        "1️⃣ Classes We Offer\n" +
        "2️⃣ Our Results\n" +
        "3️⃣ Admission Enquiry\n" +
        "4️⃣ Contact Us\n" +
        "5️⃣ Talk to a Human\n\n" +
        "Reply with the number, or tap a button below.",

    CLASSES:
        "📚 *Classes We Offer*\n\n" +
        "• Class 5 - 7 (Foundation)\n" +
        "• Class 8 - 10 (SSC Board)\n" +
        "• Class 11 - 12 (HSC Board - Science & Commerce)\n\n" +
        "Every batch gets free booklets and specialised study material, with a focus on deep " +
        "conceptual understanding rather than rote memorisation.\n\n" +
        "Reply *3* or tap *Admission Enquiry* to enrol.",

    RESULTS:
        "🏆 *Our Results*\n\n" +
        "Study Point has maintained a *100% pass rate* across SSC and HSC boards, with a " +
        "consistent record since our inception - built on concept-oriented teaching and expert " +
        "mentorship.\n\n" +
        "See more on our Instagram: " + "https://instagram.com/study_point_diva",

    CONTACT:
        "📍 *Visit / Contact Us*\n\n" +
        "Study Point\n" +
        "Shop No 101, 1st Floor, Vyankatesh Heights, Diva-Agasan Rd, Diva-612\n\n" +
        "📞 Call / WhatsApp: +91 93261 66821\n" +
        "📸 Instagram: @study_point_diva\n" +
        "▶️ YouTube: @studypoint20005",

    HELP:
        "Here's what I can do:\n\n" +
        "• Type *menu* anytime to see the options again\n" +
        "• Type *classes* for class-wise details\n" +
        "• Type *results* for our track record\n" +
        "• Type *admission* to start an enquiry\n" +
        "• Type *contact* for our address & phone number\n\n" +
        "You can also just call or WhatsApp us directly on +91 93261 66821.",

    UNKNOWN:
        "Sorry, I didn't quite get that 🤔\n" +
        "Type *menu* to see what I can help you with.",

    ADMISSION_INTRO:
        "📝 *Admission Enquiry*\n\n" +
        "Let's get a few details so our team can call you back.\n\n" +
        "First, what is the *student's full name*?",

    ADMISSION_ASK_PARENT: "Great! What is the *parent's/guardian's name*?",
    ADMISSION_ASK_CLASS:
        "Which class is the student applying for?\n\n" +
        "1️⃣ Class 5 - 7\n" +
        "2️⃣ Class 8 - 10 (SSC)\n" +
        "3️⃣ Class 11 - 12 (HSC)\n\n" +
        "Reply with 1, 2 or 3.",
    ADMISSION_ASK_CLASS_INVALID: "Please reply with just 1, 2 or 3 for the class.",
    ADMISSION_ASK_MESSAGE:
        "Any specific message or question for us? (Reply with text, or send *skip*)",

    admissionSummary(lead) {
        return (
            "Please confirm these details:\n\n" +
            `👤 Student: ${lead.studentName}\n` +
            `👪 Parent: ${lead.parentName}\n` +
            `🏫 Class: ${lead.classGroup}\n` +
            `📞 Phone: ${lead.phone}\n` +
            `💬 Message: ${lead.message || "-"}\n\n` +
            "Is this correct?"
        );
    },

    ADMISSION_SAVED:
        "✅ Thank you! Your enquiry has been recorded. Our team at Study Point will call you back " +
        "shortly. You can also reach us anytime on +91 93261 66821.",
    ADMISSION_CANCELLED: "No problem, your enquiry was cancelled. Type *menu* to start over.",

    ERROR: "Something went wrong on our end. Please try again in a bit, or call us on +91 93261 66821.",
};
