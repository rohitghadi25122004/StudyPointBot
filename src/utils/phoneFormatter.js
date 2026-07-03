// Normalizes an Indian phone number to WhatsApp's expected E.164-without-plus format (e.g. 919326166821).
function normalize(rawPhone) {
    const digits = String(rawPhone).replace(/\D/g, "");

    if (digits.length === 10) {
        return `91${digits}`;
    }
    if (digits.length === 12 && digits.startsWith("91")) {
        return digits;
    }
    if (digits.length === 13 && digits.startsWith("091")) {
        return digits.slice(1);
    }
    return digits;
}

function isValidIndianMobile(rawPhone) {
    const digits = String(rawPhone).replace(/\D/g, "");
    return /^([6-9]\d{9})$/.test(digits) || /^91[6-9]\d{9}$/.test(digits);
}

module.exports = { normalize, isValidIndianMobile };
