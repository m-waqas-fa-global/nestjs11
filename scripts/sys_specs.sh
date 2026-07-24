#!/bin/bash

# Define text colors for better readability
TITLE='\033[1;36m'
LABEL='\033[1;32m'
NC='\033[0m' # No Color

echo -e "${TITLE}========================================"
echo -e "           SYSTEM SPECIFICATIONS        "
echo -e "========================================${NC}"

# 1. Operating System Info
echo -e "${LABEL}[ Operating System ]${NC}"
if [ -f /etc/os-release ]; then
    # Extract pretty name from os-release
    OS_NAME=$(grep '^PRETTY_NAME=' /etc/os-release | cut -d= -f2 | tr -d '"')
    echo "OS: $OS_NAME"
else
    echo "OS: $(uname -s)"
fi
echo "Kernel: $(uname -r)"
echo "Architecture: $(uname -m)"
echo ""

# 2. CPU Specs
echo -e "${LABEL}[ CPU Information ]${NC}"
if [ -f /proc/cpuinfo ]; then
    CPU_MODEL=$(grep -m 1 'model name' /proc/proc/cpuinfo 2>/dev/null | cut -d: -f2 | sed 's/^[ \t]*//')
    # Fallback for alternative architectures like ARM/Raspberry Pi
    [ -z "$CPU_MODEL" ] && CPU_MODEL=$(grep -m 1 'Hardware' /proc/cpuinfo | cut -d: -f2 | sed 's/^[ \t]*//')
    
    CPU_CORES=$(nproc)
    echo "Model: $CPU_MODEL"
    echo "Cores: $CPU_CORES"
else
    echo "CPU Info: Not available via /proc/cpuinfo"
fi
echo ""

# 3. RAM Specs
echo -e "${LABEL}[ Memory / RAM ]${NC}"
if command -v free &> /dev/null; then
    # Extract data using awk from the 'free -h' command
    free -h | awk '/^Mem:/ {print "Total RAM: " $2 "\nUsed RAM:  " $3 "\nFree RAM:  " $4}'
else
    echo "RAM Info: 'free' command not found."
fi
echo ""

# 4. Storage Specs
echo -e "${LABEL}[ Disk Storage (Root File System) ]${NC}"
if command -v df &> /dev/null; then
    # Grab the usage line for the root disk directory '/'
    df -h / | awk 'NR==2 {print "Total Space: " $2 "\nUsed Space:  " $3 "\nAvailable:   " $4 " (" $5 " utilized)"}'
else
    echo "Storage Info: 'df' command not found."
fi

echo -e "${TITLE}========================================${NC}"
