#!/bin/bash

# Path to your existing script
# Get the current working directory
current_directory=$(pwd)

# Append '/run.sh' to the path
SCRIPT_PATH="${current_directory}/run.sh"
# Optional argument for the script, if needed
OPTIONAL_ARG="$1"

# Check if the cron job already exists
CRON_JOB="0 0 * * * $SCRIPT_PATH $OPTIONAL_ARG"
(crontab -l | grep -Fq "$CRON_JOB") && echo "Cron job already exists" || (crontab -l 2>/dev/null; echo "$CRON_JOB") | crontab -

# Make the original script executable
chmod +x "$SCRIPT_PATH"

echo "Cron job setup complete."