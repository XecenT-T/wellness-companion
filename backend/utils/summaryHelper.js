const OpenAI = require("openai");
require("dotenv").config();

function getHfClient() {
  return new OpenAI({
    apiKey: process.env.HF_TOKEN,
    baseURL: "https://router.huggingface.co/v1",
  });
}

async function summarize(text) {
  const client = getHfClient();
  const resp = await client.chat.completions.create({
    model: "Qwen/Qwen3-Next-80B-A3B-Instruct",
    messages: [
      { role: "system", content: "Summarize the following text briefly. YOU ONLY HAVE TO SUMMARIZE THE TEXT. NOTHING ELSE ALSO ADD (ASK ME ABOUT IT) AT THE END" },
      { role: "user", content: text },
    ],
  });
  return resp.choices?.[0]?.message?.content?.trim() ?? "";
}

module.exports = { summarize };