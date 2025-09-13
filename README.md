# Legal Expert MCP Server

> [!WARNING]
> This Legal Expert Model Context Protocol (MCP) server produces _informational_ analyses only. It does **not** constitute legal advice, does **not** create an attorney–client relationship, and may contain errors or omissions. Large Language Models (LLMs) can hallucinate or misinterpret context. You (the user) are solely responsible for validating outputs before relying on them. The author(s) of this project assume **no liability** for any legal, regulatory, commercial, or compliance consequences arising from use of the generated reports.

## Table of Contents

- [What This Is](#what-this-is)
- [Core Benefits](#core-benefits)
- [When To Use Which Prompt](#when-to-use-which-prompt)
- [Prompts & Arguments (Adaptability Matrix)](#prompts--arguments-adaptability-matrix)
  - [1. legal-landscape-discovery](#1-legal-landscape-discovery)
  - [2. risk-analysis-framework](#2-risk-analysis-framework)
  - [3. comprehensive-privacy-audit](#3-comprehensive-privacy-audit)
  - [4. website-and-app-legal-disclosure-check](#4-website-and-app-legal-disclosure-check)
  - [5. security-legal-alignment-check](#5-security-legal-alignment-check)
  - [6. ai-ethics-and-compliance-scan](#6-ai-ethics-and-compliance-scan)
  - [7. intellectual-property-and-oss-audit](#7-intellectual-property-and-oss-audit)
  - [8. market-and-customer-compliance-audit](#8-market-and-customer-compliance-audit)
  - [9. legal-expert-prompts-catalog](#9-legal-expert-prompts-catalog)
- [How to Use Them](#how-to-use-them)
- [Output Conventions](#output-conventions)
- [How It Works (Architecture)](#how-it-works-architecture)
- [Quick Start Local MCP Server](#quick-start)
  - [Use With an MCP Client](#use-with-an-mcp-client)
- [Example Workflow](#example-workflow)
- [Adaptability Patterns](#adaptability-patterns)
- [Reliability & Limitations](#reliability--limitations)
- [Safety & Review Checklist](#safety--review-checklist)
- [Installation & Configuration](#installation--configuration)
  - [Claude Code](#claude-code)
  - [VS Code](#vs-code)
  - [Cursor](#cursor)
  - [Verification](#verification)

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

- Required: `jurisdiction`, `sector`
- Optional: `regulations`, `targetPath`
- Purpose: Data lifecycle mapping, obligations coverage, and risk-based privacy gap analysis.

### 4. website-and-app-legal-disclosure-check

- Required: `jurisdiction`
- Optional: `targetPath`, `productType`
- Purpose: Inventory, adequacy & gap analysis of user-facing legal/policy disclosures.

### 5. security-legal-alignment-check

- Required: `jurisdiction`, `sector`
- Optional: `targetPath`, `securityFrameworks`
- Purpose: Map implemented security controls to legal/regulatory expectation areas.

### 6. ai-ethics-and-compliance-scan

- Required: `jurisdiction`, `sector`
- Optional: `aiModelType`, `targetPath`, `riskLevel`
- Purpose: AI/ML system classification, governance signals, risk tiering & mitigation direction.

### 7. intellectual-property-and-oss-audit

- Required: `jurisdiction`
- Optional: `targetPath`, `codeOwnershipModel`
- Purpose: Ownership chain integrity, OSS license classification, infringement & provenance risk.

### 8. market-and-customer-compliance-audit

- Required: `jurisdiction`, `sector`
- Optional: `businessModel`, `targetPath`, `paymentProvider`
- Purpose: Consumer-facing lifecycle fairness, pricing clarity, marketing representation risk.

### 9. legal-expert-prompts-catalog

- Required: (none)
- Optional: `category`
- Purpose: Introspect & filter available prompts plus usage guidance.

## How to Use Them

In Claude Code, VS Code, and Cursor, these prompts are available as slash commands. When you invoke a prompt using its slash command (e.g., `/legal-landscape-discovery`), the system will interactively prompt you to provide the required and optional arguments for that prompt.

**Claude Code** enforces each prompt's **argsSchema** by interactively collecting required arguments before execution. When you type a slash command for an MCP prompt that has mandatory parameters, Claude Code will:

1. Display an inline form listing all **required** arguments first (marked with a red asterisk) followed by any **optional** arguments.
2. Prevent execution until every required field has been filled. Leaving a required field blank shows a validation error.
3. Automatically insert your responses into the prompt's JSON payload once you confirm, then dispatch the MCP request to your configured server.

**VS Code and Cursor** similarly prompt for arguments interactively, ensuring required arguments must be provided to proceed, while optional ones can be left blank if not applicable to your context.

For example:

- `/legal-landscape-discovery` prompts for `jurisdiction` and `sector` (required), optionally `businessModel` and `targetPath`.
- `/comprehensive-privacy-audit` prompts for `jurisdiction` and `sector` (required), optionally `regulations` and `targetPath`.
- `/ai-ethics-and-compliance-scan` prompts for `jurisdiction` and `sector` (required), optionally `aiModelType`, `targetPath`, `riskLevel`.
- `/security-legal-alignment-check` prompts for `jurisdiction` and `sector` (required), optionally `securityFrameworks`, `targetPath`.
- `/market-and-customer-compliance-audit` prompts for `jurisdiction` and `sector` (required), optionally `businessModel`, `paymentProvider`, `targetPath`.

This interactive prompting ensures that each analysis is tailored to your specific legal, jurisdictional, and product context across all supported MCP clients.

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
      "env": {},
    },
  },
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

Based on my research of the official Anthropic documentation and various setup guides, here's a comprehensive section you

## Installation & Configuration

### Claude Code

To add the Legal Expert MCP Server to Claude Code, use the command line interface:

```bash
# Basic installation using npx inside a directory
claude mcp add legal-expert npx legal-expert-mcp-server


# For user-wide availability
claude mcp add legal-expert --scope user npx  legal-expert-mcp-server
```

### VS Code

VS Code supports MCP servers through GitHub Copilot's agent mode:

1. **Create Workspace Configuration**
   Create a `.vscode/mcp.json` file in your project:

   ```json
   {
     "servers": {
       "legal-expert": {
         "type": "stdio",
         "command": "npx",
         "args": ["-y", "legal-expert-mcp-server"]
       }
     }
   }
   ```

### Cursor

Cursor provides multiple configuration options for MCP servers:

#### Option 1: Using Cursor Settings UI

1. **Open Cursor Settings**
   - Use `Ctrl+Shift+P` and search for "cursor settings"
   - Navigate to **Tools & Integrations** → **MCP**
   - Click **"+ Add New MCP Server"** or **"New MCP Server"**

2. **Configure Server**
   - **Name**: `legal-expert`
   - **Command**: `npx`
   - **Args**: `["-y", "legal-expert-mcp-server"]`

#### Option 2: Manual JSON Configuration

Create or edit the MCP configuration file:

**For Project-Specific Access**:[9]
Create `.cursor/mcp.json` in your project root:

```json
{
  "mcpServers": {
    "legal-expert": {
      "command": "npx",
      "args": ["-y", "legal-expert-mcp-server"],
      "env": {}
    }
  }
}
```

**For Global Access**:[9]
Create `~/.cursor/mcp.json` in your home directory with the same configuration.

#### Option 3: Quick Setup Command

If available as an npm package, you can use the automated setup:[7]

```bash
npx legal-expert-mcp-server setup --client cursor
```

### Verification

After configuration, verify the installation:

1. **Claude Code**: Look for the hammer icon or use `/mcp` command
2. **VS Code**: Check that tools appear in Copilot agent mode
3. **Cursor**: Look for green status indicator in MCP settings and available tools in chat

---
