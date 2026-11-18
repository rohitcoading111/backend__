import { Pinecone } from "@pinecone-database/pinecone";
import config from "./config.js";

if (!config.PINECONE_API_KEY) {
    throw new Error("PINECONE_API_KEY is missing");
}

if (!config.PINECONE_INDEX_NAME) {
    throw new Error("PINECONE_INDEX_NAME is missing");
}

// Initialize Pinecone client
const pinecone = new Pinecone({
    apiKey: config.PINECONE_API_KEY,
});

// Connect to existing LearnHub index
const learnHubIndex = pinecone.index(
    config.PINECONE_INDEX_NAME
);

export { pinecone, learnHubIndex };

export default learnHubIndex;
