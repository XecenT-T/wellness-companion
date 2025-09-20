const mongoose = require("mongoose");

const SummarySchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    journalId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Journal'
    },
    summary: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Summary", SummarySchema);