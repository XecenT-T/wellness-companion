const ChatMessage = require("../models/chatmessagemodel");
const { GoogleGenAI } = require("@google/genai");
const Summary = require("../models/summarymodel");

async function getUserRecentSummariesFromMongo(userId, limit = 3) {
    if (!userId) return [];
    const summaries = await Summary.find({ userId }).sort({ createdAt: -1 }).limit(limit);
    return summaries.map(s => s.summary);
}

async function ingest(req, res) {
    res.status(404).json({ error: "This endpoint is no longer supported." });
}

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function meow(req, res) {
    try {
        const { message } = req.body;
        const userId = req.user.id;

        if (!message) {
            return res.status(400).json({ error: "Message is required in req.body" });
        }

        await ChatMessage.create({ userId, from: 'user', text: message });

        const recentSummaries = await getUserRecentSummariesFromMongo(userId, );
        const chatHistory = await ChatMessage.find({ userId }).sort({ createdAt: 1 });

        const defaultSystem = "You are MEOW, a friendly and concise AI assistant that answers clearly and playfully.";

        const historySection = recentSummaries && recentSummaries.length > 0
          ? `\n\nUser history (most recent summaries):\n- ${recentSummaries.join("\n- ")}`
          : "";

        const messagesSection = chatHistory && chatHistory.length > 0
          ? `\n\nCurrent conversation:\n- ${chatHistory.map(m => `${m.from}: ${m.text}`).join("\n- ")}`
          : "";

        const systemInstruction = `${defaultSystem}${historySection}${messagesSection}`;

        const chat = ai.chats.create({
            model: "gemini-2.5-flash",
            config: {
                systemInstruction: systemInstruction,
            }
        });

        const response = await chat.sendMessage({ message });
        const botReply = response.text;

        await ChatMessage.create({ userId, from: 'bot', text: botReply });

        return res.json({ reply: botReply });
    } catch (err) {
        console.error("Error in meow function:", err);
        return res.status(500).json({ error: "An internal server error occurred.", details: err.message });
    }
};

const getChatHistory = async (req, res) => {
    try {
        const userId = req.user.id;
        const chatHistory = await ChatMessage.find({ userId }).sort({ createdAt: 1 });
        res.json(chatHistory);
    } catch (err) {
        console.error("Error in getChatHistory:", err);
        res.status(500).json({ error: "Something went wrong" });
    }
};

module.exports = { ingest, meow, getChatHistory };