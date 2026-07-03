const axios = require("axios");
const logger = require("./logger");

const DEFAULT_RETRIES = 2;
const RETRY_DELAY_MS = 500;

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// Thin axios wrapper with basic retry for transient WhatsApp Graph API failures.
async function post(url, data, headers, retries = DEFAULT_RETRIES) {
    try {
        const response = await axios.post(url, data, { headers });
        return response.data;
    } catch (error) {
        const status = error.response ? error.response.status : null;
        const isRetryable = !status || status >= 500;

        if (isRetryable && retries > 0) {
            logger.warn(`API call failed (status: ${status}), retrying... (${retries} left)`);
            await sleep(RETRY_DELAY_MS);
            return post(url, data, headers, retries - 1);
        }

        logger.error("API call failed:", error.response ? error.response.data : error.message);
        throw error;
    }
}

module.exports = { post };
