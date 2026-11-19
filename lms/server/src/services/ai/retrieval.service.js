import { learnHubIndex } from "../../config/pinecone.config.js";

export const retrieveKnowledge = async (question) => {

    // Search relevant documents in Pinecone
    const result = await learnHubIndex.documents.search({
        scoreBy: [
            {
                type: "embed",
                field: "chunk_text",
                query: question,
            },
        ],
        topK: 3,
        includeFields: ["chunk_text", "title"],
    });

    // Extract relevant text from search results
    const context = result.matches.map((item) => ({
        text: item.chunk_text,
        title: item.title,
        score: item._score,
    }));

    return context;
};
