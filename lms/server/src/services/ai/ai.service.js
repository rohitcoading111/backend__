import llm from "./llm.service.js";
import { retrieveKnowledge } from "./retrieval.service.js";

// Generate LearnHub AI response as a stream
export const streamAIResponse = async function* (question) {

    // 1. Retrieve relevant knowledge from Pinecone
    const knowledge = await retrieveKnowledge(question);

    // 2. Convert retrieved knowledge into context
    const context = knowledge
        .map((item) => item.text)
        .join("\n\n");

    // 3. Prepare prompt for Groq
    const prompt = `
You are LearnHub's official AI assistant.

Answer the user's question using only the provided LearnHub context.

Rules:
- Be helpful and clear.
- Do not invent company information, features, or policies.
- If the context does not contain the answer, clearly say that you don't have this information.
- Do not pretend that an unavailable feature exists.

LearnHub Context:
${context}

User Question:
${question}

Answer:
`;

    // 4. Stream response from Groq
    const stream = await llm.stream(prompt);

    // 5. Yield each generated chunk
    for await (const chunk of stream) {

        const content = chunk.content;

        if (typeof content === "string" && content.length > 0) {
            yield content;
        }
    }
};
