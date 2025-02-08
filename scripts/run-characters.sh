#!/bin/bash

# Colors for better readability
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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
    npx eliza start characters/$char_path
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
            npx eliza start characters/sales.character.json &
            npx eliza start characters/insights.character.json &
            npx eliza start characters/infinity-agentkit.character.json &
            ;;
        q|Q)
            echo "Exiting..."
            exit 0
            ;;
        *)
            echo "Invalid option. Please try again."
            ;;
    esac
done
