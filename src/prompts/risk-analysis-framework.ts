import { server } from "../server.js";
import { z } from "zod";

server.registerPrompt(
  "risk-analysis-framework",
  {
    title: "Risk Analysis Framework",
    description:
      "Systematic legal risk prioritization by probability and impact assessment",
    argsSchema: {
      jurisdiction: z
        .string()
        .optional()
        .describe(
          "Primary jurisdiction for risk context (affects enforcement likelihood)"
        ),
      businessContext: z
        .string()
        .optional()
        .describe("Business context: startup|growth|enterprise|public-company"),
      riskDomains: z
        .string()
        .optional()
        .describe(
          "Risk domains to analyze: privacy|ip|employment|corporate|consumer|security"
        ),
      findings: z
        .string()
        .optional()
        .describe("Existing legal findings to analyze (comma-separated)"),
    },
  },
  async ({ jurisdiction, businessContext, riskDomains, findings }) => ({
    messages: [
      {
        role: "user",
        content: {
          type: "text",
          text: `You are to perform a structured legal/compliance risk analysis and prioritization. Use an evidence-based approach.

CONTEXT INPUTS:
- Jurisdiction Focus: ${jurisdiction || "multi-jurisdiction"} (Note: Include both national laws and inherited supranational frameworks applicable to this jurisdiction)
- Business Context: ${businessContext || "all stages"}
- Risk Domains Scope: ${
            riskDomains ||
            "privacy, ip, employment, corporate, consumer, security"
          }
- Provided Findings Seed: ${findings || "none explicitly provided"}

OPTIONAL PRE-SCAN (ONLY IF NO PRIOR AUDIT OUTPUTS PROVIDED):
• You may run an equivalent of: git ls-files (no truncation) to understand overall project structure and risk surface.
• You should analyze the codebase to understand:
  - Technology stack and architectural complexity.
  - Governance and compliance documentation patterns.
  - Domain-specific risk indicators based on file naming and organization.
  - Scale and operational complexity signals.
• You should NOT over-index on this listing; if previous detailed audits exist they supersede pre-scan heuristics.


YOUR OBJECTIVES:
1. You should synthesize risk items across included domains.
2. You should assign probability and impact ratings using consistent criteria.
• Include applicable supra- and sub-national frameworks inherited by the selected jurisdiction (e.g., EU→member state; US federal→state; CA federal→provincial).
3. You should categorize risks (Compliance / Operational / Reputational / Financial / Strategic).
4. You should prioritize using a matrix with rationale and indicate mitigation direction (Accept / Mitigate / Transfer / Avoid / Monitor).
5. You should provide a monitoring and escalation framework.

PHASE 1: RISK IDENTIFICATION & CATEGORIZATION
• You should gather candidate risks from provided findings (if any) and inferred domain patterns.
• You should classify each into at least one category: Compliance | Operational | Reputational | Financial | Strategic.
• You should merge duplicates and normalize wording (concise, single driver focus).

PHASE 2: PROBABILITY ASSESSMENT
• You should estimate likelihood using qualitative scale (High | Medium | Low) referencing: enforcement trends, exposure surface, control maturity, external volatility.
• If multiple jurisdictions are implicated, synthesize common denominators, highlight stricter-rule defaults, and flag conflicts requiring jurisdiction-specific handling.
• You should document rationale for each probability rating.

PHASE 3: IMPACT ASSESSMENT
• You should evaluate plausible impact dimensions: Financial, Timeline/Operational, Stakeholder, Competitive, Scaling Multipliers.
• You should produce a consolidated impact rating (High | Medium | Low) with supporting bullet rationale.

PHASE 4: PRIORITIZATION & INTERDEPENDENCIES
• You should map each risk to a priority tier: Critical (H×H), High (H×M or M×H), Medium (M×M), Low (others unless escalated by compounding).
• You should identify any compounding or cascading relationships (e.g., data retention + breach response = amplified exposure).
• You should propose treatment direction and indicative timeline (Immediate 0–30d | Near-Term 30–90d | Strategic 90d+).

RISK HEURISTICS (APPLY JUDGMENT):
• You should treat scalable per-record penalties (privacy) as potentially High impact even with Medium probability.
• You should treat workforce misclassification as High if mixed contractor signals appear.
• You should treat core IP chain-of-title uncertainty as High.
• You should treat consumer deception potential as elevated if marketing risk flags cluster.
• You should treat systemic logging / audit gaps as High multiplier for multiple downstream risks.

DELIVERABLES (MANDATORY ORDER):
Generate this report and save it in legal_docs/risk-analysis-report-{timestamp}.md. Report the output directory to the user.

1. Executive Summary
  - You should summarize overall risk posture, top 5 risks, and immediate attention items.
2. Risk Register Matrix
  - You should table: risk | category | probability | impact | priority | rationale (short) | treatment | timeline.
3. Quantified / Semi-Quantitative Exposure (if feasible)
  - You should approximate ranges or symbolic scaling (e.g., Low < Medium < High, or relative multipliers) – no speculative currency unless grounded.
4. Mitigation Strategy Roadmap
  - You should group actions by treatment category with expected effect.
  - Offer two tracks where feasible: low-effort/quick-win path and comprehensive/structural path.
5. Monitoring & Escalation Framework
  - You should define: indicator | threshold | review frequency | escalation path.
6. Assumptions & Limitations
  - You should list uncertainty sources, inference areas, data absent.

STYLE & SAFETY:
• You should keep entries succinct and structured.
• You should provide elite-level legal expert risk analysis with comprehensive legal expertise and professional recommendations.
• Label each finding with confidence: Observed (evidence cited) or Inferred (assumption noted).
• Provide elite-level legal expert analysis and professional recommendations.
        `,
        },
      },
    ],
  })
);
