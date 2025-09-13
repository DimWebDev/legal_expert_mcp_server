import { server } from "../server.js";
import { z } from "zod";

server.registerPrompt(
  "market-and-customer-compliance-audit",
  {
    title: "Market & Customer Compliance Audit",
    description: "Consumer protection and customer-facing compliance review",
    argsSchema: {
      jurisdiction: z
        .string()
        .describe("Primary market jurisdiction (US, EU, UK, CA, AU, etc.)"),
      businessModel: z
        .string()
        .optional()
        .describe(
          "Business model: subscription|ecommerce|marketplace|freemium|b2b-saas"
        ),
      targetPath: z
        .string()
        .optional()
        .describe("Root path to analyze (defaults to workspace root)"),
      paymentProvider: z
        .string()
        .optional()
        .describe("Payment provider: stripe|paypal|square|custom"),
    },
  },
  async ({ jurisdiction, businessModel, targetPath, paymentProvider }) => ({
    messages: [
      {
        role: "user",
        content: {
          type: "text",
          text: `You are to perform a market & customer compliance audit. You must assess customer-facing flows, marketing representations, subscription mechanics, and billing practices for alignment with consumer protection principles in ${jurisdiction}.

CONTEXT INPUTS:
- Jurisdiction: ${jurisdiction} (Note: Include both national consumer laws and inherited supranational frameworks applicable to this jurisdiction)
- Business Model: ${businessModel || "infer from repository signals"}
- Target Path: ${targetPath || "workspace root"}
- Payment Provider: ${paymentProvider || "infer or list all detected"}

PRE-SCAN (RAPID CONTEXT PRIMING YOU MUST PERFORM BEFORE PHASE 1):
• You should run an equivalent of: git ls-files (no truncation).
• You should analyze the codebase structure to understand:
  - Customer acquisition and conversion flows.
  - Pricing and billing system architecture.
  - Marketing and promotional content organization.
  - Payment processing and financial integrations.
  - Customer support and dispute resolution mechanisms.
• You should identify areas requiring focused compliance analysis based on monetization and customer interaction patterns.
• You should not read file contents—list relative paths only.

YOUR OBJECTIVES:
1. You should map the end-to-end customer lifecycle: acquisition → signup → engagement → billing → cancellation → refund / dispute.
2. You should evaluate transparency, clarity, and fairness of pricing, renewals, and cancellation.
• Include applicable supra- and sub-national frameworks inherited by the selected jurisdiction (e.g., EU→member state; US federal→state; CA federal→provincial).
3. You should analyze marketing and claims for potential misleading or unsubstantiated representations.
4. You should review payment and billing structures for compliance signals and risk points.
5. You should classify gaps by risk (Critical/High/Medium/Low) and propose remediation direction.

PHASE 1: CUSTOMER-FACING DISCOVERY
• You should use GLOB: "**/*{checkout,payment,subscription,billing,cancel,refund,pricing,plan}*".
• You should use GREP: "refund|cancel|auto[- ]?renew|trial|fee|charge|billing|discount|guarantee".
• You should map flows: signup friction, disclosure timing, cancellation steps count, refund triggers.
• You should identify subscription behavior (trial length, renewal timing, notification practices).

PHASE 2: CONSUMER PROTECTION CORE REVIEW
• You should analyze clarity of key commercial terms (price, frequency, renewal, refund eligibility, restrictions).
• If multiple jurisdictions are implicated, synthesize common denominators, highlight stricter-rule defaults, and flag conflicts requiring jurisdiction-specific handling.
• Consider regional/treaty overlays (e.g., EEA/EFTA, Council of Europe, CPTPP) where applicable.
• You should assess cancellation UX: is it as easy as signup (parity principle)?
• You should identify cooling-off or withdrawal right references (if applicable to ${jurisdiction}).
• You should evaluate fee / surcharge disclosure timing (no hidden or back-loaded fees).
• You should assess accessibility considerations (basic alternative text / structure cues if visible in codebase) and note absence.

PHASE 3: MARKETING & CLAIMS EVALUATION
• You should extract marketing claims (performance, savings, superiority, guarantee) and classify those needing substantiation.
• You should flag limited-time / scarcity language for potential exaggeration risk.
• You should check testimonial / endorsement patterns for disclosure cues (e.g., "sponsored", "affiliate").
• You should identify risk if claims imply outcomes beyond typical user experience.

PHASE 4: PAYMENT, BILLING & FINANCIAL PRACTICES
• You should identify payment processor references (SDK imports, API keys, configs).
• You should assess billing descriptor clarity (brand alignment, dispute avoidance).
• You should check handling of failed payments / dunning signals if present.
• You should flag international pricing / currency display consistency issues.
• You should identify auto-renewal pre-renewal notice absence if subscription exists.

RISK HEURISTICS (APPLY REASONABLY):
• You should treat missing cancellation path or dark patterns as High/Critical.
• You should treat hidden fees or unclear pricing disclaimers as High.
• You should treat over-claiming product outcomes without evidence as High reputational + regulatory risk.
• You should treat ambiguous trial → paid transition messaging as High.
• You should treat minor formatting / labeling inconsistencies as Low unless compounding.

DELIVERABLES (MANDATORY ORDER):
Generate this report and save it in legal_docs/market-customer-compliance-audit-report-{timestamp}.md. Report the output directory to the user.

1. Executive Summary
  - You should state overall consumer compliance posture and top 5 issues.
2. Customer Journey Audit
  - You should outline each key stage with strengths / gaps.
3. Marketing & Claims Analysis
  - You should table: claim | type | evidence required | risk level | notes.
4. Payment & Billing Evaluation
  - You should list: area | observed issue | potential consequence | risk level.
5. Remediation Action Plan
  - You should group actions: Immediate | Near-Term | Structural.
  - Offer two tracks where feasible: low-effort/quick-win path and comprehensive/structural path.
6. Assumptions & Limitations
  - You should list unavailable evidence or inferred flows.

STYLE & SAFETY:
• You should provide elite-level legal expert analysis with professional consumer protection law expertise and actionable recommendations.
• You should avoid normative legal instructions—focus on improvements and alignment.
• Label each finding with confidence: Observed (evidence cited) or Inferred (assumption noted).
• Provide elite-level legal expert analysis and professional recommendations.
        `,
        },
      },
    ],
  })
);
