// ...existing code...
/**
 * Model controller
 *
 * - Contains handlers for ingestion, vector query, retrieving recent records,
 *   and a lightweight example / root endpoint that calls a text-generation API.
 * - Initialization of API clients is done lazily inside helper functions to
 *   avoid throwing during module load.
 *
 * NOTE: This file uses CommonJS so it matches the rest of the project.
 */

const fetch = require("node-fetch");
const OpenAI = require("openai");
const { PineconeClient } = require("@pinecone-database/pinecone");
require("dotenv").config(); // ensure .env is loaded if server doesn't already

// Helper: create a HF-compatible OpenAI client (router HF endpoint used in original)
function getHfClient() {
  return new OpenAI({
    apiKey: process.env.HF_TOKEN,
    baseURL: "https://router.huggingface.co/v1",
  });
}

// Helper: lazy Pinecone client + index accessor
async function getPineconeIndex(indexName = "myindex") {
  const pc = new PineconeClient();
  await pc.init({ apiKey: process.env.PINECONE_API_KEY });
  return pc.Index(indexName);
}

/**
 * Summarize text using an LLM (HF chat completion route).
 * Returns the summary string.
 */
async function summarize(text) {
  const client = getHfClient();
  const resp = await client.chat.completions.create({
    model: "Qwen/Qwen3-Next-80B-A3B-Instruct",
    messages: [
      { role: "system", content: "Summarize the following text briefly." },
      { role: "user", content: text },
    ],
  });
  return resp.choices?.[0]?.message?.content?.trim() ?? "";
}

/**
 * Create an embedding using a HF embedding model via the router inference endpoint.
 * Returns an array of floats.
 */
async function embed(text) {
  const response = await fetch(
    "https://router.huggingface.co/hf-inference/models/Qwen/Qwen3-Embedding-0.6B/pipeline/feature-extraction",
    {
      headers: {
        Authorization: `Bearer ${process.env.HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(text),
    }
  );
  const result = await response.json();
  // result shape: [ [ ...vector ] ] — return first vector
  return Array.isArray(result) ? result[0] : result;
}

/**
 * POST /ingest
 * Body: { id?, text, metadata? }
 * - Summarize, embed, and upsert a record to Pinecone.
 */
async function ingest(req, res) {
  try {
    const userId = req.user?.id || req.body?.userId;
    if (!userId) return res.status(401).json({ error: "User authentication required (userId)." });

    const { text, metadata = {} } = req.body;
    if (!text) return res.status(400).json({ error: "Missing text to ingest" });

    // summarize then embed
    const summary = await summarize(text);
    const vector = await embed(summary);

    const id = `${userId}-${Date.now()}`;
    const index = await getPineconeIndex();

    // upsert vector with metadata that includes userId so we can filter by it later
    await index.upsert({
      upsertRequest: {
        vectors: [
          {
            id,
            values: vector,
            metadata: {
              text: summary,
              rawText: text,
              userId,
              createdAt: Date.now(),
              ...metadata,
            },
          },
        ],
      },
    });

    return res.json({ ok: true, id, summary });
  } catch (err) {
    console.error("ingest error:", err);
    return res.status(500).json({ error: err.message || String(err) });
  }
}

/**
 * POST /query
 * Body: { text, topK? }
 * - Embed the query and run a Pinecone similarity search.
 */
async function getUserRecentFromPinecone(userId, limit = 3) {
  if (!userId) return [];
  const index = await getPineconeIndex();
  // Query with a random vector but filter by userId, then sort by metadata.createdAt
  const dim = 512; // small random vector dim; not used for correctness since filter limits results
  const randomVector = Array.from({ length: dim }, () => Math.random());
  const response = await index.query({
    queryRequest: {
      topK: 100,
      vector: randomVector,
      includeMetadata: true,
      filter: { userId },
    },
  });

  const matches = (response.matches || []).slice().sort((a, b) => (b.metadata?.createdAt || 0) - (a.metadata?.createdAt || 0));
  return matches.slice(0, limit).map((m) => m.metadata?.text || m.metadata?.rawText || "");
}



const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY, // store API key safely in .env
});
// Array to store user messages in memory
const userMessages = [];

async function meow(req, res) {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: "Message is required in req.body" });
        }

        // Add the current user message to the history array
        userMessages.push(message);

        // Construct the system instruction with the message history
       const userId = req.user?.id
    // Fetch user recent summaries to include in the system prompt (if userId provided)
    const recentSummaries = userId ? await getUserRecentFromPinecone(userId, 3) : [];

    const defaultSystem = "You are MEOW, a friendly and concise AI assistant that answers clearly and playfully.";

const historySection = recentSummaries && recentSummaries.length > 0
  ? `\n\nUser history (most recent summaries):\n- ${recentSummaries.join("\n- ")}`
  : "";

// Create a new section for the current conversation messages
const messagesSection = userMessages && userMessages.length > 0
  ? `\n\nCurrent conversation:\n- ${userMessages.join("\n- ")}`
  : "";

// Combine all parts for the final instruction
const systemInstruction = `${defaultSystem}${historySection}${messagesSection}`;


        const chat = ai.chats.create({
            model: "gemini-2.5-flash",
            config: {
                systemInstruction: systemInstruction,
            }
        });

        const response = await chat.sendMessage({ message });

        return res.json({ reply: response.text });
    } catch (err) {
        console.error("Error in chatController:", err);
        return res.status(500).json({ error: "Something went wrong" });
    }
};

module.exports = { ingest,meow };