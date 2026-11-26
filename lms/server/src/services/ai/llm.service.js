import { ChatGroq } from "@langchain/groq";
import config from "../../config/config.js";

// Initialize Groq LLM
const llm = new ChatGroq({
    apiKey: config.GROQ_API_KEY,
    model: config.GROQ_MODEL,
    temperature: 0,
});

export const visionLlm = new ChatGroq({
    apiKey: config.GROQ_API_KEY,
    model: config.GROQ_VISION_MODEL,
    temperature: 0,
});

export default llm;
