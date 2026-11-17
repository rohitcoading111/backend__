import { ChatGroq } from "@langchain/groq";
import dotenv from "dotenv";
import rl from "readline/promises";
import {tool,createAgent} from "langchain"
import * as z from "zod"
import { log } from "console";

dotenv.config();

const events = [];

const createEventTool = tool(
   async function ({ date, title, description}){
    console.log("creating event",date,title,description);
    
    events.push({
        date,
        title,
        description
    })
    return "event created"
   },
   {
    name:"createEvent",
    description:"Creates a new event with a data,title and description",
    schema:z.object({
       date:z.string(),
       title:z.string(),
       description:z.string(),
    })
   }
)

const getEventsTool = tool(
    async function ({}){
        console.log("getting events");
        return events
    },{
        name:"getEvents",
        description:"Retrives all events",
        schema: z.object({})
    }
)


const readline = new rl.Interface({
    input: process.stdin,
    output: process.stdout
});

const messages = [];


const model = new ChatGroq({
    model: "openai/gpt-oss-120b",
    apiKey: process.env.API_KEY,
});

const agent = createAgent({
    model,
    tools:[createEventTool,getEventsTool]
});

while(true){
    const userInput = await readline.question("enter your input :")
    const stream = await agent.stream({
        messages:[
            {
                role:"user",
                content:userInput
            }
        ]
    },{streamMode:"messages"})

    for await (const [chunk] of stream) {
         process.stdout.write(chunk.content);
    }

    process.stdout.write("\n");
    
}



// while (true) {
//     const userInput = await readline.question("enter your question: ");
//     messages.push({
//         role:"user",
//         content:userInput
//     });
    

//     const stream = await model.stream(messages);

//     let aiRes = ""

//     for await (const chunk of stream) {
//         aiRes += chunk.content;
//         process.stdout.write(chunk.content);
//     }

//     messages.push({
//         role:"assistant",
//         content:aiRes
//     })

//     console.log("\n");
// }


// readline.close();