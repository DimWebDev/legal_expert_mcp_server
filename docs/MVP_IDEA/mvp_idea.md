Here’s your fu## Key Benefits

- **Professional Methodology**: Legal experts encode their processes into structured prompts
- **AI Agent Integration**: Leverages existing AI capabilities while providing legal guidance
- **Tool Orchestration**: Prompts intelligently direct AI agents to use available tools for comprehensive analysis
- **Safe Approach**: Provides frameworks and guidan### 4. **Maintainability**

- Easy to update legal frameworks
- No complex tool dependencies
- Clear separation of legal expertise from technical implementation
- **Tool-Agnostic Design**: Prompts work with any AI agent's available tools

### 5. **Intelligent Tool Orchestration**

- **Discovery-Driven**: Uses GLOB and GREP for smart file discovery
- **Research-Enhanced**: Leverages WEBSEARCH and WEBFETCH for current legal information
- **Analysis-Focused**: Employs READ for deep document analysis
- **Report-Ready**: Utilizes WRITE for structured legal deliverablesther than automated legal advice
- **Compliance-Friendly**: Stays within "legal information" rather than "legal advice" territory

## Available AI Agent Tools Integration

Our legal expert prompts are designed to orchestrate the AI agent's existing tools for maximum effectiveness:

### **File Operations**

- **📖 Read** - Analyze contracts, policies, code files, and legal documents
- **🔍 Glob** - Discover files by pattern matching (contracts, licenses, privacy policies)
- **🔎 Grep** - Search file contents for legal terms, PII patterns, license references
- **📝 Write** - Generate compliance reports, legal summaries, and recommendations

### **Research & Analysis**

- **🌐 WebSearch** - Find recent case law, regulatory changes, legal standards
- **🌐 WebFetch** - Analyze government websites, legal databases, court decisions
- **⚡ Bash** - Execute complex file operations, dependency scanning, automation

### **Specialized**

- **📓 NotebookEdit** - Handle legal analysis in Jupyter notebook environments
- **📋 TodoWrite** - Create structured legal compliance task lists

## Tool Integration Strategy

Our prompts instruct AI agents on **how to use these tools** as part of professional legal workflows:

```typescript
// Example: Tools orchestration in privacy compliance audit
text: `
**PHASE 1: DATA DISCOVERY (GLOB + GREP)**
- Locate config/schema/policy files: "**/*.{ts,js,py,go,json,yml,md}"
- Grep for data indicators: "email|ip_address|cookie|consent|erase|retention"

**PHASE 2: DATA FLOW ANALYSIS (READ)**
- Extract collection points, storage, transfers, deletion logic

**PHASE 3: REGULATORY CROSS-CHECK (WEBSEARCH + WEBFETCH)**
- Fetch current articles/sections for selected regulations (e.g. GDPR Art.30, CCPA rights)

**PHASE 4: GAP & RISK SCORING (WRITE)**
- Summarize gaps, map to obligations, rate Critical/High/Medium/Low

**PHASE 5: ACTION PLAN (WRITE)**
- Produce prioritized remediation checklist
`;
```

<!-- Condensed to reflect consolidated prompt set -->

---

# 🚀 Legal Expert MCP Server – Prompts-Based MVP

## Overview

A Model Context Protocol (MCP) server that provides expert legal analysis prompts to AI agents. Instead of performing automated legal analysis, this server delivers structured, professional-grade legal methodologies that guide AI agents through comprehensive legal reviews.

## Core Concept

**Legal Expertise as Prompts**: Rather than building tools that perform legal analysis, we provide expert-crafted prompts that instruct AI agents on how to conduct professional legal reviews using their existing capabilities (file reading, web search, etc.).

## Key Benefits

- **Professional Methodology**: Legal experts encode their processes into structured prompts
- **AI Agent Integration**: Leverages existing AI capabilities while providing legal guidance
- **Safe Approach**: Provides frameworks and guidance rather than automated legal advice
- **Compliance-Friendly**: Stays within "legal information" rather than "legal advice" territory

