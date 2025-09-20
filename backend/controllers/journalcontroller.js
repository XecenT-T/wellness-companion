const asyncHandler = require("express-async-handler");
const Journal = require("../models/journalmodel");
const Summary = require("../models/summarymodel");
const { summarize } = require("../utils/summaryHelper");

// @desc    Get all journal entries for a user
// @route   GET /api/journal
// @access  Private
const getJournalEntries = asyncHandler(async (req, res) => {
  const journals = await Journal.find({ userId: req.user.id });
  res.status(200).json(journals);
});

// @desc    Create a journal entry
// @route   POST /api/journal
// @access  Private
const createJournalEntry = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    res.status(400);
    throw new Error("Please add a title and content");
  }

  const journal = await Journal.create({
    title,
    content,
    userId: req.user.id,
  });

  // Summarize and save the journal entry
  if (journal) {
    const summaryText = await summarize(content);
    await Summary.create({
      userId: req.user.id,
      journalId: journal._id,
      summary: summaryText,
    });
  }

  res.status(201).json(journal);
});

// @desc    Get a single journal entry
// @route   GET /api/journal/:id
// @access  Private
const getJournalEntryById = asyncHandler(async (req, res) => {
  const journal = await Journal.findById(req.params.id);

  if (!journal) {
    res.status(404);
    throw new Error("Journal not found");
  }

  // Make sure the logged in user matches the journal user
  if (journal.userId.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  res.status(200).json(journal);
});

// @desc    Update a journal entry
// @route   PUT /api/journal/:id
// @access  Private
const updateJournalEntry = asyncHandler(async (req, res) => {
  const journal = await Journal.findById(req.params.id);

  if (!journal) {
    res.status(404);
    throw new Error("Journal not found");
  }

  // Make sure the logged in user matches the journal user
  if (journal.userId.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedJournal = await Journal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  // Update the summary
  if (updatedJournal) {
    const summaryText = await summarize(updatedJournal.content);
    await Summary.findOneAndUpdate({ journalId: updatedJournal._id }, { summary: summaryText });
  }

  res.status(200).json(updatedJournal);
});

// @desc    Delete a journal entry
// @route   DELETE /api/journal/:id
// @access  Private
const deleteJournalEntry = asyncHandler(async (req, res) => {
  const journal = await Journal.findById(req.params.id);

  if (!journal) {
    res.status(404);
    throw new Error("Journal not found");
  }

  // Make sure the logged in user matches the journal user
  if (journal.userId.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await journal.remove();
  await Summary.findOneAndDelete({ journalId: req.params.id });

  res.status(200).json({ id: req.params.id });
});

// @desc    Get total number of journal entries
// @route   GET /api/journal/count
// @access  Public
const getJournalCount = asyncHandler(async (req, res) => {
    console.log("getJournalCount function called");
    const count = await Journal.countDocuments();
    res.status(200).json({ count });
});

module.exports = {
  getJournalEntries,
  createJournalEntry,
  getJournalEntryById,
  updateJournalEntry,
  deleteJournalEntry,
  getJournalCount,
};