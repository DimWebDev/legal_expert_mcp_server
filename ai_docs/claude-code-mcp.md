# Claude Code Model Context Protocol (MCP)

## Introduction

Claude Code can connect to hundreds of external tools and data sources through the [Model Context Protocol (MCP)](https://modelcontextprotocol.io/introduction), an open-source standard for AI-tool integrations. MCP servers give Claude Code access to tools, databases, and APIs.

## What You Can Do with MCP

With MCP servers connected, you can:

- **Implement features from issue trackers**: Create PRs and implement features from issue tracking systems
- **Analyze monitoring data**: Check error logs and usage statistics
- **Query databases**: Retrieve and analyze data from various database systems
- **Integrate designs**: Update templates and workflows based on design resources
- **Automate workflows**: Create drafts, send invitations, and manage tasks automatically

## Installation Methods

### Option 1: Local Stdio Server

Stdio servers run as local processes, ideal for tools needing direct system access.

```bash
# Basic syntax
claude mcp add <name> <command> [args...]

# Example: Add Airtable server
claude mcp add airtable --env AIRTABLE_API_KEY=YOUR_KEY \
  -- npx -y airtable-mcp-server
```

### Option 2: Remote SSE Server

SSE servers provide real-time streaming connections.

```bash
# Basic syntax
claude mcp add --transport sse <name> <url>

# Example: Connect to Linear
claude mcp add --transport sse linear https://mcp.linear.app/sse
```

### Option 3: Remote HTTP Server

HTTP servers use standard request/response patterns.

```bash
# Basic syntax
claude mcp add --transport http <name> <url>

# Example: Connect to Notion
claude mcp add --transport http notion https://mcp.notion.com/mcp
```

## Configuration Scopes

### Local Scope (Default)
- Configuration stored in local `.mcp.json` file
- Private to current project/directory
- Ideal for personal or experimental servers
- Not shared with team members

### Project Scope
- Enables team collaboration
- Configurations stored in project `.mcp.json`
- Shareable across team members
- Use `--project` flag when adding servers

```bash
# Add server to project scope
claude mcp add --project github --env GITHUB_TOKEN=YOUR_TOKEN \
  -- npx -y @modelcontextprotocol/server-github
```

### User Scope
- Cross-project accessibility
- Available across all projects on your machine
- Good for personal utility servers
- Use `--user` flag when adding servers

```bash
# Add server to user scope
claude mcp add --user filesystem \
  -- npx -y @modelcontextprotocol/server-filesystem /path/to/allowed/directory
```

## Server Management Commands

```bash
# List all configured servers
claude mcp list

# Get details for a specific server
claude mcp get github

# Remove a server
claude mcp remove github

# Check server status (within Claude Code)
/mcp
```

## Authentication

Many cloud-based MCP servers require authentication. Common patterns include:

### Environment Variables
```bash
# Set API keys as environment variables
claude mcp add github --env GITHUB_TOKEN=your_token_here \
  -- npx -y @modelcontextprotocol/server-github
```

### Configuration Files
Some servers use configuration files for authentication and settings.

### OAuth Flow
Some servers support OAuth authentication through browser-based flows.

## Popular MCP Servers

### Database Servers
- **PostgreSQL**: `npx -y @modelcontextprotocol/server-postgres`
- **SQLite**: `npx -y @modelcontextprotocol/server-sqlite`

### Productivity Tools
- **GitHub**: `npx -y @modelcontextprotocol/server-github`
- **Linear**: Remote SSE server at `https://mcp.linear.app/sse`
- **Notion**: Remote HTTP server at `https://mcp.notion.com/mcp`

### File Systems
- **Local Filesystem**: `npx -y @modelcontextprotocol/server-filesystem`

### Development Tools
- **Docker**: `npx -y @modelcontextprotocol/server-docker`
- **Git**: `npx -y @modelcontextprotocol/server-git`

## Best Practices

### Security Considerations
- Store sensitive credentials in environment variables
- Limit filesystem access to necessary directories only
- Review server permissions before installation
- Regularly audit connected servers

### Performance Tips
- Use local servers for frequently accessed tools
- Consider remote servers for occasional use
- Monitor server resource usage
- Remove unused servers to improve startup time

### Team Collaboration
- Use project scope for team-shared servers
- Document server configurations in your README
- Include necessary environment variables in setup instructions
- Version control your `.mcp.json` configuration

## Troubleshooting

### Common Issues

#### Server Not Starting
- Check that all required dependencies are installed
- Verify environment variables are set correctly
- Ensure the server command is accessible in PATH

#### Permission Errors
- Verify API keys and credentials
- Check server-specific authentication requirements
- Ensure proper scopes/permissions for API tokens

#### Connection Issues
- Test network connectivity for remote servers
- Verify server URLs are correct and accessible
- Check firewall settings for network requests

### Debugging Commands
```bash
# Check server configuration
claude mcp get <server-name>

# List all servers and their status
claude mcp list

# View MCP connection status in Claude Code
/mcp
```

## Advanced Configuration

### Custom Server Arguments
```bash
# Pass additional arguments to servers
claude mcp add myserver --env VAR=value \
  -- custom-server --arg1 value1 --arg2 value2
```

### Multiple Environment Variables
```bash
# Set multiple environment variables
claude mcp add server --env VAR1=value1 --env VAR2=value2 \
  -- server-command
```

### Server-Specific Configuration
Some servers support configuration files or additional setup. Check the documentation for each specific MCP server for detailed configuration options.

## Getting Help

- **MCP Documentation**: [https://modelcontextprotocol.io/](https://modelcontextprotocol.io/)
- **Claude Code Documentation**: [https://docs.anthropic.com/claude-code](https://docs.anthropic.com/claude-code)
- **Server Registry**: Browse available MCP servers and their documentation
- **Community Support**: Join discussions about MCP implementation and best practices

## Examples

### Complete Workflow Example
```bash
# 1. Add GitHub integration
claude mcp add --project github --env GITHUB_TOKEN=ghp_xxxxxxxxxxxx \
  -- npx -y @modelcontextprotocol/server-github

# 2. Add filesystem access
claude mcp add filesystem \
  -- npx -y @modelcontextprotocol/server-filesystem /home/user/projects

# 3. Add database connection
claude mcp add database --env DATABASE_URL=postgresql://user:pass@localhost/db \
  -- npx -y @modelcontextprotocol/server-postgres

# 4. Verify all servers
claude mcp list
```

This enables Claude Code to:
- Read and create GitHub issues and PRs
- Access and modify project files
- Query and analyze database information
- Coordinate between all these systems for complex workflows