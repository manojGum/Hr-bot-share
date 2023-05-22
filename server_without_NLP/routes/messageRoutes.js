const express = require("express");
const whatsappBotController = require("../controllers/whatsappBotController");
const addMessageController = require("../controllers/addMessageController");

// router
const router = express.Router();
router.post("/whatsappbot", whatsappBotController);
router.post("/addmessage", addMessageController);

module.exports = router;
