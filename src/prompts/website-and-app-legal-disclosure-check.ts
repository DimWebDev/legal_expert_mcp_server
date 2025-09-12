import { server } from "../server.js";
import { z } from "zod";

server.registerPrompt(
  "website-and-app-legal-disclosure-check",
  {
    title: "Website & App Legal Disclosure Check",
    description:
      "Audit of mandatory and best-practice legal disclosures for digital products",
    argsSchema: {
      jurisdiction: z
        .string()
        .describe(
          "Primary user market jurisdiction (US, EU, UK, CA, AU, etc.)"
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
  async ({ jurisdiction, targetPath, productType }) => ({
    messages: [
      {
        role: "user",
        content: {
          type: "text",
          text: `You are to perform a website & app legal disclosure audit for the digital product. You must inventory required disclosures, evaluate adequacy, identify risks, and produce an informational gap analysis—not legal advice.

CONTEXT INPUTS:
- Jurisdiction: ${jurisdiction}
- Target Path: ${targetPath || "workspace root"}
- Product Type: ${productType || "infer from repository structure"}

PRE-SCAN (RAPID FILE INDEX YOU MUST PERFORM BEFORE PHASE 1):
• You should run an equivalent of: git ls-files (no truncation).
• You should identify and list:
  - All legal / policy doc candidates (terms, privacy, cookie, imprint, legal, disclaimer, accessibility, rights) – list every occurrence.
  - All localization / i18n structure (presence of i18n/, locales/, lang/ directories) – list all directories.
  - All template / component directories likely hosting footer or navigation (components, layouts, ui, app, pages) – list all with representative subpaths.
  - All evidence of version markers (files whose names or contents imply date/version—list all filenames containing YYYY or version patterns like v1, v2).
  - Missing baseline doc signals (explicitly state if no privacy/terms/cookie file detected in listing scope).
• You should NOT read file contents in pre-scan; file names / relative paths only.

YOUR OBJECTIVES:
1. You should discover existing legal/policy documents and disclosure surfaces.
2. You should evaluate presence and completeness of mandatory and best-practice disclosures for ${jurisdiction}.
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
• You should assess terms of service enforceability: acceptance mechanism (clickwrap vs browse), modification clause clarity, governing law, dispute method.
• You should evaluate cookie / tracking notice: banner existence, preference management, consent logging reference, categorization of cookies.
• You should check jurisdiction-specific identity/imprint requirements (e.g., EU/DE mandatory business information blocks).
• You should examine e-commerce consumer disclosures (refunds/withdrawal rights, delivery expectations, pricing transparency, tax/fee clarity) if applicable.
• You should note presence/absence of accessibility statement or baseline claims.

PHASE 3: RISK & DEFICIENCY ANALYSIS
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
1. Disclosure Inventory
  - You should list: document | location(s) | status | revision marker | risk level.
2. Coverage Gap Matrix
  - You should map: requirement | present? | quality (Sufficient/Partial/Missing) | risk | notes.
3. Risk Findings
  - You should provide structured entries: issue | evidence | potential impact | risk level | remediation direction.
4. Remediation Blueprint
  - You should group quick wins vs structural changes vs governance improvements.
5. Standardized Architecture Proposal
  - You should outline placement hierarchy + versioning + governance cadence.
6. Assumptions & Limitations
  - You should list missing evidence or inferred determinations.

STYLE & SAFETY:
• You should remain neutral and evidence-based.
• You should avoid definitive enforceability judgments—frame as potential risk.
• You should end with: "Informational disclosure compliance mapping – not legal advice."`,
        },
      },
    ],
  })
);
