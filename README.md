# Legal Expert MCP Server

> DISCLAIMER (READ FIRST)
>
> This Model Context Protocol (MCP) server produces _informational_ analyses only. It does **not** constitute legal advice, does **not** create an attorney–client relationship, and may contain errors or omissions. Large Language Models (LLMs) can hallucinate or misinterpret context. You (the user) are solely responsible for validating outputs before relying on them. The author(s) of this project assume **no liability** for any legal, regulatory, commercial, or compliance consequences arising from use of the generated reports.

---

## What This Is

A modular, high-signal **Legal Expert MCP Server** that provides structured, methodology‑driven prompt endpoints for rapid legal/compliance landscape mapping, gap discovery, and risk prioritization across privacy, IP, AI governance, security, consumer, and disclosure domains.

## Core Benefits

- **Adaptable to any repository / product context** via argument-driven scoping (jurisdiction, sector, model type, targetPath, risk domains, etc.)
- **Phased methodologies** that produce reproducible, timestamped Markdown reports in `legal_docs/`
- **Non-prescriptive framing**: identifies evidence-based gaps & risk vectors without generating normative legal advice
- **Composable sequencing**: run discovery → domain audits → consolidation (risk-analysis-framework)
- **Audit traceability**: consistent section ordering & explicit assumptions surfaces maturity over time

## When To Use Which Prompt

| Stage                               | Recommended Prompts                                                              |
| ----------------------------------- | -------------------------------------------------------------------------------- |
| Initial mapping / greenfield        | `legal-landscape-discovery`                                                      |
| Data-heavy / personal data handling | `comprehensive-privacy-audit`                                                    |
| AI / model artifacts appear         | `ai-ethics-and-compliance-scan`                                                  |
| OSS / licensing maturity check      | `intellectual-property-and-oss-audit`                                            |
| Commercial launch readiness         | `market-and-customer-compliance-audit`, `website-and-app-legal-disclosure-check` |
| Security posture vs legal duties    | `security-legal-alignment-check`                                                 |
| Consolidate multi‑audit outputs     | `risk-analysis-framework`                                                        |
| Explore what's available            | `legal-expert-prompts-catalog`                                                   |

## Prompts & Arguments (Adaptability Matrix)

Below each prompt lists **Required** and **Optional** arguments you can pass to tailor scope and depth.

### 1. legal-landscape-discovery

- Required: `jurisdiction`, `sector`
- Optional: `businessModel`, `targetPath`
- Purpose: Baseline cross-domain legal framework & guardrail mapping for a product/company context.

### 2. risk-analysis-framework

- Required: (none)
- Optional: `jurisdiction`, `businessContext`, `riskDomains`, `findings`
- Purpose: Normalize & prioritize risks (probability × impact) after audits or inferred signals.

### 3. comprehensive-privacy-audit

- Required: `jurisdiction`
- Optional: `regulations`, `targetPath`
- Purpose: Data lifecycle mapping, obligations coverage, and risk-based privacy gap analysis.

### 4. website-and-app-legal-disclosure-check

- Required: `jurisdiction`
- Optional: `targetPath`, `productType`
- Purpose: Inventory, adequacy & gap analysis of user-facing legal/policy disclosures.

### 5. security-legal-alignment-check

- Required: (none)
- Optional: `jurisdiction`, `targetPath`, `securityFrameworks`
- Purpose: Map implemented security controls to legal/regulatory expectation areas.

### 6. ai-ethics-and-compliance-scan

- Required: `jurisdiction`
- Optional: `aiModelType`, `targetPath`, `riskLevel`
- Purpose: AI/ML system classification, governance signals, risk tiering & mitigation direction.

### 7. intellectual-property-and-oss-audit

- Required: `jurisdiction`
- Optional: `targetPath`, `codeOwnershipModel`
- Purpose: Ownership chain integrity, OSS license classification, infringement & provenance risk.

### 8. market-and-customer-compliance-audit

