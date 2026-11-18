
import { pinecone } from "../config/pinecone.config.js";
import config from "../config/config.js";

const testPineconeConnection = async () => {
    try {
        console.log("Connecting to Pinecone...");

        const index = pinecone.index(
            config.PINECONE_INDEX_NAME
        );

        const stats = await index.describeIndexStats();

        console.log("Pinecone connected successfully!");

        console.log("Index Name:", config.PINECONE_INDEX_NAME);
        console.log("Index Statistics:", stats);

    } catch (error) {
        console.error("Pinecone connection failed:", error.message);
    }
};

testPineconeConnection();
