# MCP TypeScript SDK

## Overview

The Model Context Protocol (MCP) TypeScript SDK allows developers to build servers that expose data and functionality to LLM applications in a secure, standardized way. It provides a flexible framework for creating intelligent, context-aware AI interactions.

## Key Features

- Build MCP clients that connect to any MCP server
- Create servers with resources, prompts, and tools
- Support standard transports like stdio and Streamable HTTP
- Handle all MCP protocol messages and lifecycle events

## Installation

```bash
npm install @modelcontextprotocol/sdk
```

> ⚠️ Requires Node.js v18.x or higher

## Core Concepts

### Server

The `McpServer` is the core interface for the MCP protocol, managing connections, protocol compliance, and message routing.

```typescript
const server = new McpServer({
 name: "my-app",
 version: "1.0.0"
});
```

### Resources

Resources expose data to LLMs, similar to GET endpoints. They provide information without significant computation or side effects.

```typescript
// Example of a dynamic resource
server.registerResource(
 "user-profile",
 new ResourceTemplate("users://{userId}/profile", { list: undefined }),
 {
   title: "User Profile",
   description: "User profile information"
 },
 async (uri, { userId }) => ({
   contents: [{
     uri: uri.href,
     text: `Profile data for user ${userId}`
   }]
 })
);
```

### Tools

Tools allow LLMs to take actions, performing computations and side effects.

```typescript
// Example of a BMI calculation tool
server.registerTool(
 "calculate-bmi",
 {
   title: "BMI Calculator",
   description: "Calculate Body Mass Index",
   inputSchema: {
     weightKg: z.number(),
     heightM: z.number()
   }
 },
 async ({ weightKg, heightM }) => ({
   content: [{
     type: "text",
     text: String(weightKg / (heightM * heightM))
   }]
 })
);
```

### Prompts

Prompts provide templated messages and instructions for LLMs.

```typescript
server.registerPrompt(
 "review-code",
 {
   title: "Code Review",
   description: "Review code for best practices",
   arguments: [{
     name: "language",
     description: "Programming language",
     required: true
   }]
 },
 async ({ language }) => ({
   messages: [{
     role: "user",
     content: {
       type: "text",
       text: `Please review this ${language} code for best practices.`
     }
   }]
 })
);
```

## Transport Layer

### StdioTransport

For command-line applications and process-based communication:

```typescript
import { StdioTransport } from "@modelcontextprotocol/sdk/transport/stdio.js";

const transport = new StdioTransport();
server.serve(transport);
```

### Streamable HTTP Transport

For HTTP-based communication:

```typescript
import { StreamableHttpTransport } from "@modelcontextprotocol/sdk/transport/http.js";

const transport = new StreamableHttpTransport();
server.serve(transport);
```

## Message Handling

The SDK handles all MCP protocol messages automatically, including:

- Initialization and capability negotiation
- Resource discovery and retrieval
- Tool discovery and execution
- Prompt discovery and rendering
- Error handling and logging

## Client Usage

Build MCP clients to connect to servers:

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioTransport } from "@modelcontextprotocol/sdk/transport/stdio.js";

const client = new Client({
  name: "my-client",
  version: "1.0.0"
});

const transport = new StdioTransport({
  command: "node",
  args: ["server.js"]
});

await client.connect(transport);

// List available resources
const resources = await client.listResources();

// Call a tool
const result = await client.callTool("calculate-bmi", {
  weightKg: 70,
  heightM: 1.75
});
```

## Error Handling

The SDK provides comprehensive error handling:

```typescript
import { McpError } from "@modelcontextprotocol/sdk/types.js";

try {
  const result = await client.callTool("my-tool", args);
} catch (error) {
  if (error instanceof McpError) {
    console.error(`MCP Error: ${error.code} - ${error.message}`);
  }
}
```

## Logging

Built-in logging support for debugging and monitoring:

```typescript
import { Logger } from "@modelcontextprotocol/sdk/logging.js";

const logger = new Logger("my-server");
logger.info("Server starting");
logger.error("Error occurred", { error });
```

## Examples

### Complete Server Example

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioTransport } from "@modelcontextprotocol/sdk/transport/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "example-server",
  version: "1.0.0"
});

// Register a simple tool
server.registerTool(
  "echo",
  {
    title: "Echo Tool",
    description: "Echoes back the input",
    inputSchema: {
      message: z.string()
    }
  },
  async ({ message }) => ({
    content: [{
      type: "text",
      text: `Echo: ${message}`
    }]
  })
);

// Start the server
const transport = new StdioTransport();
server.serve(transport);
```

### Complete Client Example

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioTransport } from "@modelcontextprotocol/sdk/transport/stdio.js";

async function main() {
  const client = new Client({
    name: "example-client",
    version: "1.0.0"
  });

  const transport = new StdioTransport({
    command: "node",
    args: ["server.js"]
  });

  await client.connect(transport);

  // List available tools
  const tools = await client.listTools();
  console.log("Available tools:", tools);

  // Call the echo tool
  const result = await client.callTool("echo", {
    message: "Hello, MCP!"
  });
  console.log("Result:", result);

  await client.close();
}

main().catch(console.error);
```

## Best Practices

1. **Resource Design**: Make resources stateless and cacheable
2. **Tool Safety**: Implement proper validation and error handling for tools
3. **Performance**: Use async/await properly and avoid blocking operations
4. **Security**: Validate all inputs and implement appropriate access controls
5. **Testing**: Write comprehensive tests for your resources and tools

## Contributing

The MCP TypeScript SDK is open source. Contributions are welcome through GitHub pull requests and issues.

## License

This project is licensed under the MIT License.

## Links

- [GitHub Repository](https://github.com/modelcontextprotocol/typescript-sdk)
- [MCP Documentation](https://modelcontextprotocol.io)
- [Examples](https://github.com/modelcontextprotocol/servers)