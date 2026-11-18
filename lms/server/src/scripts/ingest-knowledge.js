import { fileURLToPath } from "node:url";
import { ingestDocument } from "../services/ai/ingestion.service.js";

const ingestKnowledge = async () => {
    try {
        console.log("Starting LearnHub knowledge ingestion...");

        // Get documentation file path
        const filePath = fileURLToPath(
            new URL("../knowledge/learnhub-overview.md", import.meta.url)
        );

        // Send document to ingestion service
        const totalChunks = await ingestDocument(filePath);

        console.log("Knowledge ingestion completed!");
        console.log("Total chunks stored:", totalChunks);

    } catch (error) {
        console.error("Knowledge ingestion failed:", error.message);
    }
};

ingestKnowledge();
