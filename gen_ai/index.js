import { ChatGroq } from "@langchain/groq";
import dotenv from "dotenv";
import rl from "readline/promises";

dotenv.config();

const readline = new rl.Interface({
    input: process.stdin,
    output: process.stdout
});

const messages = [];


const model = new ChatGroq({
    model: "openai/gpt-oss-120b",
    apiKey: process.env.API_KEY,
});

while (true) {
    const userInput = await readline.question("enter your question: ");
    messages.push({
        role:"user",
        content:userInput
    });
    

    const stream = await model.stream(messages);

    let aiRes = ""

    for await (const chunk of stream) {
        aiRes += chunk.content;
        process.stdout.write(chunk.content);
    }

    messages.push({
        role:"assistant",
        content:aiRes
    })

    console.log("\n");
}


readline.close();