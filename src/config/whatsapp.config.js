const env = require("./env");

const GRAPH_BASE_URL = "https://graph.facebook.com";

module.exports = {
    apiVersion: env.apiVersion,
    graphUrl: `${GRAPH_BASE_URL}/${env.apiVersion}/${env.phoneNumberId}/messages`,
    accessToken: env.whatsappToken,
};
