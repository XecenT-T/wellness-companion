const mongoose = require("mongoose");

const ChatMessageSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    from: {
        type: String,
        required: true,
        enum: ['user', 'bot']
    },
    text: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("ChatMessage", ChatMessageSchema);