import express from "express";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { createMcpServer } from "../services/ai/tools/mcp.server.js";

const router = express.Router();

router.post("/", async (req, res) => {
  let server;
  let transport;

  try {
    server = createMcpServer({
      userId: req.user?.id,
      role: req.user?.role,
      organizationId: req.organizationId ?? null,
      file: req.file ?? null,
    });

    transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
    });

    await server.connect(transport);

    await transport.handleRequest(req, res, req.body);
  } catch (error) {
    console.error("MCP HTTP Error:", error);

    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: "MCP request failed",
      });
    }
  }
});

export default router;
