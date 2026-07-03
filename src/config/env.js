require("dotenv").config();

const requiredEnv = [
    "VERIFY_TOKEN"
];
requiredEnv.forEach((key) => {
    {
        if (!process.env[key]) {
            throw new Error("Missing Environment Variables")
        }
    }
});

module.exports = {
    port: process.env.port || 10000,
    verifyToken: process.env.VERIFY_TOKEN,
    whatsappToken: process.env.WHATSAPP_TOKEN,
    phoneNumberId: process.env.PHONE_NUMBER_ID
}
