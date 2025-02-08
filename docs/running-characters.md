# Running Multiple Characters

This guide explains how to run multiple Eliza characters using the provided script.

## Prerequisites

- Node.js installed
- pnpm installed
- Character configuration files in `Eliza/characters/` directory

## Using the Script

1. Make the script executable:
```bash
chmod +x scripts/run-characters.sh
```

2. Run the script:
```bash
./scripts/run-characters.sh
```

The script will automatically:
1. Install dependencies (`pnpm install --no-frozen-lockfile`)
2. Build the project (`pnpm build`)
3. Start the client (`pnpm start:client`)
4. Present options to run characters

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

## Manual Setup

You can also set up and run characters manually:

### Installation and Build
```bash
cd Eliza
pnpm install --no-frozen-lockfile
pnpm build
pnpm start:client
```

### Running Characters

#### Single Character
```bash
cd Eliza
npx eliza start characters/sales.character.json
```

#### Multiple Characters (Different Terminals)
```bash
# Terminal 1
cd Eliza
npx eliza start characters/sales.character.json

# Terminal 2
cd Eliza
npx eliza start characters/insights.character.json

# Terminal 3
cd Eliza
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
   - Check individual character logs in the Eliza directory
   - Characters can be stopped individually
   - Use Ctrl+C to stop characters in terminal

## Troubleshooting

If you encounter issues:

1. Try rebuilding the project:
   ```bash
   cd Eliza
   pnpm install --no-frozen-lockfile
   pnpm build
   ```

2. Common checks:
   - Ensure all character files exist in the correct location
   - Check that all required plugins are installed
   - Verify environment variables are set correctly
   - Check system resources availability
   - Review character logs for specific errors

3. Client Issues:
   - If the client isn't responding, try restarting it:
     ```bash
     pkill -f "pnpm start:client"
     pnpm start:client
