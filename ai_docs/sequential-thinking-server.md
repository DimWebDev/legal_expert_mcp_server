# Sequential Thinking Server

**Source:** https://github.com/modelcontextprotocol/servers/blob/main/src/sequentialthinking/index.ts

This is the TypeScript implementation of the Sequential Thinking Server from the Model Context Protocol (MCP) servers repository. This server provides a specialized tool for dynamic and reflective problem-solving through sequential thoughts.

## Complete Source Code

```typescript
#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
 CallToolRequestSchema,
 ListToolsRequestSchema,
 Tool,
} from "@modelcontextprotocol/sdk/types.js";
// Fixed chalk import for ESM
import chalk from 'chalk';

interface ThoughtData {
 thought: string;
 thoughtNumber: number;
 totalThoughts: number;
 isRevision?: boolean;
 revisesThought?: number;
 branchFromThought?: number;
 branchId?: string;
 needsMoreThoughts?: boolean;
 nextThoughtNeeded: boolean;
}

class SequentialThinkingServer {
 private thoughtHistory: ThoughtData[] = [];
 private branches: Record<string, ThoughtData[]> = {};
 private disableThoughtLogging: boolean;

 constructor() {
   this.disableThoughtLogging = (process.env.DISABLE_THOUGHT_LOGGING || "").toLowerCase() === "true";
 }

 private isValidJSON(jsonString: string): boolean {
   try {
     JSON.parse(jsonString);
     return true;
   } catch {
     return false;
   }
 }

 private tryParseJSON<T>(jsonString: string): T | null {
   if (!this.isValidJSON(jsonString)) return null;
   try {
     return JSON.parse(jsonString) as T;
   } catch {
     return null;
   }
 }

 private isValidThoughtData(data: any): data is ThoughtData {
   return (
     typeof data === "object" &&
     data !== null &&
     typeof data.thought === "string" &&
     typeof data.thoughtNumber === "number" &&
     typeof data.totalThoughts === "number" &&
     typeof data.nextThoughtNeeded === "boolean" &&
     (data.isRevision === undefined || typeof data.isRevision === "boolean") &&
     (data.revisesThought === undefined || typeof data.revisesThought === "number") &&
     (data.branchFromThought === undefined || typeof data.branchFromThought === "number") &&
     (data.branchId === undefined || typeof data.branchId === "string") &&
     (data.needsMoreThoughts === undefined || typeof data.needsMoreThoughts === "boolean")
   );
 }

 private formatThoughtNumber(thoughtData: ThoughtData): string {
   if (thoughtData.branchId && thoughtData.branchFromThought !== undefined) {
     return `${thoughtData.branchFromThought}.${thoughtData.thoughtNumber}`;
   }
   if (thoughtData.isRevision && thoughtData.revisesThought !== undefined) {
     return `${thoughtData.revisesThought}(R${thoughtData.thoughtNumber})`;
   }
   return thoughtData.thoughtNumber.toString();
 }

 private formatThought(thoughtData: ThoughtData): string {
   const thoughtNumber = this.formatThoughtNumber(thoughtData);
   const progressIndicator = thoughtData.nextThoughtNeeded ? "[→]" : "[•]";
   
   let header: string;
   if (thoughtData.branchId && thoughtData.branchFromThought !== undefined) {
     header = chalk.cyan(`💭 Thought ${thoughtNumber} (Branch ${thoughtData.branchId})`);
   } else if (thoughtData.isRevision && thoughtData.revisesThought !== undefined) {
     header = chalk.yellow(`💭 Thought ${thoughtNumber} (Revision)`);
   } else {
     header = chalk.blue(`💭 Thought ${thoughtNumber}`);
   }

   let footer = "";
   if (thoughtData.needsMoreThoughts) {
     footer = chalk.gray("\n[Need more thoughts to reach conclusion]");
   }
   if (thoughtData.nextThoughtNeeded) {
     footer += chalk.gray("\n[Next thought needed]");
   } else {
     footer += chalk.green("\n[Thought sequence complete]");
   }

   return `${header} ${progressIndicator}\n${thoughtData.thought}${footer}`;
 }

 private processThoughtData(thoughtData: ThoughtData): string {
   // Store the thought
   if (thoughtData.branchId && thoughtData.branchFromThought !== undefined) {
     if (!this.branches[thoughtData.branchId]) {
       this.branches[thoughtData.branchId] = [];
     }
     this.branches[thoughtData.branchId].push(thoughtData);
   } else {
     this.thoughtHistory.push(thoughtData);
   }

   // Format and return the thought for display
   return this.formatThought(thoughtData);
 }

 async processSequentialThinking(content: string): Promise<string> {
   if (!this.disableThoughtLogging) {
     console.log(chalk.gray("\n--- Sequential Thinking Process ---"));
   }

   const thoughtData = this.tryParseJSON<ThoughtData>(content);

   if (!thoughtData || !this.isValidThoughtData(thoughtData)) {
     const invalidMsg = "Invalid thought data format. Expected JSON with: thought (string), thoughtNumber (number), totalThoughts (number), nextThoughtNeeded (boolean), and optionally: isRevision (boolean), revisesThought (number), branchFromThought (number), branchId (string), needsMoreThoughts (boolean)";
     if (!this.disableThoughtLogging) {
       console.log(chalk.red(invalidMsg));
     }
     return invalidMsg;
   }

   const formattedThought = this.processThoughtData(thoughtData);

   if (!this.disableThoughtLogging) {
     console.log(formattedThought);
     console.log(chalk.gray("--- End Thought ---\n"));
   }

   return formattedThought;
 }
}

const SEQUENTIAL_THINKING_TOOL: Tool = {
 name: "sequentialthinking",
 description: `A detailed tool for dynamic and reflective problem-solving through sequential thoughts.

