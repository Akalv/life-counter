#!/bin/bash

# Script to restore oh-my-opencode.json from latest backup
# Run this if the agent configs have issues

set -e

BACKUP_DIR="$HOME/.config/opencode"
ORIGINAL_FILE="$BACKUP_DIR/oh-my-opencode.json"

# Find the latest backup file
LATEST_BACKUP=$(ls -t "$BACKUP_DIR"/oh-my-opencode.json.backup.* 2>/dev/null | head -1)

if [ -z "$LATEST_BACKUP" ]; then
    echo "Error: No backup files found"
    exit 1
fi

echo "Restoring from $LATEST_BACKUP"
cp "$LATEST_BACKUP" "$ORIGINAL_FILE"
echo "Restore completed!"