#!/bin/sh

# Configuration file containing shortened versions and associated commands
config_file='alias-config.txt'

# Function to display help message
show_help() {
  echo "Usage: $0 <alias>"
  echo ""
  echo "Options:"
  echo "  -h   Show help message"
  echo ""
  echo "Available commands:"
  while IFS=':' read -r alias command || [ -n "$alias" ]; do
    printf "  %-8s %s\n" "$alias" "$command"
  done < "$config_file"
}

# If no arguments provided or the argument is -h, show help message
if [ $# -eq 0 ] || [ "$1" = "-h" ]; then
  show_help
  exit 0
fi

# Read the config file to find the matching shortened version
while IFS=':' read -r alias command; do
  if [ "$alias" = "$1" ]; then
    $command
    exit 0
  fi
done < "$config_file"

# If no matching shortened version is found, display an error message
echo "Unknown alias (shortcut name for command): $1"
echo "Run $0 -h for more information."
exit 1
