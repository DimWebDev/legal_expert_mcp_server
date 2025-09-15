import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

// Central server instance exported for prompt modules to register against
export const server = new McpServer({
  name: "legal-info-mcp-server",
  version: "1.0.7",
});
