import { server } from "../server.js";
import { z } from "zod";

server.registerPrompt(
  "legal-landscape-discovery",
  {
    title: "Legal Landscape Discovery",
    description:
      "Guide developers and startups through legal frameworks relevant to their business sector and jurisdiction",
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
          text: `You are to help developers and startups navigate the legal landscape by conducting a comprehensive discovery of relevant frameworks, obligations, safe boundaries, and strategic guardrails for their specific business context.

CONTEXT INPUTS:
- Jurisdiction: ${jurisdiction} (Note: When analyzing local jurisdictions, also consider inherited supranational frameworks - e.g., EU law for EU member states, federal law for US states, etc.)
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
1. You should help developers and startups identify baseline legal & quasi-legal frameworks relevant to their software development and business activities.
• Include applicable supra- and sub-national frameworks inherited by the selected jurisdiction (e.g., EU→member state; US federal→state; CA federal→provincial).
2. You should surface data protection & AI governance implications when prompts may orchestrate analysis of user repositories and external sources.
3. You should clarify IP ownership, licensing posture, and contribution governance for methodology prompts.
4. You should define guardrails to avoid unauthorized practice of law (UPL) across target jurisdictions.
5. You should produce a phased maturity roadmap (MVP → Stabilization → Growth → Scale) to guide their legal compliance journey.

PHASE 1: FOUNDATIONAL BASELINE
• You should map: corporate platform operations (governance, limitation of liability stance), disclaimers structure, UPL boundary criteria (holding out / reliance / individualized advice signals), user classification (consumer vs professional) impact, privacy-by-design posture (transient analysis, minimal retention), IP methodology ownership & license clarity, dependency/license compatibility.

PHASE 2: PROMPT ARCHITECTURE & ORCHESTRATION RISK
• You should evaluate tool invocation patterns (glob/grep/webfetch) for inadvertent sensitive data ingestion risks.
• You should provide elite-level legal expert analysis and actionable recommendations based on comprehensive legal expertise.
• You should assess hallucination mitigation mechanisms (scaffolding, explicit limitations).
• You should verify model/provider neutrality (no embedded proprietary heuristics).
• You should consider logging/telemetry implications for data protection triggers.

PHASE 3: JURISDICTIONAL & EXPANSION FACTORS
• You should outline US considerations (UPL patchwork, FTC guidance, CCPA/CPRA if data touches CA residents).
• You should outline EU considerations (controller vs processor posture; ePrivacy interplay; GDPR triggers; AI Act likely low-risk classification rationale).
• For fintech sector specifically: Include PSD2/MiFID II requirements, crypto-asset regulations (MiCA if applicable), AML/KYC frameworks, and financial data protection rules.
• If multiple jurisdictions are implicated, synthesize common denominators, highlight stricter-rule defaults, and flag conflicts requiring jurisdiction-specific handling.
• Consider regional/treaty overlays (e.g., EEA/EFTA, Council of Europe, CPTPP) where applicable.
• You should outline UK/Commonwealth parallels and disclaimer localization needs.
• You should inspect cross-border transfer vectors (if third-party AI infrastructure processes transient content) and note residual exposure.
• You should horizon scan emerging AI governance (EU AI Act transparency, OECD, US policy frameworks).

PHASE 4: GUARDRAILS & STRATEGIC ROADMAP
• You should structure maturity tiers:
  - Immediate (MVP): disclaimers, scope-of-use statement, license file validation, contribution policy stub, no persistent user data storage.
  - Near-Term: privacy notice draft, standardized disclaimer fragment, methodology versioning + changelog, risk register initiation.
  - Growth: CLA/DCO adoption, modular licensing strategy, API usage terms, governance guidelines.
  - Scale: periodic external legal review, optional audit trail mode, localized disclaimers, AI transparency statement alignment.
• For fintech sector: Include immediate AML/KYC policy stubs, financial data handling protocols, and regulatory reporting frameworks in early tiers.

SPECIAL FOCUS AREAS
• You should define: disclaimer standardization, methodology version control, jurisdiction overfitting avoidance, responsible AI statements (bias/fairness provenance for AI-related prompts), security alignment (no secret ingestion boundary).

RISK CATEGORIZATION HEURISTICS
• You should classify: Critical (UPL breach / unlawful processing risk), High (reputational or credibility erosion), Medium (process maturity gap), Low (optimization opportunity).

DELIVERABLES (MANDATORY ORDER)
Generate this report and save it in legal_docs/legal-landscape-discovery-report-{timestamp}.md. Report the output directory to the user.

1. Executive Summary
  - You should provide a clear overview of key legal considerations and actionable guidance for the developer's or startup's specific context.
2. Regulatory & Framework Map
  - You should provide a clear mapping of applicable laws and regulations to help developers and startups understand their legal obligations.
3. Compliance Guardrail Matrix (area | current | target | gap | risk | control direction)
4. IP & Licensing Governance
5. Data & AI Governance Layer
6. Disclaimers & Safe Boundary Toolkit
7. Maturity Roadmap (tiered)
  - You should outline a step-by-step plan to help developers and startups progressively address legal requirements as their business grows.
  - Offer two tracks where feasible: low-effort/quick-win path and comprehensive/structural path.
  - For fintech solo developers: Quick-win track might include basic AML/KYC templates and crypto volatility disclaimers; comprehensive track includes full regulatory compliance frameworks and third-party audit preparation.
8. Monitoring & Change Management Plan (sources, cadence, responsible roles placeholder)

STYLE & SAFETY
• You should use neutral, implementation-oriented language.
• You should provide elite-level legal expert analysis using professional legal terminology and comprehensive legal frameworks.
• You should flag uncertainty as "Jurisdiction-Specific Validation Recommended".
• Label each finding with confidence: Observed (evidence cited) or Inferred (assumption noted).
• Provide elite-level legal expert analysis and professional recommendations; do not imply an attorney–client relationship.

FINAL OUTPUT
• You should produce Markdown with clear section headings.
• You should list assumptions explicitly where repository context is insufficient.
        `,
        },
      },
    ],
  })
);
