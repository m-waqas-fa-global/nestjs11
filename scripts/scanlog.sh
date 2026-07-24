echo "Call Terminal Commands from a Script - Daily Script"

# age=19;

# if [ $age -gt 18 ]; then
#     echo "Age is greater than 18"  
# else 
#     echo "Age is not greater than 18"
# fi

# Define ANSI color codes

BOLD_RED="\033[1;31m"
BOLD_GREEN="\033[1;32m"
BOLD_CYAN="\033[1;36m"
RESET="\033[0m"
 
# Main Script Banner
echo -e "${BOLD_GREEN}=========================================================================${RESET}"
echo -e "${BOLD_GREEN}  RUNNING DAILY SCRIPT: Checking for console.log statements in src   ${RESET}"
echo -e "${BOLD_GREEN}=========================================================================${RESET}"
echo ""

# Search for console.logs only inside the src/app directory
LOG_MATCHES=$(grep -rn --exclude-dir={node_modules,dist,build,.next} "console.log" src)

# Check if the variable contains any text
if [ -n "$LOG_MATCHES" ]; then
    echo "❌ console.log statements found in src:"
    echo "$LOG_MATCHES"
else
    echo "✅ No console.log statements found in src."
fi