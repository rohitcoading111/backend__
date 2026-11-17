import { ChatGroq } from "@langchain/groq";
import dotenv from "dotenv";
import rl from "readline/promises";

dotenv.config();

const readline = new rl.Interface({
    input: process.stdin,
    output: process.stdout
});

const model = new ChatGroq({
    model: "openai/gpt-oss-120b",
    apiKey: process.env.API_KEY,
});

while (true) {
    // 1. Yahan 'await' lagaya hai taaki user ke type karne ka wait kare
    const userInput = await readline.question("enter your question: ");
    

    const stream = await model.stream(userInput);

    for await (const chunk of stream) {
        process.stdout.write(chunk.content);
    }

    console.log("\n");
}


readline.close();