import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createCourseSchema } from "./create-course.tool.js";

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

mcpServer.registerTool(
    "create_course",
    {
        description: "Create a new LearnHub course using the provided details.",
        inputSchema: createCourseSchema,
    },
    async (args) => {
        return {
            content: [
                {
                    type: "text",
                    text: `Course creation request received for: ${args.title}`,
                },
            ],
        };
    }
);