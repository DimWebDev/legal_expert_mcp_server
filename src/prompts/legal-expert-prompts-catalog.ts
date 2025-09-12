import { server } from "../server.js";
import { z } from "zod";

server.registerPrompt(
  "legal-expert-prompts-catalog",
  {
    title: "Legal Expert Prompts Catalog",
    description: "List all available legal analysis prompts",
    argsSchema: {},
  },
  async () => ({
    messages: [
      {
        role: "user",
        content: {
          type: "text",
          text: `Here are all available legal expert prompts in this MCP server:

## Available Prompts

- **legal-landscape-discovery**: Map baseline + sector + cross-border legal frameworks
  - Required: jurisdiction, sector
  - Optional: businessModel, targetPath

- **risk-analysis-framework**: Prioritize aggregated legal risks
  - Required: none
  - Optional: jurisdiction, businessContext, riskDomains, findings

- **comprehensive-privacy-audit**: Data lifecycle + obligations gap assessment
  - Required: jurisdiction
  - Optional: regulations, targetPath

- **website-and-app-legal-disclosure-check**: Required disclosures inventory & gaps
  - Required: jurisdiction
  - Optional: targetPath, productType

- **security-legal-alignment-check**: Security control vs legal obligation mapping
  - Required: none
  - Optional: jurisdiction, targetPath, securityFrameworks

- **ai-ethics-and-compliance-scan**: AI system classification & governance assessment
  - Required: jurisdiction
  - Optional: aiModelType, targetPath, riskLevel

- **intellectual-property-and-oss-audit**: IP chain, OSS licenses, infringement vectors
  - Required: jurisdiction
  - Optional: targetPath, codeOwnershipModel

- **market-and-customer-compliance-audit**: Consumer-facing flows, pricing, marketing fairness
  - Required: jurisdiction
  - Optional: businessModel, targetPath, paymentProvider

## Usage Notes
- All prompts generate timestamped reports saved to legal_docs/ directory
- Start with **legal-landscape-discovery** for initial mapping
- Use **risk-analysis-framework** to consolidate findings from other audits
        `},
      },
    ],
  })
);
