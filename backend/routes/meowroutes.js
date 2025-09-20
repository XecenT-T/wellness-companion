const express = require("express");
const router = express.Router();
const controller = require("../controllers/meowcontroller");
const { protect } = require("../middleware/authMiddleware");

router.post("/ingest", protect, controller.ingest);
router.post("/", protect, controller.meow);
router.get("/history", protect, controller.getChatHistory);

module.exports = router;