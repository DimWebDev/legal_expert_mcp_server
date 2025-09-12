import { server } from "../server.js";
import { z } from "zod";

server.registerPrompt(
  "legal-expert-prompts-catalog",
  {
    title: "Legal Expert Prompts Catalog",
    description:
      "Discover and explore all available legal analysis prompts with guidance",
    argsSchema: {
      category: z
        .string()
        .optional()
        .describe(
          "Filter by category (compliance, ip, corporate, risk, discovery)"
        ),
      jurisdiction: z
        .string()
        .optional()
        .describe("Filter prompts relevant to specific jurisdiction"),
    },
  },
  async ({ category, jurisdiction }) => ({
    messages: [
      {
        role: "user",
        content: {
          type: "text",
          text: `You are to generate an up-to-date catalog of all legal expert prompts available in this MCP server. You must organize them clearly, apply any provided filters, and present structured selection guidance. Provide informational descriptions only.

FILTER CONTEXT:
- Category Filter: ${category || "none (show all)"}
- Jurisdiction Emphasis: ${jurisdiction || "none (general applicability)"}

OPTIONAL PRE-SCAN (CATALOG CONSISTENCY CHECK – RUN ONLY IF CATALOG DRIFT SUSPECTED):
• You may perform a full listing: git ls-files | grep 'src/prompts/' | grep -v '\\._' (no truncation).
• You should compare all discovered prompt filenames vs documented catalog entries and flag any missing or extra items.
• You should NOT include the raw list—only note discrepancies (e.g., "Undocumented prompt detected: X" or "Catalog lists Y but file missing").
• You should proceed without this step if stability is assumed.

YOUR OBJECTIVES:
1. You should list each prompt with purpose, required + optional parameters, and primary use case.
2. You should group prompts into logical categories: Risk & Discovery | Compliance & Regulatory | Intellectual Property | Corporate & Operations | Catalog & Meta.
3. You should apply filters (omit non-matching category if category provided; highlight jurisdiction-relevant prompts if jurisdiction provided).
4. You should provide selection pathways based on user scenario (startup, scaling, targeted audit, AI usage, governance hardening).
5. You should maintain concise formatting for fast scanning.

CATALOG (GROUPED):

RISK & DISCOVERY
- legal-landscape-discovery: Map baseline + sector + cross-border legal frameworks.
- risk-analysis-framework: Prioritize aggregated legal risks.

COMPLIANCE & REGULATORY
- comprehensive-privacy-audit: Data lifecycle + obligations gap assessment.
- website-and-app-legal-disclosure-check: Required disclosures inventory & gaps.
- security-legal-alignment-check: Security control vs legal obligation mapping.
- ai-ethics-and-compliance-scan: AI system classification & governance assessment.

INTELLECTUAL PROPERTY
- intellectual-property-and-oss-audit: IP chain, OSS licenses, infringement vectors.

CORPORATE & OPERATIONS
- startup-corporate-and-fundraising-readiness: Governance & diligence readiness.
- employment-and-contractor-classification-review: Worker status + assignment validity.
- market-and-customer-compliance-audit: Consumer-facing flows, pricing, marketing fairness.

CATALOG & META
- legal-expert-prompts-catalog: This catalog generator.

PARAMETERS SUMMARY (FORMAT: prompt → required | optional):
- legal-landscape-discovery → jurisdiction, sector | businessModel, targetPath
- comprehensive-privacy-audit → jurisdiction | regulations, targetPath
- intellectual-property-and-oss-audit → jurisdiction | targetPath, codeOwnershipModel
- ai-ethics-and-compliance-scan → jurisdiction | aiModelType, targetPath, riskLevel
- market-and-customer-compliance-audit → jurisdiction | businessModel, targetPath, paymentProvider
- security-legal-alignment-check → (jurisdiction optional) | targetPath, securityFrameworks
- website-and-app-legal-disclosure-check → jurisdiction | targetPath, productType
- risk-analysis-framework → (jurisdiction optional) | businessContext, riskDomains, findings
- startup-corporate-and-fundraising-readiness → jurisdiction | stage, targetPath
- employment-and-contractor-classification-review → jurisdiction | contractorOrEmployee, targetPath
- legal-expert-prompts-catalog → (none required) | category, jurisdiction

SELECTION GUIDANCE:
• You should recommend starting with legal-landscape-discovery for greenfield contexts.
• You should suggest privacy + IP audits early for data-heavy or distribution-focused products.
• You should position market-and-customer-compliance-audit + website disclosures for commercial launch readiness.
• You should guide use of risk-analysis-framework after multiple audits produce findings.
• You should highlight ai-ethics-and-compliance-scan when AI artifacts or model usage signals appear.

FILTER APPLICATION NOTES:
• If category provided, you should omit unrelated groups.
• If jurisdiction provided, you should add a note next to prompts most sensitive to jurisdictional variance (privacy, AI ethics, disclosures, employment).

OUTPUT FORMAT:
• You should return the catalog in Markdown with clear headings and bullet lists.
• You should end with a short note: "Informational catalog – not legal advice."`,
        },
      },
    ],
  })
);
