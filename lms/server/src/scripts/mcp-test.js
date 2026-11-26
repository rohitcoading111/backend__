import { MCPAdapter } from "@langchain/mcp-adapters";

const adapter = new MCPAdapter({
    servers: {
        learnhub: {
            url: "http://localhost:3000/api/mcp",
        },
    },
});

const tools = await adapter.listTools();

console.log("Discovered MCP Tools:");

for (const t of tools) {
    console.log(t.name);
}

await adapter.close();