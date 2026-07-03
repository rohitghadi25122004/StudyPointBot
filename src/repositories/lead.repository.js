const fs = require("fs");
const path = require("path");
const logger = require("../utils/logger");

const DATA_DIR = path.join(__dirname, "..", "..", "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

function ensureStore() {
    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(LEADS_FILE)) {
        fs.writeFileSync(LEADS_FILE, "[]", "utf8");
    }
}

function saveLead(lead) {
    ensureStore();
    const existing = JSON.parse(fs.readFileSync(LEADS_FILE, "utf8"));
    existing.push({ ...lead, createdAt: new Date().toISOString() });
    fs.writeFileSync(LEADS_FILE, JSON.stringify(existing, null, 2), "utf8");
    logger.info(`Lead saved for ${lead.phone}`);
}

module.exports = { saveLead };
