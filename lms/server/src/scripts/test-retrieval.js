
import { retrieveKnowledge } from "../services/ai/retrieval.service.js";

const testRetrieval = async () => {
    try {
        console.log("Testing LearnHub knowledge retrieval...");

        // User ka sample question
        const question = "What services does LearnHub provide?";

        // Pinecone se relevant knowledge retrieve karo
        const context = await retrieveKnowledge(question);

        console.log("\nQuestion:", question);
        console.log("\nRetrieved Knowledge:");

        console.log(JSON.stringify(context, null, 2));

    } catch (error) {
        console.error("Retrieval failed:", error.message);
    }
};

testRetrieval();
