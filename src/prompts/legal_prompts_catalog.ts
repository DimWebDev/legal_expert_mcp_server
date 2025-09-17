import { server } from "../server.js";
import { z } from "zod";

server.registerPrompt(
  "legal_prompts_catalog",
  {
    title: "legal_prompts_catalog",
    description: "List all available legal analysis prompts",
    argsSchema: {},
  },
  () => ({
    messages: [
      {
        role: "user",
        content: {
          type: "text",
          text: `Here are all available legal prompts in this MCP server:

## Available Prompts

- **legal_landscape_discovery**: Map baseline + sector + cross-border legal frameworks
  - Required: jurisdiction, sector
  - Optional: businessModel, targetPath

- **risk_analysis_framework**: Prioritize aggregated legal risks
  - Required: none
  - Optional: jurisdiction, businessContext, riskDomains, findings

- **comprehensive_privacy_audit**: Data lifecycle + obligations gap assessment
  - Required: jurisdiction, sector
  - Optional: regulations, targetPath

- **website_and_app_legal_disclosure_check**: Required disclosures inventory & gaps
  - Required: jurisdiction, sector
  - Optional: targetPath, productType

- **security_legal_alignment_check**: Security control vs legal obligation mapping
  - Required: jurisdiction, sector
  - Optional: targetPath, securityFrameworks

- **ai_ethics_and_compliance_scan**: AI system classification & governance assessment
  - Required: jurisdiction, sector
  - Optional: aiModelType, targetPath, riskLevel

- **intellectual_property_and_oss_audit**: IP chain, OSS licenses, infringement vectors
  - Required: jurisdiction
  - Optional: targetPath, codeOwnershipModel

- **market_and_customer_compliance_audit**: Consumer-facing flows, pricing, marketing fairness
  - Required: jurisdiction, sector
  - Optional: businessModel, targetPath, paymentProvider

## Usage Notes
- All prompts generate timestamped reports saved to legal_docs/ directory
- Start with **legal-landscape-discovery** for initial mapping
- Use **risk-analysis-framework** to consolidate findings from other audits
        `,
        },
      },
    ],
  })
);
