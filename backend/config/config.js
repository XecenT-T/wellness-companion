require('dotenv').config();

const config = {
    // Server configuration
    server: {
        port: process.env.PORT || 3000,
    },

    // MongoDB Configuration
    database: {
        connectionString: process.env.CONNECTION_STRING,
    },
    
    // Hugging Face API configuration
    huggingface: {
        apiKey: process.env.HF_TOKEN,
        baseUrl: "https://router.huggingface.co/v1",
        inferenceUrl: "https://router.huggingface.co/hf-inference/models"
    },

    // Pinecone configuration
    pinecone: {
        apiKey: process.env.PINECONE_API_KEY,
        indexName: 'myindex',
        dimension: 1024, // The dimension of your embedding model
    },

    // AI Models configuration
    models: {
        summarization: "Qwen/Qwen3-Next-80B-A3B-Instruct",
        embedding: "Qwen/Qwen3-Embedding-0.6B",
        chat: "deepseek-ai/DeepSeek-R1:fireworks-ai",
    }
};

module.exports = config;