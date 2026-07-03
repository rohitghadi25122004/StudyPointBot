const express = require("express");
const router = express.Router();
const webhookController = require("../controllers/webhook.controller");
const verifySignature = require("../middlewares/verifySignature.middleware");

router.get("/", webhookController.home);
router.get("/webhook", webhookController.verifyWebhook);
router.post("/webhook", verifySignature, webhookController.receiveWebhook);

module.exports = router;
