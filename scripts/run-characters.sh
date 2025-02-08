#!/bin/bash

# Colors for better readability
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Eliza directory path (relative to script location)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ELIZA_DIR="$SCRIPT_DIR/../Eliza"

# Setup and start client
echo -e "${YELLOW}Installing dependencies...${NC}"
cd "$ELIZA_DIR" && pnpm install --no-frozen-lockfile

echo -e "${YELLOW}Building project...${NC}"
pnpm build

echo -e "${YELLOW}Starting client...${NC}"
pnpm start:client &

# Wait for client to start
sleep 5

# Function to display available characters
show_characters() {
    echo -e "${BLUE}Available Characters:${NC}"
    echo "1) Sales Analytics AI"
    echo "2) Business Insights AI"
    echo "3) Infinity AgentKit AI"
    echo "4) All Characters"
    echo "q) Quit"
}

# Function to run a specific character
run_character() {
    local char_path=$1
    echo -e "${GREEN}Starting character: $char_path${NC}"
    cd "$ELIZA_DIR" && npx eliza start characters/$char_path
}

# Main menu loop
while true; do
    show_characters
    read -p "Select a character to run (1-4, q to quit): " choice
    
    case $choice in
        1)
            run_character "sales.character.json"
            ;;
        2)
            run_character "insights.character.json"
            ;;
        3)
            run_character "infinity-agentkit.character.json"
            ;;
        4)
            echo -e "${GREEN}Starting all characters...${NC}"
            cd "$ELIZA_DIR"
            npx eliza start characters/sales.character.json &
            npx eliza start characters/insights.character.json &
            npx eliza start characters/infinity-agentkit.character.json &
            ;;
        q|Q)
            echo "Exiting..."
            pkill -f "pnpm start:client"
            exit 0
            ;;
        *)
            echo "Invalid option. Please try again."
            ;;
    esac
done
