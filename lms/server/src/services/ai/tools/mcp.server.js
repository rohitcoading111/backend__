import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createCourseSchema } from "./create-course.tool.js";
import { createCourse } from "../../courses/course.service.js";

export const createMcpServer = (data = {}) => {
  const { userId, role, organizationId } = data;

  const server = new McpServer({
    name: "learnhub-tools",
    version: "1.0.0",
  });

  server.registerTool(
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
    },
  );

  server.registerTool(
    "create_course",
    {
      description: "Create a new LearnHub course using the provided details.",
      inputSchema: createCourseSchema,
    },
    async (args) => {
      try {
        const course = await createCourse({
          courseData: args,
          instructorId: userId,
          organizationId,
          file: null,
        });

        return {
          content: [
            {
              type: "text",
              text: `Course created successfully: ${course.title}`,
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Course creation failed: ${error.message}`,
            },
          ],
        };
      }
    },
  );

  return server;
};