- Required: `jurisdiction`
- Optional: `businessModel`, `targetPath`, `paymentProvider`
- Purpose: Consumer-facing lifecycle fairness, pricing clarity, marketing representation risk.

### 9. legal-expert-prompts-catalog

- Required: (none)
- Optional: `category`
- Purpose: Introspect & filter available prompts plus usage guidance.

## Output Conventions

- Each prompt writes a timestamped Markdown report under `legal_docs/` (folder created automatically if needed)
- File naming pattern: `<domain>-<descriptor>-report-YYYYMMDD-HHMMSS.md`
- Sections follow fixed ordering for comparability over time
- Gaps highlight: (issue → evidence/assumption → impact/risk → remediation direction)

## How It Works (Architecture)

- Built on the **Model Context Protocol** using `@modelcontextprotocol/sdk`
- All prompts register with a central `McpServer` (`src/server.ts`)
- Each prompt defines a Zod `argsSchema` for validation & adaptability
- Prompts produce structured `messages` consumed by the connected LLM through an MCP-compatible client
- Adaptability is achieved by parameterizing jurisdiction, scope, model type, risk domains, ownership model, etc.—you tailor insights without editing code

## Quick Start

```bash
# Clone
git clone https://github.com/yourusername/legal-expert-mcp-server.git
cd legal-expert-mcp-server

# Install deps
npm install

# Build
npm run build

# Run (stdio mode)
node dist/index.js
# or (if installed globally or via npx)
npx legal-expert-mcp-server
```

### Use With an MCP Client

Add an entry similar to (example pseudo-config):

```jsonc
{
  "mcpServers": {
    "legal-expert": {
      "command": "node",
      "args": ["/absolute/path/to/legal_expert_mcp_server/dist/index.js"],
      "env": {}
    }
  }
}
```

Then invoke a tool/prompt (client UX varies). Example invocation conceptually:

```
prompt: ai-ethics-and-compliance-scan
args: { "jurisdiction": "EU", "aiModelType": "LLM" }
```

## Example Workflow

1. Run `legal-landscape-discovery` (jurisdiction + sector) for baseline context.
2. Run domain audits: privacy → IP/OSS → disclosures → security.
3. Consolidate into `risk-analysis-framework` (feed findings as comma-separated seed if desired).
4. Re-run selective audits after remediation to track maturity deltas.

## Adaptability Patterns

| Argument                   | Adaptation Effect                                           |
| -------------------------- | ----------------------------------------------------------- |
| `targetPath`               | Restricts scan scope to a sub-tree (e.g., monorepo service) |
| `jurisdiction`             | Adjusts framework mapping & risk heuristics framing         |
| `sector` / `businessModel` | Tunes sector overlays & operational assumptions             |
| `aiModelType`              | Tailors AI risk taxonomy & governance expectations          |
| `riskDomains`              | Narrows risk register synthesis to relevant clusters        |
| `codeOwnershipModel`       | Influences IP provenance risk heuristics                    |
| `securityFrameworks`       | Anchors control alignment narrative                         |

## Reliability & Limitations

- LLM outputs are **probabilistic**; hallucinations, misclassification, and over‑generalization can occur
- Framework applicability is **context-dependent**; always validate with qualified counsel before action
- Absence of evidence ≠ evidence of absence (especially for private artifacts not in repo)
- Regulatory landscapes evolve—re-run periodically for freshness

## Safety & Review Checklist

Before relying on a report:

- [ ] Validate high-risk claims against actual code/policies
- [ ] Confirm no sensitive/internal-only data was inadvertently summarized
- [ ] Escalate Critical / High items to qualified professionals
- [ ] Document which recommendations you accepted/deferred

## Contributing

Pull requests to add new prompt modules or improve taxonomies welcome. Keep:

- Clear section ordering
- Zod schemas explicit & minimal
- Non-prescriptive, informational tone

## License

MIT – see `LICENSE`.

## Attribution

Designed for structured legal/compliance surface mapping in developer workflows.

---

**Reminder:** This system is a _decision support lens_, not a substitute for professional legal judgment.
