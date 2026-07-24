#!/bin/bash

# ============================================================================
# Color Codes
# ============================================================================
RED="\033[0;31m"
GREEN="\033[0;32m"
YELLOW="\033[1;33m"
BOLD_GREEN="\033[1;32m"
RESET="\033[0m"

clear

echo -e "${BOLD_GREEN}=======================================================================${RESET}"
echo -e "${BOLD_GREEN}                  🚀  NEST.JS PROJECT STATISTICS TOOL  🚀                       ${RESET}"
echo -e "${BOLD_GREEN}=======================================================================${RESET}"
echo
echo -e "${GREEN}Welcome!${RESET}"
echo
echo -e "${YELLOW}This script will analyze your Nest.js project and generate:${RESET}"
echo
echo -e "${GREEN}  ✔ ${RESET} Total Lines of Code"
echo -e "${GREEN}  ✔ ${RESET} Modules"
echo -e "${GREEN}  ✔ ${RESET} Controllers"
echo -e "${GREEN}  ✔ ${RESET} Services"
echo -e "${GREEN}  ✔ ${RESET} DTOs"
echo -e "${GREEN}  ✔ ${RESET} Entities"
echo -e "${GREEN}  ✔ ${RESET} Guards"
echo -e "${GREEN}  ✔ ${RESET} Interceptors"
echo -e "${GREEN}  ✔ ${RESET} Filters"
echo -e "${GREEN}  ✔ ${RESET} Pipes"
echo -e "${GREEN}  ✔ ${RESET} Middleware"
echo -e "${GREEN}  ✔ ${RESET} Decorators"
echo -e "${GREEN}  ✔ ${RESET} Enums"
echo -e "${GREEN}  ✔ ${RESET} Interfaces"
echo -e "${GREEN}  ✔ ${RESET} Unit Test Files"
echo
echo -e "${YELLOW}Scanning project... Please wait.${RESET}"
echo -e "${BOLD_GREEN}-------------------------------------------------------------------------${RESET}"
echo