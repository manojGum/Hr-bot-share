const express = require("express");
const userDetailsController = require("../controllers/userDetails/userDetailsController");
const getuserDetailsController = require("../controllers/userDetails/getuserDetailsController");

// router
const router = express.Router();
router.post("/userdetails", userDetailsController);
router.get("/userdetails/:phone", getuserDetailsController)
;

module.exports = router;
