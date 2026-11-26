import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export const mcpServer = new McpServer({
    name: "learnhub-tools",
    version: "1.0.0",
});

mcpServer.registerTool(
    "get_learnhub_status",
    {
        description: "Get the current status of LearnHub",
    },
    async () => {
        return {
            content: [
                {
                    type: "text",
                    text: "LearnHub is operational.",
                },
            ],
        };
    }
);