## Success Metrics

- Deliver 15 comprehensive legal analysis prompts focused on compliance, IP, and corporate law
- Enable consistent, professional-grade legal reviews
- Provide structured methodologies for specialized legal domains
- Support dynamic prompt parameters for different use cases

---

## MCP Architecture

Built using the **MCP TypeScript SDK** with prompts-only approach:

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioTransport } from "@modelcontextprotocol/sdk/transport/stdio.js";

const server = new McpServer({
  name: "legal-expert-server",
  version: "1.0.0",
});

// Register core prompts (examples only)
server.registerPrompt(
  "comprehensive-privacy-audit" /* privacy & data protection */
);
server.registerPrompt(
  "intellectual-property-and-oss-audit" /* IP + OSS compliance */
);
server.registerPrompt(
  "security-legal-alignment-check" /* security vs regulatory */
);
server.registerPrompt("risk-analysis-framework" /* risk scoring */);
```

---

## Core Legal Expert Prompts

| Prompt Name                                       | Purpose                                                                     | Parameters                                                  | AI Agent Workflow                                                                                                                                                                                                                                                                                             |
| ------------------------------------------------- | --------------------------------------------------------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `legal-landscape-discovery`                       | Map the legal landscape for a startup/solo dev based on sector/jurisdiction | `jurisdiction`, `sector`, `businessModel?`, `targetPath?`   | 1. Analyze product & model<br>2. Map baseline laws<br>3. Add sector-specific obligations<br>4. Flag cross-border issues<br>5. Generate “legal map” with key frameworks                                                                                                                                        |
| `comprehensive-privacy-audit`                     | End-to-end privacy law compliance review (GDPR, CCPA, PIPEDA, etc.)         | `jurisdiction`, `regulations?`, `dataTypes?`, `targetPath?` | 1. Inventory data collection<br>2. Map flows & transfers<br>3. Check consent & disclosures<br>4. Validate retention/deletion<br>5. Cross-check policy<br>6. Generate compliance report                                                                                                                        |
| `website-and-app-legal-disclosure-check`          | Static code/content audit for required legal disclosures (web/app)          | `jurisdiction`, `businessModel`, `targetPath?`, `platform?` | 1. Scan repo paths (GLOB) for pages/components (privacy, terms, cookies, imprint, accessibility)<br>2. Analyze content markers (GREP) for mandatory clauses<br>3. Check routing/config for disclosure availability<br>4. Cross-reference jurisdictional requirements<br>5. Output gap & remediation checklist |
| `security-legal-alignment-check`                  | Ensure code security practices meet regulatory/legal obligations            | `jurisdiction`, `framework?`, `targetPath?`                 | 1. Discover codebase<br>2. Review authentication & password handling<br>3. Check encryption at rest/in transit<br>4. Scan for secrets<br>5. Map controls to SOC2/HIPAA/ISO/GDPR                                                                                                                               |
| `ai-ethics-and-compliance-scan`                   | Verify AI/ML usage aligns with AI Act, FTC, and ethical standards           | `jurisdiction`, `aiModelType?`, `targetPath?`               | 1. Detect AI/ML usage<br>2. Analyze datasets for provenance/bias<br>3. Review fairness/explainability<br>4. Map to EU AI Act, FTC guidance, NIST RMF<br>5. Generate compliance findings                                                                                                                       |
| `intellectual-property-and-oss-audit`             | Comprehensive IP ownership + open-source license compliance                 | `jurisdiction?`, `distributionModel?`, `targetPath?`        | 1. Inventory IP assets<br>2. Verify ownership/assignments<br>3. Scan OSS dependencies<br>4. Map licenses to obligations<br>5. Flag copyleft/IP risks<br>6. Recommend mitigation                                                                                                                               |
| `startup-corporate-and-fundraising-readiness`     | Governance & fundraising due diligence readiness                            | `jurisdiction`, `stage?`, `targetPath?`                     | 1. Review equity splits & vesting<br>2. Analyze governance docs<br>3. Validate cap table & option pool<br>4. Flag liabilities<br>5. Summarize investor red flags                                                                                                                                              |
| `employment-and-contractor-classification-review` | Worker classification & IP assignment validation                            | `jurisdiction`, `contractorOrEmployee?`, `targetPath?`      | 1. Discover employment/contractor docs<br>2. Verify legal classification<br>3. Check IP assignment enforceability<br>4. Validate non-competes<br>5. Flag benefit/obligation gaps                                                                                                                              |
| `market-and-customer-compliance-audit`            | Customer-facing compliance: consumer law, ads, payments                     | `jurisdiction`, `targetPath?`, `paymentProvider?`           | 1. Review refund/cancellation flows<br>2. Check mandatory disclosures<br>3. Scan marketing copy vs FTC/ASA<br>4. Validate billing & auto-renewals<br>5. Flag hidden fees risks                                                                                                                                |
| `risk-analysis-framework`                         | Prioritize legal risks by probability & impact                              | `jurisdiction?`, `businessContext?`, `findings[]`           | 1. Categorize legal risks<br>2. Score by likelihood × severity<br>3. Rank Critical/High/Medium/Low<br>4. Recommend remediation timeline                                                                                                                                                                       |
| `legal-expert-prompts-catalog`                    | Discover all available legal expert prompts                                 | `category?`, `jurisdiction?`                                | 1. List available prompts<br>2. Group by category<br>3. Suggest use cases<br>4. Provide selection guidance                                                                                                                                                                                                    |

---

                                             |

---

## Example Prompt Implementations (Condensed)

```typescript
// Privacy compliance audit (consolidated)
server.registerPrompt(
  "comprehensive-privacy-audit",
  {
    title: "Comprehensive Privacy Compliance Audit",
    description: "End-to-end privacy obligations mapping and gap analysis",
    arguments: [
      {
        name: "jurisdiction",
        required: true,
        description: "Primary jurisdiction (e.g. EU, US-CA, CA, UK)",
      },
      {
        name: "regulations",
        required: false,
        description: "Comma list (GDPR, CCPA, PIPEDA, UK-GDPR, etc.)",
      },
      {
        name: "targetPath",
        required: false,
        description: "Root folder to scope analysis",
      },
    ],
  },
  async ({ jurisdiction, regulations, targetPath }) => ({
    messages: [
      {
        role: "user",
        content: {
          type: "text",
          text: `Perform a privacy compliance audit.
Input Context:
- Jurisdiction: ${jurisdiction}
- Regulations: ${regulations || "auto-detect core set"}
- Target Path: ${targetPath || "workspace root"}

Method:
1. Discover data-relevant files (GLOB) then grep for data indicators.
2. Map collection, storage, transfer, and deletion logic (READ).
3. Cross-reference obligations (consent, rights, notices, DPIA triggers, retention, security).
4. Produce gap list with risk level and remediation recommendation.
5. Output structured report (WRITE) with: Executive Summary, Data Inventory, Rights Handling, Gaps, Action Plan.
`,
        },
      },
    ],
  })
);

