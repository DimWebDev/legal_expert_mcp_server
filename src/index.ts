#!/usr/bin/env node

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { server } from "./server.js";

// Import prompt modules (restored modular structure)
import "./prompts/ai_ethics_and_compliance_scan.js";
import "./prompts/comprehensive_privacy_audit.js";
import "./prompts/legal_landscape_discovery.js";
import "./prompts/market_and_customer_compliance_audit.js";
import "./prompts/risk_analysis_framework.js";
import "./prompts/intellectual_property_and_oss_audit.js";
import "./prompts/security_legal_alignment_check.js";
import "./prompts/website_and_app_legal_disclosure_check.js";
import "./prompts/legal_expert_prompts_catalog.js";

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Legal Expert MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