KEY FEATURES:
• Chain of Thought Reasoning: Express complex reasoning as a series of connected thoughts
• Revision Support: Revise and improve previous thoughts when needed
• Progress Tracking: Track your reasoning progress with numbered thoughts and completion status
• Branching Logic: Create thought branches for exploring alternative approaches
• Self-Assessment: Evaluate whether more thoughts are needed to reach a conclusion

USAGE:
Send thoughts as JSON with these required fields:
• thought: The actual thought content (string)
• thoughtNumber: Sequential number for this thought (number)  
• totalThoughts: Estimated total thoughts needed (number, can be adjusted)
• nextThoughtNeeded: Whether more thoughts are coming (boolean)

Optional fields:
• isRevision: Mark this as a revision of a previous thought (boolean)
• revisesThought: Which thought number this revises (number)
• branchFromThought: Branch off from this thought number (number) 
• branchId: Unique identifier for the branch (string)
• needsMoreThoughts: Flag if more thoughts are needed for completion (boolean)

EXAMPLES:

Basic sequential thinking:
{
  "thought": "I need to analyze the problem systematically by breaking it down into components",
  "thoughtNumber": 1,
  "totalThoughts": 3,
  "nextThoughtNeeded": true
}

Revising a previous thought:
{
  "thought": "Actually, I should consider the edge cases more carefully in my analysis",
  "thoughtNumber": 2,
  "totalThoughts": 4,
  "isRevision": true,
  "revisesThought": 1,
  "nextThoughtNeeded": true
}

Creating a branch:
{
  "thought": "Let me explore an alternative approach to this problem",
  "thoughtNumber": 1,
  "totalThoughts": 2,
  "branchFromThought": 2,
  "branchId": "alternative_approach",
  "nextThoughtNeeded": true
}

Final thought:
{
  "thought": "Based on my analysis, the best solution is X because of reasons Y and Z",
  "thoughtNumber": 4,
  "totalThoughts": 4,
  "nextThoughtNeeded": false
}

BENEFITS:
• Structured reasoning process
• Ability to backtrack and revise
• Clear progress indicators  
• Support for complex, branching analysis
• Visual feedback on thought progression
• Self-correcting reasoning capability

Use this tool when you need to work through complex problems step-by-step, want to show your reasoning process clearly, or need to explore multiple solution paths systematically.`,
 inputSchema: {
   type: "object",
   properties: {
     content: {
       type: "string",
       description: "JSON string containing the thought data with required fields: thought, thoughtNumber, totalThoughts, nextThoughtNeeded, and optional fields: isRevision, revisesThought, branchFromThought, branchId, needsMoreThoughts",
     },
   },
   required: ["content"],
 },
};

const server = new Server(
 {
   name: "sequential-thinking-server",
   version: "0.2.0",
 },
 {
   capabilities: {
     tools: {},
   },
 }
);

const sequentialThinkingServer = new SequentialThinkingServer();

server.setRequestHandler(ListToolsRequestSchema, async () => {
 return {
   tools: [SEQUENTIAL_THINKING_TOOL],
 };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
 const { name, arguments: args } = request.params;

 if (name === "sequentialthinking") {
   const content = args?.content as string;
   if (!content) {
     throw new Error("Content is required");
   }

   try {
     const result = await sequentialThinkingServer.processSequentialThinking(content);
     return {
       content: [
         {
           type: "text",
           text: result,
         },
       ],
     };
   } catch (error) {
     const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
     return {
       content: [
         {
           type: "text",
           text: `Error processing sequential thinking: ${errorMessage}`,
         },
       ],
       isError: true,
     };
   }
 }

 throw new Error(`Unknown tool: ${name}`);
});

async function main() {
 const transport = new StdioServerTransport();
 await server.connect(transport);
}

main().catch((error) => {
 console.error("Server error:", error);
 process.exit(1);
});
```

## Key Components

### ThoughtData Interface
Defines the structure for individual thoughts with support for:
- Basic sequential thoughts
- Revisions of previous thoughts
- Branching logic for alternative approaches
- Progress tracking

### SequentialThinkingServer Class
Manages the thought processing with features:
- Thought history tracking
- Branch management
- JSON validation
- Rich console formatting with colors
- Optional logging control

### Tool Definition
Comprehensive tool specification with:
- Detailed usage examples
- All parameter descriptions
- Benefits and use cases
- Input schema validation

## Environment Variables
- `DISABLE_THOUGHT_LOGGING`: Set to "true" to disable console logging

This server enables structured, step-by-step reasoning with the ability to revise thoughts and explore alternative approaches through branching logic.