// IP + OSS combined audit
server.registerPrompt(
  "intellectual-property-and-oss-audit",
  {
    title: "IP & Open Source Compliance Audit",
    description: "Ownership validation plus OSS license obligations scan",
    arguments: [
      {
        name: "distributionModel",
        required: false,
        description: "internal|saas|on-prem|dual",
      },
      {
        name: "targetPath",
        required: false,
        description: "Root path to analyze",
      },
    ],
  },
  async ({ distributionModel, targetPath }) => ({
    messages: [
      {
        role: "user",
        content: {
          type: "text",
          text: `Run an IP & OSS audit.
Scope:
- Distribution Model: ${distributionModel || "unspecified"}
- Path: ${targetPath || "workspace root"}

Steps:
1. Inventory proprietary code, third-party components, generated artifacts.
2. Parse dependency manifests (package.json, requirements.txt, go.mod, etc.).
3. Extract license identifiers; flag unknown/spdx-invalid values.
4. Map copyleft / weak-copyleft impact under current distribution model.
5. Identify missing NOTICE / attribution / license texts.
6. Summarize IP ownership chain assumptions & contractor assignment risk.
7. Output compliance matrix + remediation checklist.
`,
        },
      },
    ],
  })
);

// Catalog (unchanged pattern, shortened text)
server.registerPrompt(
  "legal-expert-prompts-catalog",
  {
    title: "Legal Expert Prompts Catalog",
    description:
      "Discover and explore all available legal analysis prompts with guidance",
    arguments: [
      {
        name: "category",
        description:
          "Filter by category (contract, compliance, ip, corporate, risk)",
        required: false,
      },
      {
        name: "jurisdiction",
        description: "Filter prompts relevant to specific jurisdiction",
        required: false,
      },
    ],
  },
  async ({ category, jurisdiction }) => ({
    messages: [
      {
        role: "user",
        content: {
          type: "text",
          text: `Please provide a comprehensive catalog of all available legal expert prompts in this MCP server.

**CATALOG ORGANIZATION:**
1. **List all available prompts** with brief descriptions
2. **Group by categories**: Contract Analysis, Compliance & Regulatory, Intellectual Property, Corporate & Business Law, Risk & Discovery
3. **Include use cases** for each prompt
4. **Show required parameters** and optional ones
5. **Provide selection guidance** based on user needs

**FILTERING OPTIONS:**
${category ? `- Focus on ${category} category` : "- Show all categories"}
${
  jurisdiction
    ? `- Highlight prompts relevant to ${jurisdiction}`
    : "- Include jurisdiction-specific guidance where applicable"
}

**DELIVERABLES:**
- Interactive catalog with clear navigation
- Quick-start examples for each prompt
- Decision tree for prompt selection
- Integration examples with common workflows

Use your organizational capabilities to present this information in a user-friendly, searchable format.`,
        },
      },
    ],
  })
);
```

## Prompt Categories

### 1. Compliance & Regulatory

- `comprehensive-privacy-audit` (privacy compliance, policy completeness, data flows, cross-border transfers)
- `website-and-app-legal-disclosure-check` (codebase scan for required legal pages: privacy, terms, cookies, imprint/company info, accessibility)
- `security-legal-alignment-check` (code security vs SOC2, HIPAA, ISO, GDPR)
- `ai-ethics-and-compliance-scan` (AI Act, FTC guidance, NIST AI RMF compliance)

### 2. Intellectual Property

- `intellectual-property-and-oss-audit` (IP ownership, assignments, OSS license scanning & compliance)

### 3. Corporate & Startup Operations

- `startup-corporate-and-fundraising-readiness` (equity, governance, fundraising due diligence)
- `employment-and-contractor-classification-review` (worker classification, IP assignment, HR compliance)
- `market-and-customer-compliance-audit` (consumer protection, marketing & advertising, payments & billing)

### 4. Risk Prioritization & Discovery

- `legal-landscape-discovery` (map the legal frameworks relevant to the startup’s sector/jurisdiction)
- `risk-analysis-framework` (prioritize identified risks by likelihood × impact)
- `legal-expert-prompts-catalog` (index and guide to all prompts)

---

## Benefits of Prompts-First Approach

### 1. **Safety & Ethics**

- No automated legal advice - provides methodology only
- Keeps human lawyer in the loop for decisions
- Complies with legal ethics requirements

### 2. **Flexibility**

- AI agents can adapt prompts to specific situations
- Works with any AI model or client
- Leverages existing AI tool capabilities

### 3. **Expert Knowledge**

- Legal professionals design the methodologies
- Consistent, professional-grade approaches
- Incorporates industry best practices

### 4. **Maintainability**

- Easy to update legal frameworks
- No complex tool dependencies
- Clear separation of legal expertise from technical implementation

---

_Legal Expert MCP Server - Prompts-based MVP defined and ready for implementation._

---
