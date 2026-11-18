import { Pinecone } from "@pinecone-database/pinecone";
import config from "./config.js";

const pinecone = new Pinecone({
    apiKey: config.PINECONE_API_KEY,
});

const learnHubIndex = pinecone.index({
    name: config.PINECONE_INDEX_NAME,
    namespace: "learnhub",
});

export { pinecone, learnHubIndex };

export default learnHubIndex;
