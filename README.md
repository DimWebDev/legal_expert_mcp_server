# Legal Info MCP Server

> [!WARNING]
> This Legal Info Model Context Protocol (MCP) server produces _informational_ analyses only. It does **not** constitute legal advice, does **not** create an attorney–client relationship, and may contain errors or omissions. Large Language Models (LLMs) can hallucinate or misinterpret context. You (the user) are solely responsible for validating outputs before relying on them. The author(s) of this project assume **no liability** for any legal, regulatory, commercial, or compliance consequences arising from use of the generated reports.

## Table of Contents

- [What This Is](#what-this-is)
- [Core Benefits](#core-benefits)
- [When To Use Which Prompt](#when-to-use-which-prompt)
- [Prompts & Arguments (Adaptability Matrix)](#prompts--arguments-adaptability-matrix)
  - [1. legal_landscape_discovery](#1-legal_landscape_discovery)
  - [2. risk_analysis_framework](#2-risk_analysis_framework)
  - [3. comprehensive_privacy_audit](#3-comprehensive_privacy_audit)
  - [4. website_and_app_legal_disclosure_check](#4-website_and_app_legal_disclosure_check)
  - [5. security_legal_alignment_check](#5-security_legal_alignment_check)
  - [6. ai_ethics_and_compliance_scan](#6-ai_ethics_and_compliance_scan)
  - [7. intellectual_property_and_oss_audit](#7-intellectual_property_and_oss_audit)
  - [8. market_and_customer_compliance_audit](#8-market_and_customer_compliance_audit)
  - [9. legal_prompts_catalog](#9-legal_prompts_catalog)
- [How to Use Them](#how-to-use-them)
- [Output Conventions](#output-conventions)
- [How It Works (Architecture)](#how-it-works-architecture)
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

A modular, high-signal **Legal Info MCP Server** that provides structured, methodology‑driven prompt endpoints for rapid legal/compliance landscape mapping, gap discovery, and risk prioritization across privacy, IP, AI governance, security, consumer, and disclosure domains.

## Core Benefits

- **Adaptable to any repository / product context** via argument-driven scoping (jurisdiction, sector, model type, targetPath, risk domains, etc.)
- **Phased methodologies** that produce reproducible, timestamped Markdown reports in `legal_docs/`
- **Non-prescriptive framing**: identifies evidence-based gaps & risk vectors without generating normative legal advice
- **Composable sequencing**: run discovery → domain audits → consolidation (risk-analysis-framework)
- **Audit traceability**: consistent section ordering & explicit assumptions surfaces maturity over time

## When To Use Which Prompt

| Stage                               | Recommended Prompts                                                              |
| ----------------------------------- | -------------------------------------------------------------------------------- |
| Initial mapping / greenfield        | `legal_landscape_discovery`                                                      |
| Data-heavy / personal data handling | `comprehensive_privacy_audit`                                                    |
| AI / model artifacts appear         | `ai_ethics_and_compliance_scan`                                                  |
| OSS / licensing maturity check      | `intellectual_property_and_oss_audit`                                            |
| Commercial launch readiness         | `market_and_customer_compliance_audit`, `website_and_app_legal_disclosure_check` |
| Security posture vs legal duties    | `security_legal_alignment_check`                                                 |
| Consolidate multi‑audit outputs     | `risk_analysis_framework`                                                        |
| Explore what's available            | `legal_prompts_catalog`                                                          |

## Prompts & Arguments (Adaptability Matrix)

Below each prompt lists **Required** and **Optional** arguments you can pass to tailor scope and depth.

### 1. legal_landscape_discovery

- Required: `jurisdiction`, `sector`
- Optional: `businessModel`, `targetPath`
- Purpose: Baseline cross-domain legal framework & guardrail mapping for a product/company context.

### 2. risk_analysis_framework

- Required: (none)
- Optional: `jurisdiction`, `businessContext`, `riskDomains`, `findings`
- Purpose: Normalize & prioritize risks (probability × impact) after audits or inferred signals.

### 3. comprehensive_privacy_audit

- Required: `jurisdiction`, `sector`
- Optional: `regulations`, `targetPath`
- Purpose: Data lifecycle mapping, obligations coverage, and risk-based privacy gap analysis.

### 4. website_and_app_legal_disclosure_check

- Required: `jurisdiction`, `sector`
- Optional: `targetPath`, `productType`
- Purpose: Inventory, adequacy & gap analysis of user-facing legal/policy disclosures.

### 5. security_legal_alignment_check

- Required: `jurisdiction`, `sector`
- Optional: `targetPath`, `securityFrameworks`
- Purpose: Map implemented security controls to legal/regulatory expectation areas.

### 6. ai_ethics_and_compliance_scan

- Required: `jurisdiction`, `sector`
- Optional: `aiModelType`, `targetPath`, `riskLevel`
- Purpose: AI/ML system classification, governance signals, risk tiering & mitigation direction.

### 7. intellectual_property_and_oss_audit

- Required: `jurisdiction`
- Optional: `targetPath`, `codeOwnershipModel`
- Purpose: Ownership chain integrity, OSS license classification, infringement & provenance risk.

### 8. market_and_customer_compliance_audit

- Required: `jurisdiction`, `sector`
- Optional: `businessModel`, `targetPath`, `paymentProvider`
- Purpose: Consumer-facing lifecycle fairness, pricing clarity, marketing representation risk.

### 9. legal_prompts_catalog

- Required: (none)
- Optional: `category`
- Purpose: Introspect & filter available prompts plus usage guidance.

## How to Use Them

In Claude Code, VS Code, and Cursor, these prompts are available as slash commands. When you invoke a prompt using its slash command (e.g., `/mcp__legal_info__legal_landscape_discovery`), the system will interactively prompt you to provide the required and optional arguments for that prompt.

**Claude Code** enforces each prompt's **argsSchema** by interactively collecting required arguments before execution. When you type a slash command for an MCP prompt that has mandatory parameters, Claude Code will:

1. Display an inline form listing all **required** arguments first (marked with a red asterisk) followed by any **optional** arguments.
2. Prevent execution until every required field has been filled. Leaving a required field blank shows a validation error.
3. Automatically insert your responses into the prompt's JSON payload once you confirm, then dispatch the MCP request to your configured server.

**VS Code and Cursor** similarly prompt for arguments interactively, ensuring required arguments must be provided to proceed, while optional ones can be left blank if not applicable to your context.

For example:

- `/mcp__legal_info__legal_landscape_discovery` prompts for `jurisdiction` and `sector` (required), optionally `businessModel` and `targetPath`.
- `/mcp__legal_info__comprehensive_privacy_audit` prompts for `jurisdiction` and `sector` (required), optionally `regulations` and `targetPath`.
- `/mcp__legal_info__website_and_app_legal_disclosure_check` prompts for `jurisdiction` and `sector` (required), optionally `targetPath` and `productType`.
- `/mcp__legal_info__ai_ethics_and_compliance_scan` prompts for `jurisdiction` and `sector` (required), optionally `aiModelType`, `targetPath`, `riskLevel`.
- `/mcp__legal_info__security_legal_alignment_check` prompts for `jurisdiction` and `sector` (required), optionally `securityFrameworks`, `targetPath`.
- `/mcp__legal_info__market_and_customer_compliance_audit` prompts for `jurisdiction` and `sector` (required), optionally `businessModel`, `paymentProvider`, `targetPath`.

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

1. Run `legal_landscape_discovery` (jurisdiction + sector) for baseline context.
2. Run domain audits: privacy → IP/OSS → disclosures → security.
3. Consolidate into `risk_analysis_framework` (feed findings as comma-separated seed if desired).
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

To add the Legal Info MCP Server to Claude Code:

```bash
# Basic installation using npx inside a directory
claude mcp add legal-info npx @dimwebdev/legal-info-mcp-server

# For user-wide availability
claude mcp add legal-info --scope user npx @dimwebdev/legal-info-mcp-server
```

### VS Code

VS Code supports MCP servers through GitHub Copilot's agent mode:

1. **Create Workspace Configuration**
   Create a `.vscode/mcp.json` file in your project:

   ```json
   {
     "servers": {
       "legal-info": {
         "type": "stdio",
         "command": "npx",
         "args": ["-y", "@dimwebdev/legal-info-mcp-server"]
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
   - **Name**: `legal-info`
   - **Command**: `npx`
   - **Args**: `["-y", "@dimwebdev/legal-info-mcp-server"]`

#### Option 2: Manual JSON Configuration

Create or edit the MCP configuration file:

**For Project-Specific Access**:
Create `.cursor/mcp.json` in your project root:

```json
{
  "mcpServers": {
    "legal-info": {
      "command": "npx",
      "args": ["-y", "@dimwebdev/legal-info-mcp-server"],
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
npx @dimwebdev/legal-info-mcp-server setup --client cursor
```

### Verification

After configuration, verify the installation:

1. **Claude Code**: Look for the hammer icon or use `/mcp` command
2. **VS Code**: Check that tools appear in Copilot agent mode
3. **Cursor**: Look for green status indicator in MCP settings and available tools in chat

---
