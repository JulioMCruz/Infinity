# Running Multiple Characters

This guide explains how to run multiple Eliza characters using the provided script.

## Prerequisites

- Node.js and npm installed
- Eliza CLI installed (`npm install -g @elizaos/cli`)
- Character configuration files in the `characters/` directory

## Using the Script

1. Make the script executable:
```bash
chmod +x scripts/run-characters.sh
```

2. Run the script:
```bash
./scripts/run-characters.sh
```

## Available Options

The script provides the following options:

1. **Run Sales Analytics AI**
   - Launches the Sales Analytics character
   - Focused on sales data analysis and reporting

2. **Run Business Insights AI**
   - Launches the Business Insights character
   - Focused on performance analytics and trends

3. **Run Infinity AgentKit AI**
   - Launches the Infinity AgentKit character
   - Focused on blockchain-based operations

4. **Run All Characters**
   - Launches all characters simultaneously
   - Each character runs in its own process

## Running Characters Manually

You can also run characters manually using the Eliza CLI:

### Single Character
```bash
npx eliza start characters/sales.character.json
```

### Multiple Characters (Different Terminals)
```bash
# Terminal 1
npx eliza start characters/sales.character.json

# Terminal 2
npx eliza start characters/insights.character.json

# Terminal 3
npx eliza start characters/infinity-agentkit.character.json
```

## Tips

1. When running multiple characters:
   - Each character runs in its own process
   - Characters can be accessed through their respective ports
   - Use different terminals for better monitoring

2. Resource considerations:
   - Running multiple characters requires more system resources
   - Monitor system performance when running all characters
   - Close unused characters to free up resources

3. Debugging:
   - Check individual character logs for issues
   - Characters can be stopped individually
   - Use Ctrl+C to stop characters in terminal

## Troubleshooting

If you encounter issues:

1. Ensure all character files exist in the correct location
2. Check that all required plugins are installed
3. Verify environment variables are set correctly
4. Check system resources availability
5. Review character logs for specific errors
