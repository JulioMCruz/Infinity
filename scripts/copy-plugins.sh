#!/bin/bash

# Source and destination directories using relative paths
SOURCE_DIR="Eliza/packages"
DEST_DIR="ElizaPlugins"

# Array of plugins to copy
PLUGINS=(
    "plugin-infinity"
    "plugin-infinity-agentkit"
    "plugin-sales"
    "plugin-insights"
    "plugin-infinity-privy-nillion"
)

# Create destination directory if it doesn't exist
mkdir -p "$DEST_DIR"

# Copy each plugin
for plugin in "${PLUGINS[@]}"; do
    echo "Copying $plugin..."
    
    # Remove destination if it exists
    if [ -d "$DEST_DIR/$plugin" ]; then
        rm -rf "$DEST_DIR/$plugin"
    fi
    
    # Copy plugin directory
    cp -r "$SOURCE_DIR/$plugin" "$DEST_DIR/$plugin"
    
    if [ $? -eq 0 ]; then
        echo "✅ Successfully copied $plugin"
    else
        echo "❌ Failed to copy $plugin"
    fi
done

echo "🎉 Plugin copy completed!"
