#!/bin/bash

# Script to restore the latest backup of opencode.json
# Run this if the current config has issues

set -e

BACKUP_DIR="$HOME/.config/opencode"
ORIGINAL_FILE="$BACKUP_DIR/opencode.json"

# Find the latest backup file (sorted by modification time)
LATEST_BACKUP=$(ls -t "$BACKUP_DIR"/opencode.json.backup.* 2>/dev/null | head -1)

if [ -z "$LATEST_BACKUP" ]; then
    echo "Error: No backup files found in $BACKUP_DIR"
    echo "Available backups:"
    ls -la "$BACKUP_DIR"/opencode.json.backup.* 2>/dev/null || echo "None"
    exit 1
fi

echo "Found latest backup: $LATEST_BACKUP"
echo "Restoring to: $ORIGINAL_FILE"

# Backup current file before restore (extra safety)
if [ -f "$ORIGINAL_FILE" ]; then
    cp "$ORIGINAL_FILE" "$ORIGINAL_FILE.temp"
    echo "Current config backed up to $ORIGINAL_FILE.temp"
fi

# Restore from backup
cp "$LATEST_BACKUP" "$ORIGINAL_FILE"

echo "Restore completed successfully!"
echo "Restart OpenCode CLI to apply changes: opencode --restart"