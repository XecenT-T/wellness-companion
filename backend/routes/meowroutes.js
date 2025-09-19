// ...existing code...
/**
 * Router for model-related endpoints
 *
 * Mount this router in server.js / app.js:
 *   const modelRoutes = require("./routes/modelRoutes");
 *   app.use("/api/models", modelRoutes);
 *
 * Endpoints:
 *   POST  /ingest     -> ingest text -> summarize -> embed -> upsert to Pinecone
 *   
 *   GET   /           -> lightweight example that calls a generative model
 */

const express = require("express");
const router = express.Router();
const controller = require("../controllers/meowcontroller");

// ingest text, upsert to Pinecone
router.post("/ingest", controller.ingest);

// generate call
router.post("/", controller.meow);

module.exports = router;
// ...existing code...