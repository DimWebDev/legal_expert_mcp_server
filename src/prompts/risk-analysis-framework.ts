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
          text: `You are to perform a structured legal/compliance risk analysis and prioritization. Use an evidence-based approach and produce an informational framework—not legal advice.

CONTEXT INPUTS:
- Jurisdiction Focus: ${jurisdiction || "multi-jurisdiction"}
- Business Context: ${businessContext || "all stages"}
- Risk Domains Scope: ${
            riskDomains ||
            "privacy, ip, employment, corporate, consumer, security"
          }
- Provided Findings Seed: ${findings || "none explicitly provided"}

OPTIONAL PRE-SCAN (ONLY IF NO PRIOR AUDIT OUTPUTS PROVIDED):
• You may run an equivalent of: git ls-files (no truncation) to gather a full structural signal set.
• You should derive high-level indicators ONLY to seed generic risk brainstorming:
  - Presence of all governance / policy docs (LICENSE, SECURITY, CONTRIBUTING, PRIVACY, TERMS) – list each found.
  - Domain signal density (count all files containing privacy, auth, license, contract, payment in filename).
  - Approximate technology surface (dominant extensions: .ts, .py, .go, etc.).
• You should NOT over-index on this listing; if previous detailed audits exist they supersede pre-scan heuristics.


YOUR OBJECTIVES:
1. You should synthesize risk items across included domains.
2. You should assign probability and impact ratings using consistent criteria.
3. You should categorize risks (Compliance / Operational / Reputational / Financial / Strategic).
4. You should prioritize using a matrix with rationale and indicate mitigation direction (Accept / Mitigate / Transfer / Avoid / Monitor).
5. You should provide a monitoring and escalation framework.

PHASE 1: RISK IDENTIFICATION & CATEGORIZATION
• You should gather candidate risks from provided findings (if any) and inferred domain patterns.
• You should classify each into at least one category: Compliance | Operational | Reputational | Financial | Strategic.
• You should merge duplicates and normalize wording (concise, single driver focus).

PHASE 2: PROBABILITY ASSESSMENT
• You should estimate likelihood using qualitative scale (High | Medium | Low) referencing: enforcement trends, exposure surface, control maturity, external volatility.
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
1. Executive Summary
  - You should summarize overall risk posture, top 5 risks, and immediate attention items.
2. Risk Register Matrix
  - You should table: risk | category | probability | impact | priority | rationale (short) | treatment | timeline.
3. Quantified / Semi-Quantitative Exposure (if feasible)
  - You should approximate ranges or symbolic scaling (e.g., Low < Medium < High, or relative multipliers) – no speculative currency unless grounded.
4. Mitigation Strategy Roadmap
  - You should group actions by treatment category with expected effect.
5. Monitoring & Escalation Framework
  - You should define: indicator | threshold | review frequency | escalation path.
6. Assumptions & Limitations
  - You should list uncertainty sources, inference areas, data absent.

STYLE & SAFETY:
• You should keep entries succinct and structured.
• You should avoid definitive legal outcome predictions; use conditional phrasing.
• You should end with: "Informational risk prioritization framework – not legal advice."`,
        },
      },
    ],
  })
);
