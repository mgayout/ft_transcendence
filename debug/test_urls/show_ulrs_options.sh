#!/bin/bash

set -e

RED='\033[1;31m'
GREEN='\033[1;32m'
NC='\033[0m'

while IFS= read -r adr; do
    [[ -z "$adr" ]] && continue
    # Récupérer la sortie grep dans une variable
    allow_headers=$(curl -vk -X OPTIONS "https://$(hostname --short):4343/$adr" 2>&1 | grep -i allow || true)
    if [[ -n "$allow_headers" ]]; then
        echo -e "${GREEN}>>> /$adr: $allow_headers${NC}"
    else
        echo -e "${RED}>>> /$adr: No allow headers${NC}"
    fi
done < adresses
