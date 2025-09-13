import { server } from "../server.js";
import { z } from "zod";

server.registerPrompt(
  "intellectual_property_and_oss_audit",
  {
    title: "Intellectual Property & OSS Audit",
    description:
      "Software IP ownership validation, OSS license compliance, and infringement risk review",
    argsSchema: {
      jurisdiction: z
        .string()
        .min(1, "Jurisdiction is required")
        .describe("Primary jurisdiction (US, EU, UK, CA, etc.)"),
      targetPath: z
        .string()
        .optional()
        .describe("Root path to analyze (defaults to workspace root)"),
      codeOwnershipModel: z
        .string()
        .optional()
        .describe("Ownership model: internal|outsourced|mixed"),
    },
  },
  ({ jurisdiction, targetPath, codeOwnershipModel }) => ({
    messages: [
      {
        role: "user",
        content: {
          type: "text",
          text: `You are to perform an intellectual property and open-source software compliance audit. You must provide elite-level legal expert analysis and follow the structured phases below.

CONTEXT INPUTS:
- Jurisdiction: ${jurisdiction} (Note: Include both national IP laws and inherited supranational frameworks applicable to this jurisdiction)
- Target Path: ${targetPath || "workspace root"}
- Code Ownership Model: ${codeOwnershipModel || "infer from repository signals"}

PRE-SCAN (RAPID CONTEXT PRIMING YOU MUST PERFORM BEFORE PHASE 1):
• You should obtain the complete tracked file listing using: git ls-files (no truncation) and count total files.
• You should analyze the codebase structure to understand:
  - Technology stack and dependency management approach.
  - Code organization patterns suggesting proprietary vs. third-party components.
  - Presence of licensing, attribution, and governance documentation.
  - Distribution of source code vs. binary artifacts.
  - Development workflow indicators (contributing guidelines, security policies, etc.).
• You should identify areas requiring focused IP analysis based on file clustering and naming conventions.
• You should note any indicators of code scale, external contributions, or specialized domains.
• You should only reference file names/relative paths—not file contents—in this pre-scan summary.

YOUR OBJECTIVES:
1. You should inventory proprietary, third-party, and AI-generated code artifacts.
2. You should enumerate and classify all dependency licenses (direct + transitive where detectable).
• Include applicable supra- and sub-national frameworks inherited by the selected jurisdiction (e.g., EU→member state; US federal→state; CA federal→provincial).
3. You should evaluate ownership chain integrity (contributors, assignments, provenance).
4. You should surface infringement and enforcement risk vectors (copyright, trademark, patent, trade secret).
5. You should prioritize remediation with rationale and categorize actions by urgency.

PHASE 1: CODE & IP ASSET INVENTORY
• You should use GLOB patterns: "**/*.{ts,js,py,go,rs,java,cs,rb,php,cpp,c,h,swift}".
• You should distinguish: proprietary source, third-party vendored code, generated output, AI-assisted code (look for model/tool comments or markers).
• You should map authorship signals: commit metadata, author emails, contribution density.
• You should flag potential AI-generated segments lacking provenance or license context.

PHASE 2: LICENSE ENUMERATION & CLASSIFICATION
• You should parse manifest/lock files (package.json, requirements.txt, go.mod, Cargo.toml, etc. if present) and list dependencies.
• You should classify each license: Permissive (MIT/Apache/BSD), Weak Copyleft (LGPL/MPL), Strong Copyleft (GPL/AGPL), Proprietary/Custom, Source-Available (SSPL/BUSL), Unknown.
• You should identify potential copyleft propagation points (static linking, derivative modification, combined works).
• You should verify attribution artifacts: LICENSE, NOTICE, headers; flag omissions.
• You should highlight conflicting/incompatible license combinations (e.g., AGPL inside proprietary core) if observed.

PHASE 3: OWNERSHIP & ASSIGNMENT CHAIN VALIDATION
• You should detect external contributor signatures (non-corporate emails) and volume.
• You should note absence of contributor license agreement (CLA) or Developer Certificate of Origin (DCO) indicators.
• You should flag risk if contractors / freelancers appear without assignment documentation references.
• You should inspect for potential contamination patterns (copy-pasted large blocks without attribution).
• You should evaluate AI-assisted code for provenance sufficiency (lack = tracking gap risk).

PHASE 4: INFRINGEMENT & ENFORCEMENT RISK ANALYSIS
• You should assess patent exposure vectors (novel algorithmic core routines; cryptography; ML optimizers) – mark as speculative if no patent scan evidence.
• You should review branding or naming for un-cleared third-party marks.
• You should identify possible copyright exposure (large uncredited blocks, license breaches, missing attribution obligations).
• You should evaluate trade secret hygiene: presence/absence of confidentiality markers, secret leakage patterns (keys, proprietary algorithms in public code), access control hints.

RISK HEURISTICS (APPLY JUDICIOUSLY):
• You should treat strong copyleft in distributed runtime path as at least High until cleared.
• You should treat unknown licenses as Medium escalating to High if widely used.
• You should treat missing provenance for large generated code sections as Medium IP uncertainty.
• You should treat absence of assignment chain for external contributors as High ownership risk.
• You should treat unreviewed transitive dependencies as potential latent license conflict (note as monitoring item).

DELIVERABLES (MANDATORY ORDER):
Generate this report and save it in legal_docs/ip-oss-audit-report-{timestamp}.md. Report the output directory to the user.

1. IP Asset Inventory
  - You should list: component | type (proprietary/third-party/generated/AI-assisted) | origin | notes.
2. License Compliance Matrix
  - You should list: dependency | version | license | classification | risk level | required action.
3. Ownership Chain Assessment
  - You should summarize gaps: (issue → evidence → impact → risk level → mitigation direction).
4. Infringement & Exposure Zones
  - You should categorize: patent | trademark | copyright | trade secret with brief rationale.
5. Remediation Roadmap
  - You should group actions: Immediate (0–30d) | Near-Term (30–90d) | Structural (90d+).
6. Assumptions & Limitations
  - You should list any inferred license or provenance elements lacking explicit evidence.

STYLE & SAFETY:
• You should provide elite-level legal expert analysis with comprehensive legal reasoning and actionable recommendations.
• You should not fabricate license identifiers; mark as "Unknown" if not discoverable.
        `,
        },
      },
    ],
  })
);
