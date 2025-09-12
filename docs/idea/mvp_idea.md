# 🚀 Legal Expert MCP Server – Prompts-Based MVP

## Overview

A Model Context Protocol (MCP) server providing **expert legal analysis prompts**. Instead of automated advice, it delivers **structured, professional-grade methodologies** that guide AI agents through legal reviews using their own tools (READ, GLOB, GREP, WEBSEARCH, WRITE, etc.).

## Core Concept

**Legal Expertise as Prompts**: top legal methodologies encoded as MCP prompts, adaptable by `jurisdiction` and `sector`.

## Key Benefits

- **Professional Methodology**: rigor of elite legal practice
- **AI Agent Integration**: orchestrates tools for discovery, research, and reporting
- **Safe & Compliance-Friendly**: frameworks, not advice
- **Tool-Agnostic**: works with any agent’s tools
- **Maintainable**: modular prompts, easy to update

---

## MCP Architecture

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioTransport } from "@modelcontextprotocol/sdk/transport/stdio.js";

const server = new McpServer({
  name: "legal-expert-server",
  version: "1.0.0",
});

// Example registration
server.registerPrompt("comprehensive-privacy-audit" /* ... */);
server.registerPrompt("intellectual-property-and-oss-audit" /* ... */);
server.registerPrompt("security-legal-alignment-check" /* ... */);
server.registerPrompt("risk-analysis-framework" /* ... */);

const transport = new StdioTransport();
server.serve(transport);
```

---

## Core Legal Expert Prompts

| Prompt Name                                       | Purpose                                                       | Parameters                                                  | Workflow (phases & deliverables)                                                                                            |
| ------------------------------------------------- | ------------------------------------------------------------- | ----------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `legal-landscape-discovery`                       | Map laws relevant to product & sector                         | `jurisdiction`, `sector`, `businessModel?`, `targetPath?`   | Analyze product → map baseline law → add sector layers → flag cross-border → output “legal map.”                            |
| `comprehensive-privacy-audit`                     | Privacy compliance & policy review (GDPR, CCPA, PIPEDA, etc.) | `jurisdiction`, `regulations?`, `dataTypes?`, `targetPath?` | Data discovery → flows & transfers → consent & retention → cross-check policies → compliance report.                        |
| `website-and-app-legal-disclosure-check`          | Ensure required disclosures in web/app                        | `jurisdiction`, `businessModel`, `targetPath?`, `platform?` | Scan repo/pages → check mandatory disclosures (privacy, terms, cookies, imprint) → cross-check law → remediation checklist. |
| `security-legal-alignment-check`                  | Align code security with legal mandates                       | `jurisdiction`, `framework?`, `targetPath?`                 | Auth & passwords → encryption → secrets → map to SOC2/HIPAA/ISO/GDPR → gap report.                                          |
| `ai-ethics-and-compliance-scan`                   | AI/ML compliance & ethics (EU AI Act, FTC, NIST)              | `jurisdiction`, `aiModelType?`, `targetPath?`               | Detect AI use → check datasets → assess bias/fairness → regulatory mapping → compliance findings.                           |
| `intellectual-property-and-oss-audit`             | IP ownership + OSS license compliance                         | `jurisdiction?`, `distributionModel?`, `targetPath?`        | Inventory assets → verify assignments → scan OSS → map licenses → flag copyleft risks → compliance matrix.                  |
| `startup-corporate-and-fundraising-readiness`     | Governance & fundraising due diligence                        | `jurisdiction`, `stage?`, `targetPath?`                     | Equity splits → governance docs → cap table → liabilities → investor red flag report.                                       |
| `employment-and-contractor-classification-review` | Worker classification & IP assignment                         | `jurisdiction`, `contractorOrEmployee?`, `targetPath?`      | Verify classification → IP assignment enforceability → non-competes → benefits/liability review.                            |
| `market-and-customer-compliance-audit`            | Consumer law, ads, and billing compliance                     | `jurisdiction`, `targetPath?`, `paymentProvider?`           | Refunds & cancellation → disclosures → ads & testimonials → billing/auto-renewals → hidden fees risks.                      |
| `risk-analysis-framework`                         | Prioritize identified risks by likelihood × impact            | `jurisdiction?`, `businessContext?`, `findings[]`           | Categorize → score likelihood × impact → rank (Critical–Low) → remediation plan.                                            |
| `legal-expert-prompts-catalog`                    | Index & guide to all prompts                                  | `category?`, `jurisdiction?`                                | List prompts → group by category → show use cases → suggest selection guidance.                                             |

---

## Benefits of Prompts-First Approach

- **Safety & Ethics**: frameworks, not advice; lawyers stay in loop
- **Flexibility**: adapts via `jurisdiction`, `sector`, `businessModel`
- **Expert Knowledge**: methods mirror elite legal practice
- **Maintainability**: modular, easy to expand and update

---
