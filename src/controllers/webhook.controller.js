const config = require("../config/env");
exports.home = (req, res) => {
    res.send("StudyPointBot Running")
}
exports.verifyWebhook = (req, res) => {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challange = req.query["hub.challenge"];

    if (mode === "subscribe" && token === config.verifyToken) {
        return res.status(200).send(challange)
    }
    else {
        return res.sendStatus(403)
    }

}
exports.receiveWebhook = (req, res) => {
    console.log(req.body);
    res.sendStatus(200);
}