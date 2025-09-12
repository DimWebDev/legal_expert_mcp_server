import { server } from "../server.js";
import { z } from "zod";

server.registerPrompt(
  "security-legal-alignment-check",
  {
    title: "Security & Legal Alignment Check",
    description:
      "Evaluate alignment between security controls and legal/compliance obligations",
    argsSchema: {
      jurisdiction: z
        .string()
        .optional()
        .describe(
          "Primary jurisdiction (affects breach, notification, and retention obligations)"
        ),
      targetPath: z
        .string()
        .optional()
        .describe("Root path to analyze (defaults to workspace root)"),
      securityFrameworks: z
        .string()
        .optional()
        .describe("Declared frameworks: ISO27001|NIST-CSF|SOC2|CIS|Custom"),
    },
  },
  async ({ jurisdiction, targetPath, securityFrameworks }) => ({
    messages: [
      {
        role: "user",
        content: {
          type: "text",
          text: `You are to perform a security & legal alignment assessment. You must map implemented security controls to legal, regulatory, and contractual obligations for ${
            jurisdiction || "multi-jurisdiction"
          }. Provide an informational alignment report—not legal advice.

CONTEXT INPUTS:
- Jurisdiction Scope: ${jurisdiction || "multi-jurisdiction"}
- Target Path: ${targetPath || "workspace root"}
- Declared Frameworks: ${securityFrameworks || "infer from artifacts"}

PRE-SCAN (RAPID FILE INDEX YOU MUST PERFORM BEFORE PHASE 1):
• You should run an equivalent of: git ls-files (no truncation).
• You should derive signals for security/control artifacts:
  - All config / policy / infra directories (security, policies, config, infra, terraform, k8s, helm, deploy, ops).
  - All files containing likely control keywords in filename: auth, access, encrypt, key, secret, token, log, monitor, alert, backup, retention, incident, breach.
  - All SECURITY.md, incident response docs, runbooks (incident, response, playbook).
  - All infrastructure-as-code file presence counts (*.tf, *.yaml, *.yml, Dockerfile, docker-compose, *.json policy docs).
  - All potential secret exposure filenames (.env, secrets, key, cert) – list every occurrence (relative path).
• You should not read file contents during pre-scan—only list relative paths / aggregated counts.

YOUR OBJECTIVES:
1. You should inventory core security controls (authn, authz, encryption, logging, monitoring, retention, incident response).
2. You should identify legal/regulatory obligations likely applicable (privacy breach, retention, notification timelines, contractual commitments).
3. You should evaluate maturity (Declared vs. Implemented vs. Evidenced).
4. You should surface high-risk misalignments and prioritize remediation.
5. You should produce structured deliverables with explicit evidence references or labeled gaps.

PHASE 1: CONTROL DISCOVERY
• You should use GLOB: "**/*{security,policy,encrypt,auth,access,iam,logging,monitoring,retention,secrets,key}*".
• You should map implementations: authentication (methods/factors), authorization (role model), encryption (at rest / in transit), logging (scope, retention), key management (rotation, storage), secrets handling (env files, vaults), monitoring (alerts, SIEM signals), backup & recovery, data retention / deletion automations.
• You should identify infrastructure-as-code or policy-as-code definitions that enforce controls.

PHASE 2: OBLIGATION MAPPING
• You should list potential legal obligations (e.g., breach notification timelines, data minimization, secure disposal, access control principles, audit logging sufficiency).
• You should align retention / deletion with privacy-law implied expectations (data limited to purpose & timeframe).
• You should identify contractual artifacts references (DPA, SCC references, BAA, customer security addenda) if any appear.
• You should map incident response decision points to regulatory escalation triggers (internal detection → assessment → notification threshold).

PHASE 3: MATURITY & GAP ANALYSIS
• You should assess each control dimension: Declared (policy exists) | Implemented (mechanism present) | Evidenced (proof/logs/automation) | Missing.
• You should evaluate prevention vs detection vs response balance.
• You should identify third-party/vendor dependencies and oversight gaps.
• You should tag each gap with probable impact (forensic defensibility, notification delay, confidentiality breach amplification, retention liability).

PHASE 4: ALIGNMENT & REMEDIATION PRIORITIZATION
• You should prioritize gaps by (exploitability × legal consequence × detection lag).
• You should define layered improvements: Quick Wins (config/policy hygiene), Structural (architecture / process), Governance (review cadence, roles).
• You should recommend escalation matrix refinement (severity tier → legal/exec notification path).
• You should propose continuous assurance schedule (control revalidation intervals, log integrity review, key rotation cadence).

RISK HEURISTICS (APPLY CAREFULLY):
• You should treat missing encryption at rest for sensitive data as High/Critical.
• You should treat absence of audit logging for auth events as High.
• You should treat over-retention with no documented basis as High regulatory + breach amplification risk.
• You should treat unmanaged secrets (plaintext in repo) as Critical.
• You should treat absence of incident classification criteria as Medium escalating to High if also no notification mapping.

DELIVERABLES (MANDATORY ORDER):
1. Security Control Inventory
  - You should table: control | implementation summary | evidence reference | maturity state.
2. Legal & Obligation Mapping
  - You should map: obligation | related control(s) | current state | gap | priority.
3. Maturity & Alignment Assessment
  - You should synthesize strengths, systemic weaknesses, and balance evaluation.
4. High-Risk Exposure Analysis
  - You should outline scenarios: (failure mode → amplified legal/reg impact → recommended mitigation theme).
5. Remediation Roadmap
  - You should group tasks: Immediate (0–30d) | Near-Term (30–90d) | Strategic (90d+).
6. Assumptions & Limitations
  - You should list missing artifacts or inferred implementations.

STYLE & SAFETY:
• You should avoid legal conclusions—use phrasing like "may increase exposure" / "suggests misalignment".
• You should remain evidence-focused; mark uncertain items explicitly.
• You should end with: "Informational security & legal alignment mapping – not legal advice."`,
        },
      },
    ],
  })
);
