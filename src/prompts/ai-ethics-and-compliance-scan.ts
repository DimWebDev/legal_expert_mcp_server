import { server } from "../server.js";
import { z } from "zod";

server.registerPrompt(
  "ai-ethics-and-compliance-scan",
  {
    title: "AI Ethics & Compliance Scan",
    description:
      "AI/ML system compliance with EU AI Act, FTC guidance, and ethical standards",
    argsSchema: {
      jurisdiction: z
        .string()
        .describe("Primary jurisdiction (EU, US, UK, CA, etc.)"),
      sector: z
        .string()
        .describe(
          "Business sector: fintech|healthtech|edtech|ecommerce|saas|marketplace|ai-ml (used as primary; inference validates only)"
        ),
      aiModelType: z
        .string()
        .optional()
        .describe(
          "AI model type: LLM|computer-vision|recommendation|decision-support|generative"
        ),
      targetPath: z
        .string()
        .optional()
        .describe("Root path to analyze (defaults to workspace root)"),
      riskLevel: z
        .string()
        .optional()
        .describe("Anticipated risk level: minimal|limited|high|prohibited"),
    },
  },
  async ({ jurisdiction, sector, aiModelType, targetPath, riskLevel }) => ({
    messages: [
      {
        role: "user",
        content: {
          type: "text",
          text: `You are to perform an AI ethics and regulatory compliance scan. You must follow the structured methodology below and produce the specified output strictly in Markdown.

CONTEXT INPUTS YOU SHOULD USE:
- Jurisdiction: ${jurisdiction} (Note: Include both national regulations and inherited supranational frameworks applicable to this jurisdiction)
- Sector: ${sector} (Use as primary for sector overlays; infer domain(s) to validate and flag mismatch.)
- AI Model Type (if detectable): ${
            aiModelType || "infer from repository artifacts"
          }
- Target Path: ${targetPath || "workspace root"}
- Declared / Anticipated Risk Level: ${
            riskLevel || "determine from classification"
          }

PRE-SCAN (RAPID CONTEXT PRIMING YOU MUST PERFORM BEFORE PHASE 1):
• You should obtain the complete repository file listing using: git ls-files (no truncation).
• You should analyze the codebase structure to understand:
  - Primary programming languages and frameworks used (based on file extensions and common patterns).
  - Directory organization and naming conventions that suggest AI/ML components.
  - Presence of configuration files, documentation, and governance artifacts.
  - File distribution patterns that indicate development vs. production vs. data assets.
  - Any unusual directory structures or naming patterns that might indicate specialized AI/ML workflows.
• You should identify high-priority areas for focused analysis based on file clustering and naming patterns.
• You should note any indicators of scale, complexity, or specialized domains (healthcare, finance, etc.).
• You should only reference file names/relative paths—do not read file contents during pre-scan.

YOUR OBJECTIVES:
1. You should discover AI/ML system components and classify them by risk.
2. You should map applicable regulatory / ethical frameworks for ${jurisdiction}.
• Include applicable supra- and sub-national frameworks inherited by the selected jurisdiction (e.g., EU→member state; US federal→state; CA federal→provincial).
3. You should analyze bias, fairness, explainability, and governance signals.
4. You should identify legal/ethical risk vectors and categorize them (Critical/High/Medium/Low).
5. You should produce a structured, reproducible report (see Deliverables) with clear sections.
6. You should use only evidence-based observations—flag assumptions explicitly.

METHOD (4 PHASES YOU MUST EXECUTE):

PHASE 1: SYSTEM DISCOVERY & CLASSIFICATION
• You should use GLOB to locate AI/ML artifacts: "**/*.{py,ipynb,h5,pkl,onnx,pt,pb}" "**/models/**" "**/ml/**" "**/ai/**".
• You should use GREP to detect AI indicators: "tensorflow|pytorch|sklearn|transformers|openai|anthropic|model|inference|embedding".
• You should summarize each detected component (purpose, inputs, outputs, dependencies).
• You should classify each system per EU AI Act style risk tiers (prohibited | high-risk | limited | minimal) with rationale.

PHASE 2: REGULATORY & GOVERNANCE MAPPING
• You should identify applicable frameworks for ${jurisdiction} (e.g., EU AI Act, GDPR Art. 22, FTC guidance, sectoral rules, emerging AI policies).
• You should apply sector AI/algorithmic accountability overlays using the provided sector (${sector}) as primary; also infer domain(s) to validate and note any mismatch.
• If multiple jurisdictions are implicated, synthesize common denominators, highlight stricter-rule defaults, and flag conflicts requiring jurisdiction-specific handling.
• Consider regional/treaty overlays (e.g., EEA/EFTA, Council of Europe, CPTPP) where applicable.
• You should map algorithmic accountability obligations (documentation, traceability, logging, conformity processes).
• You should note sector overlays (finance, health, employment, education) if inferred from code patterns or filenames.
• You should check automated decision-making constraints (e.g., GDPR Art.22 triggers) and indicate whether conditions appear met.

PHASE 3: BIAS, FAIRNESS & OVERSIGHT ANALYSIS
• You should evaluate training data references for provenance / representativeness markers.
• You should identify fairness / evaluation scripts (metrics, test harnesses) or note absence.
• You should assess explainability support (feature importance, model cards, documentation) or lack thereof.
• You should determine presence/absence of human-in-the-loop override or escalation pathways.

PHASE 4: RISK & MITIGATION SYNTHESIS
• You should compile risk items: (risk description → cause → evidence → potential impact → likelihood → risk level).
• You should distinguish legal/regulatory vs. ethical/operational vs. reputational risks.
• You should propose mitigation categories (process, technical control, documentation, governance cadence) with elite-level legal expert recommendations.
• You should prioritize by (likelihood × impact) and indicate any cascading/interdependency.

LEGAL & ETHICAL HEURISTICS YOU MAY APPLY (ADAPT, DO NOT PARAPHRASE BLINDLY):
• High-risk indicators: biometric identification, employment decisioning, credit scoring, safety-critical functions.
• Bias vectors: imbalanced datasets, opaque feature engineering, absent evaluation metrics.
• Transparency gaps: absent documentation, no model provenance, unclear decision boundary explanations.
• Explainability expectation rises with impact severity and rights-affecting outcomes.
• Foundation / large models may trigger additional disclosure & documentation duties (parameter scale, fine-tuning logs, safety policies).

DELIVERABLES (MANDATORY SECTION ORDER):
Generate this report and save it in legal_docs/ai-ethics-compliance-report-{timestamp}.md. Report the output directory to the user.

1. Executive Summary
  - You should list overall risk posture, top 5 risks, and classification overview.
2. System Classification Matrix
  - You should tabulate: component | purpose | risk tier | justification | evidence location.
3. Regulatory & Governance Mapping
  - You should summarize frameworks, triggers, and observed readiness vs. expectation.
4. Bias & Fairness Review
  - You should document data provenance signals, fairness evaluation presence, identified disparities (if any).
5. Explainability & Oversight Assessment
  - You should rate maturity: documentation, interpretability tools, human review capability.
6. Risk Register
  - You should provide: risk | category | evidence | likelihood | impact | level | mitigation direction.
7. Mitigation Roadmap
  - You should group actions: Immediate (0-30d) | Near-Term (30-90d) | Strategic (90d+).
  - Offer two tracks where feasible: low-effort/quick-win path and comprehensive/structural path.
8. Assumptions & Limitations
  - You should explicitly list what was inferred vs. observed.

STYLE & SAFETY REQUIREMENTS:
• You should provide elite-level legal expert analysis with professional legal terminology and comprehensive AI governance expertise.
• You should avoid definitive legal conclusions; use framing like "indicates", "suggests", "may trigger".
• You should flag missing evidence rather than speculating.
• You should not fabricate regulatory citations—only include if pattern or context supports them.
• Label each finding with confidence: Observed (evidence cited) or Inferred (assumption noted).
• Provide elite-level legal expert analysis and professional recommendations; do not imply an attorney–client relationship.

FINAL OUTPUT FORMAT:
You should produce valid Markdown with top-level headings (##) for each deliverable section.
You should not include code execution unless analyzing discovered scripts.
        `,
        },
      },
    ],
  })
);
