#!/bin/bash
# Color codes
RED="\033[0;31m"
GREEN="\033[0;32m"
YELLOW="\033[1;33m"
BOLD_GREEN="\033[1;32m"
RESET="\033[0m"

# Main Script Banner
echo -e "${BOLD_GREEN}=========================================================================${RESET}"
echo -e "${BOLD_GREEN}  RUNNING SCRIPT: Nest.js Project Statistics  ${RESET}"
echo -e "${BOLD_GREEN}=========================================================================${RESET}"

echo "Services:"
find src -name "*.service.ts" | wc -l

echo "Modules:"
find src -name "*.module.ts" | wc -l

echo "Controllers:"
find src -name "*.controller.ts" | wc -l