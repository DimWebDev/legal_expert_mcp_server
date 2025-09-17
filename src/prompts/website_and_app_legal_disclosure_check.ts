import { server } from "../server.js";
import { z } from "zod";

server.registerPrompt(
  "website_and_app_legal_disclosure_check",
  {
    title: "website_&_app_legal_disclosure_check",
    description:
      "Audit of mandatory and best-practice legal disclosures for digital products",
    argsSchema: {
      jurisdiction: z
        .string()
        .min(1, "Jurisdiction is required")
        .describe(
          "Primary user market jurisdiction (US, EU, UK, CA, AU, etc.)"
        ),
      sector: z
        .string()
        .min(1, "Sector is required")
        .describe(
          "Business sector: fintech|healthtech|edtech|ecommerce|saas|marketplace|ai-ml (used as primary; inference validates only)"
        ),
      targetPath: z
        .string()
        .optional()
        .describe(
          "Root path for scanning content/templates (defaults to workspace root)"
        ),
      productType: z
        .string()
        .optional()
        .describe("Product type: web|mobile|hybrid|api-platform"),
    },
  },
  ({ jurisdiction, sector, targetPath, productType }) => ({
    messages: [
      {
        role: "user",
        content: {
          type: "text",
          text: `You are to perform a website & app legal disclosure audit for the digital product. You must inventory required disclosures, evaluate adequacy, identify risks.

CONTEXT INPUTS:
- Jurisdiction: ${jurisdiction} (Note: Include both national disclosure requirements and inherited supranational frameworks applicable to this jurisdiction)
- Sector: ${sector} (Use as primary for sector-specific disclosure overlays; infer domain(s) to validate and flag mismatch.)
- Target Path: ${targetPath || "workspace root"}
- Product Type: ${productType || "infer from repository structure"}

PRE-SCAN (RAPID CONTEXT PRIMING YOU MUST PERFORM BEFORE PHASE 1):
• You should run an equivalent of: git ls-files (no truncation).
• You should analyze the codebase structure to understand:
  - User-facing components and content organization.
  - Internationalization and localization patterns.
  - Legal and policy document placement and naming conventions.
  - Version control and update mechanisms for legal content.
  - Evidence of user interaction flows and consent mechanisms.
• You should identify areas likely requiring legal disclosures based on user-facing features and data handling.
• You should NOT read file contents in pre-scan; file names / relative paths only.

YOUR OBJECTIVES:
1. You should discover existing legal/policy documents and disclosure surfaces.
2. You should evaluate presence and completeness of mandatory and best-practice disclosures for ${jurisdiction}.
• Include applicable supra- and sub-national frameworks inherited by the selected jurisdiction (e.g., EU→member state; US federal→state; CA federal→provincial).
3. You should identify placement, consistency, and versioning gaps.
4. You should surface risk indicators (misleading claims, missing rights mechanisms, dark patterns).
5. You should propose a standardized disclosure architecture and remediation sequencing.

PHASE 1: DISCLOSURE SURFACE DISCOVERY
• You should use GLOB: "**/*{terms,privacy,cookie,legal,imprint,contact,policy,disclaimer,accessibility}*".
• You should map references in footers, navigation, onboarding modals, account settings, consent banners.
• You should detect localization or region-specific variants (language folders, i18n keys).
• You should build an inventory: document | path | link presence | revision marker (date/version) | notes.

PHASE 2: REQUIREMENT COVERAGE EVALUATION
• You should assess privacy policy elements: data types, purposes, sharing, rights, retention, transfers, contact, complaints recourse.
• If multiple jurisdictions are implicated, synthesize common denominators, highlight stricter-rule defaults, and flag conflicts requiring jurisdiction-specific handling.
• Consider regional/treaty overlays (e.g., EEA/EFTA, Council of Europe, CPTPP) where applicable.
• You should assess terms of service enforceability: acceptance mechanism (clickwrap vs browse), modification clause clarity, governing law, dispute method.
• You should evaluate cookie / tracking notice: banner existence, preference management, consent logging reference, categorization of cookies.
• You should check jurisdiction-specific identity/imprint requirements (e.g., EU/DE mandatory business information blocks).
• You should examine e-commerce consumer disclosures (refunds/withdrawal rights, delivery expectations, pricing transparency, tax/fee clarity) if applicable.
• You should note presence/absence of accessibility statement or baseline claims.

PHASE 3: RISK & DEFICIENCY ANALYSIS
• You should apply sector-specific disclosure overlays using the provided sector (${sector}) as primary; also infer domain(s) to validate and note mismatch.
• You should identify inconsistent wording across locales or pages.
• You should flag outdated or missing "Last Updated" indicators.
• You should detect overbroad disclaimers or unenforceable liability waivers (note as potential enforceability risk—not legal conclusion).
• You should cross-check claimed user rights vs. implementation signals (e.g., offering deletion with no route/mechanism).
• You should identify dark pattern indicators (pre-ticked boxes, hidden cancel links, confusing consent layering).

PHASE 4: REMEDIATION & STANDARDIZATION PLAN
• You should propose placement hierarchy (global footer, primary navigation, account settings, onboarding gating steps).
• You should recommend versioning model (version number + date + changelog excerpt).
• You should suggest layered disclosure strategy (summary → detailed sections) for privacy & cookies.
• You should propose governance cadence (review frequency, triggers for update, ownership roles placeholder).

RISK HEURISTICS (APPLY CAREFULLY):
• You should treat missing privacy or terms document as Critical.
• You should treat absence of cookie consent where required as High.
• You should treat rights claims without mechanism as High.
• You should treat outdated timestamps (>12 months stale) as Medium (unless regulatory shift = escalate).
• You should treat minor stylistic inconsistencies as Low.

DELIVERABLES (MANDATORY ORDER):
Generate this report and save it in legal_docs/website-app-disclosure-check-report-{timestamp}.md. Report the output directory to the user.

1. Disclosure Inventory
  - You should list: document | location(s) | status | revision marker | risk level.
2. Coverage Gap Matrix
  - You should map: requirement | present? | quality (Sufficient/Partial/Missing) | risk | notes.
3. Risk Findings
  - You should provide structured entries: issue | evidence | potential impact | risk level | remediation direction.
4. Remediation Blueprint
  - You should group quick wins vs structural changes vs governance improvements.
  - Offer two tracks where feasible: low-effort/quick-win path and comprehensive/structural path.
5. Standardized Architecture Proposal
  - You should outline placement hierarchy + versioning + governance cadence.
6. Assumptions & Limitations
  - You should list missing evidence or inferred determinations.

STYLE & SAFETY:
• You should provide elite-level legal expert analysis with comprehensive disclosure law expertise and professional legal recommendations.
• You should avoid definitive enforceability judgments—frame as potential risk.
• Label each finding with confidence: Observed (evidence cited) or Inferred (assumption noted).
• Provide elite-level legal expert analysis and professional recommendations.
        `,
        },
      },
    ],
  })
);
