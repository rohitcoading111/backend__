import { readFile } from "node:fs/promises";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { learnHubIndex } from "../../config/pinecone.config.js";

// 1. Text splitter
const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 150,
});

// 2. Ingest document
export const ingestDocument = async (filePath) => {

    // Read markdown file
    const content = await readFile(filePath, "utf-8");

    // Split document into chunks
    const chunks = await splitter.splitText(content);

    // Convert chunks into Pinecone records
    const records = chunks.map((chunk, index) => ({
        _id: `learnhub-${index}`,
        chunk_text: chunk,
        title: "LearnHub Overview",
    }));

    // Store records in Pinecone
    const result = await learnHubIndex.documents.upsert({
    documents: records,
        });

        console.log("Pinecone upserted:", result.upsertedCount);
    console.log(`${records.length} chunks stored successfully`);

    return records.length;
};
