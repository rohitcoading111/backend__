import Groq from "groq-sdk";
import config from "./config.js";

if (!config.GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY is missing in environment variables");
}

const groq = new Groq({
    apiKey: config.GROQ_API_KEY,
});

export default groq;
