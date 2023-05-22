const express = require("express");
const messageController = require("../controllers/messageController");
const clientController = require("../controllers/clientController");
const whatsappBotController = require("../controllers/whatsappBotController");
const addMessageController = require("../controllers/addMessageController");

// router
const router = express.Router();
router.post("/webhook", messageController);
router.post("/message", clientController);
router.post("/whatsappbot", whatsappBotController);
router.post("/addmessage", addMessageController);

module.exports = router;
