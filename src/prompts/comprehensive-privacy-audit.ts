import { server } from "../server.js";
import { z } from "zod";

server.registerPrompt(
  "comprehensive-privacy-audit",
  {
    title: "Comprehensive Privacy Compliance Audit",
    description:
      "End-to-end privacy law compliance review with data flow mapping and gap analysis",
    argsSchema: {
      jurisdiction: z
        .string()
        .describe("Primary jurisdiction (EU, US-CA, CA, UK, US-VA, etc.)"),
      regulations: z
        .string()
        .optional()
        .describe("Comma-separated list (GDPR, CCPA, PIPEDA, UK-GDPR, LGPD)"),
      targetPath: z
        .string()
        .optional()
        .describe(
          "Root directory to scope analysis (defaults to workspace root)"
        ),
    },
  },
  async ({ jurisdiction, regulations, targetPath }) => ({
    messages: [
      {
        role: "user",
        content: {
          type: "text",
          text: `You are to perform a comprehensive privacy compliance audit. You must follow the prescribed phased methodology, remain evidence-based, and avoid giving legal advice—only an informational compliance mapping and structured gap assessment.

CONTEXT INPUTS:
- Jurisdiction: ${jurisdiction}
- Declared / Applicable Regulations: ${regulations || "infer from jurisdiction"}
- Target Path: ${targetPath || "workspace root"}

PRE-SCAN (RAPID CONTEXT PRIMING YOU MUST PERFORM BEFORE PHASE 1):
• You should run an equivalent of: git ls-files (no truncation).
• You should analyze the codebase structure to understand:
  - Primary data handling patterns and technologies used.
  - Directory organization suggesting data flows (collection, processing, storage, transfer).
  - Presence of policy, consent, and rights management artifacts.
  - Configuration files indicating data categories and processing activities.
  - Third-party integrations that might involve data sharing or processing.
• You should identify areas likely to contain personal data processing based on naming patterns and file clustering.
• You should note any indicators of data scale, user-facing features, or international operations.
• You should not read contents during pre-scan—only list relative paths.

YOUR OBJECTIVES:
1. You should discover and map personal data lifecycle (collection → processing → storage → transfer → retention → deletion).
2. You should identify applicable regulatory obligations for ${jurisdiction} and the declared regulations set.
3. You should evaluate implementation of consent, lawful bases, rights handling, transparency, security, and retention.
4. You should classify gaps by risk level (Critical/High/Medium/Low) with concise rationale.
5. You should produce a structured markdown report in the mandated section order.
6. You should explicitly list assumptions where evidence is absent.

PHASE 1: DATA DISCOVERY & MAPPING (YOU MUST EXECUTE)
• You should use GLOB to locate relevant files: "**/*.{ts,js,py,go,json,yml,yaml,md,sql}".
• You should use GREP to detect data indicators: "email|phone|ip[_-]?address|cookie|session|user(_|-)id|consent|tracking|analytics|retention|erase|export".
• You should map: data categories, collection points (API endpoints, forms, services), storage backends, third-party processors, and outbound transfers.
• You should identify potential cross-border transfer vectors (CDN, logging, analytics, API calls).
• You should capture retention or deletion logic (cron jobs, lifecycle configs) or note absence.

PHASE 2: OBLIGATIONS & CONTROL ANALYSIS
• You should enumerate key obligations relevant to ${jurisdiction} (e.g., GDPR core principles, CCPA consumer rights, UK-GDPR continuity, LGPD overlaps).
• You should determine lawful bases used or implied (consent, contract, legitimate interests, legal obligation, vital interests, public task) and note unclear bases.
• You should check consent flows (granularity, revocation path, logging) and rights handling pathways (DSAR intake, verification, fulfillment steps).
• You should examine special category / sensitive data indicators and flag DPIA (impact assessment) trigger candidates.
• You should verify cross-border transfer safeguards (SCC references, adequacy statements) or flag missing.

PHASE 3: POLICY, DISCLOSURE & TRANSPARENCY REVIEW
• You should compare discovered privacy policy content vs. baseline elements (collection purposes, categories, sharing, rights, retention, contact, transfer bases, complaints channel).
• You should evaluate cookie / tracking consent model (banner, preferences, logging) for ${jurisdiction} baseline (opt-in vs. opt-out expectations).
• You should check presence of data retention schedules, minimization statements, and user choice mechanisms.
• You should note any mismatch between implemented flows and published statements.

PHASE 4: GAP CLASSIFICATION & REMEDIATION PRIORITIZATION
• You should create a gap list: (area → observed issue → regulatory principle impacted → risk level → rationale → suggested remediation direction).
• You should assign risk level: Critical (immediate regulatory exposure), High (material deficiency), Medium (maturity gap), Low (optimization / hygiene).
• You should propose remediation sequencing: Immediate (0–30d), Near-Term (30–90d), Strategic (90d+).

LEGAL & OPERATIONAL HEURISTICS (APPLY JUDICIOUSLY):
• You should treat unexplained processing of personal data as at least Medium risk.
• You should escalate cross-border transfers without safeguards to High/Critical depending on volume/sensitivity.
• You should treat absent deletion or retention logic as High if personal data persists indefinitely.
• You should flag consent constructs that are bundled or non-revocable.
• You should consider legitimate interest claims weak if no balancing context appears.

DELIVERABLES (MANDATORY ORDER):
1. Executive Summary
  - You should present overall compliance posture, top 5 gaps, and general risk profile.
2. Data Inventory Matrix
  - You should table: data category | source | purpose | storage | transfers | retention | deletion mechanism (or "none observed").
3. Rights & Lawful Basis Assessment
  - You should evaluate each right (access, rectification, erasure, restriction, portability, objection) and basis clarity.
4. Policy & Disclosure Evaluation
  - You should list policy elements present vs. missing / deficient.
5. Gap Analysis
  - You should provide structured entries with risk level and rationale.
6. Remediation Roadmap
  - You should allocate actions to Immediate / Near-Term / Strategic with outcome focus.
7. Assumptions & Limitations
  - You should enumerate missing evidence areas and inferred interpretations.

STYLE & SAFETY:
• You should use neutral, factual language ("Observed", "Missing", "Likely", "Potential").
• You should not quote statutes unless inference is strongly grounded.
• You should avoid definitive legal conclusions; frame as informational mapping.
• You should end with: "Informational privacy compliance mapping – not legal advice."`,
        },
      },
    ],
  })
);
