const express = require("express");
const messageController = require("../controllers/messageController");
const clientController = require("../controllers/clientController");
const whatsappBotController = require("../controllers/whatsappBotController");

// router
const router = express.Router();
router.post("/webhook", messageController);
router.post("/message", clientController);
router.post("/whatsappbot", whatsappBotController);

module.exports = router;
