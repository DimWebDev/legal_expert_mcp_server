import { server } from "../server.js";
import { z } from "zod";

server.registerPrompt(
  "legal-landscape-discovery",
  {
    title: "Legal Landscape Discovery",
    description:
      "Comprehensive legal framework mapping for startup/business sector and jurisdiction",
    argsSchema: {
      jurisdiction: z
        .string()
        .describe("Primary jurisdiction (US, EU, UK, CA, AU, etc.)"),
      sector: z
        .string()
        .describe(
          "Business sector: fintech|healthtech|edtech|ecommerce|saas|marketplace|ai-ml"
        ),
      businessModel: z
        .string()
        .optional()
        .describe(
          "Business model: b2b|b2c|b2b2c|marketplace|subscription|freemium"
        ),
      targetPath: z
        .string()
        .optional()
        .describe(
          "Root path to analyze for business context (defaults to workspace root)"
        ),
    },
  },
  async ({ jurisdiction, sector, businessModel, targetPath }) => ({
    messages: [
      {
        role: "user",
        content: {
          type: "text",
          text: `You are to conduct a legal landscape discovery for this prompts-based Legal Expert MCP Server context. You must map obligations, safe boundaries, and strategic guardrails.

CONTEXT INPUTS:
- Jurisdiction: ${jurisdiction}
- Sector Focus: ${sector}
- Business Model: ${
            businessModel || "infer from repository (prompt distribution model)"
          }
- Target Path: ${targetPath || "workspace root"}

PRE-SCAN (RAPID CONTEXT PRIMING YOU MUST PERFORM BEFORE OBJECTIVES):
• You should run an equivalent of: git ls-files (no truncation) to rapidly understand repository structure and governance approach.
• You should analyze the codebase to understand:
  - Overall project architecture and technology choices.
  - Governance and documentation patterns.
  - Distribution and deployment indicators.
  - Security and compliance artifacts.
  - Development workflow and contribution patterns.
• You should identify areas requiring focused legal analysis based on project complexity and domain.
• You should not read file contents—only names / relative paths.

YOUR OBJECTIVES:
1. You should identify baseline legal & quasi-legal frameworks relevant to a prompts-distribution / developer enablement platform.
2. You should surface data protection & AI governance implications when prompts may orchestrate analysis of user repositories and external sources.
3. You should clarify IP ownership, licensing posture, and contribution governance for methodology prompts.
4. You should define guardrails to avoid unauthorized practice of law (UPL) across target jurisdictions.
5. You should produce a phased maturity roadmap (MVP → Stabilization → Growth → Scale).

PHASE 1: FOUNDATIONAL BASELINE
• You should map: corporate platform operations (governance, limitation of liability stance), disclaimers structure, UPL boundary criteria (holding out / reliance / individualized advice signals), user classification (consumer vs professional) impact, privacy-by-design posture (transient analysis, minimal retention), IP methodology ownership & license clarity, dependency/license compatibility.

PHASE 2: PROMPT ARCHITECTURE & ORCHESTRATION RISK
• You should evaluate tool invocation patterns (glob/grep/webfetch) for inadvertent sensitive data ingestion risks.
• You should ensure report framing remains "informational" not directive legal determinations.
• You should assess hallucination mitigation mechanisms (scaffolding, explicit limitations).
• You should verify model/provider neutrality (no embedded proprietary heuristics).
• You should consider logging/telemetry implications for data protection triggers.

PHASE 3: JURISDICTIONAL & EXPANSION FACTORS
• You should outline US considerations (UPL patchwork, FTC guidance, CCPA/CPRA if data touches CA residents).
• You should outline EU considerations (controller vs processor posture; ePrivacy interplay; GDPR triggers; AI Act likely low-risk classification rationale).
• You should outline UK/Commonwealth parallels and disclaimer localization needs.
• You should inspect cross-border transfer vectors (if third-party AI infrastructure processes transient content) and note residual exposure.
• You should horizon scan emerging AI governance (EU AI Act transparency, OECD, US policy frameworks).

PHASE 4: GUARDRAILS & STRATEGIC ROADMAP
• You should structure maturity tiers:
  - Immediate (MVP): disclaimers, scope-of-use statement, license file validation, contribution policy stub, no persistent user data storage.
  - Near-Term: privacy notice draft, standardized disclaimer fragment, methodology versioning + changelog, risk register initiation.
  - Growth: CLA/DCO adoption, modular licensing strategy, API usage terms, governance guidelines.
  - Scale: periodic external legal review, optional audit trail mode, localized disclaimers, AI transparency statement alignment.

SPECIAL FOCUS AREAS
• You should define: disclaimer standardization, methodology version control, jurisdiction overfitting avoidance, responsible AI statements (bias/fairness provenance for AI-related prompts), security alignment (no secret ingestion boundary).

RISK CATEGORIZATION HEURISTICS
• You should classify: Critical (UPL breach / unlawful processing risk), High (reputational or credibility erosion), Medium (process maturity gap), Low (optimization opportunity).

DELIVERABLES (MANDATORY ORDER)
Generate this report and save it in legal_docs/legal-landscape-discovery-report-{timestamp}.md. Report the output directory to the user.

1. Executive Summary
2. Regulatory & Framework Map
3. Compliance Guardrail Matrix (area | current | target | gap | risk | control direction)
4. IP & Licensing Governance
5. Data & AI Governance Layer
6. Disclaimers & Safe Boundary Toolkit
7. Maturity Roadmap (tiered)
8. Monitoring & Change Management Plan (sources, cadence, responsible roles placeholder)

STYLE & SAFETY
• You should use neutral, implementation-oriented language.
• You should avoid individualized legal advice—use "informational", "framework", "mapping".
• You should flag uncertainty as "Jurisdiction-Specific Validation Recommended".

FINAL OUTPUT
• You should produce Markdown with clear section headings.
• You should list assumptions explicitly where repository context is insufficient.
        `},
      },
    ],
  })
);
