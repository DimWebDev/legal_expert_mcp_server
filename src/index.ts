#!/usr/bin/env node

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { server } from "./server.js";

// Import prompt modules (restored modular structure)
import "./prompts/ai-ethics-and-compliance-scan.js";
import "./prompts/comprehensive-privacy-audit.js";
import "./prompts/legal-landscape-discovery.js";
import "./prompts/market-and-customer-compliance-audit.js";
import "./prompts/risk-analysis-framework.js";
import "./prompts/intellectual-property-and-oss-audit.js";
import "./prompts/security-legal-alignment-check.js";
import "./prompts/website-and-app-legal-disclosure-check.js";
import "./prompts/legal-expert-prompts-catalog.js";

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Legal Expert MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
