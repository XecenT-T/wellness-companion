const express = require("express");
const router = express.Router();
const { register, login, current } = require("../controllers/usercontroller");
const { getJournalEntries, createJournalEntry, getJournalEntryById, updateJournalEntry, deleteJournalEntry, getJournalCount } = require("../controllers/journalcontroller");
const { protect } = require("../middleware/authMiddleware");

const home = (req, res) => {
  res.send("Hello, world!");
};

router.route("/").get(home);

// User routes
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/current").get(protect, current);

// Journal routes
router.route("/journal/count").get(getJournalCount);
router.route("/journal").get(protect, getJournalEntries).post(protect, createJournalEntry);
router.route("/journal/:id").get(protect, getJournalEntryById).put(protect, updateJournalEntry).delete(protect, deleteJournalEntry);

module.exports = router;