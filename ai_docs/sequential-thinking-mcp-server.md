# Sequential Thinking MCP Server

An MCP server implementation for dynamic and reflective problem-solving through a structured thinking process.

## Features

- Break down complex problems into manageable steps
- Revise and refine thoughts as understanding deepens
- Branch into alternative paths of reasoning
- Adjust the total number of thoughts dynamically
- Generate and verify solution hypotheses

## Tool: sequential_thinking

Facilitates a detailed, step-by-step thinking process for problem-solving and analysis.

### Inputs

- `thought` (string): The current thinking step
- `nextThoughtNeeded` (boolean): Whether another thought step is needed
- `thoughtNumber` (integer): Current thought number
- `totalThoughts` (integer): Estimated total thoughts needed
- `isRevision` (boolean, optional): Whether this revises previous thinking
- `revisesThought` (integer, optional): Which thought is being reconsidered
- `branchFromThought` (integer, optional): Branching point thought number
- `branchId` (string, optional): Branch identifier
- `needsMoreThoughts` (boolean, optional): If more thoughts are needed

## Usage

Ideal for:
- Breaking down complex problems into steps
- Planning and design with room for revision
- Analysis that might need course correction
- Problems where the full scope isn't initially clear
- Tasks needing context maintenance across multiple steps
- Situations requiring irrelevant information filtering

## Configuration

### Installation Methods

1. NPX Installation:
```json
{
 "servers": {
   "sequential-thinking": {
     "command": "npx",
     "args": [
       "-y",
       "@modelcontextprotocol/server-sequential-thinking"
     ]
   }
 }
}
```

2. Docker Installation:
```json
{
 "servers": {
   "sequential-thinking": {
     "command": "docker",
     "args": [
       "run",
       "--rm",
       "-i",
       "mcp/sequentialthinking"
     ]
   }
 }
}
```

## Building

Docker Build Command:
```shell
docker build -t mcp/sequentialthinking -f src/sequentialthinking/Dockerfile .
```

## Source Information

- Source URL: https://github.com/modelcontextprotocol/servers/tree/main/src/sequentialthinking
- Part of the Model Context Protocol (MCP) servers collection
- Enables structured thinking processes for AI assistants