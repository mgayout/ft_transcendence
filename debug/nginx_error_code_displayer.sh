#!/bin/bash

set -e

#								Récapitulatif rapide
# |---------|-----------------------------------|---------------|------------------|
# | Méthode	| Usage principal					| Idempotent	| Corps de requête |
# |---------|-----------------------------------|---------------|------------------|
# | GET		| Lire / récupérer					| Oui			| Non              |
# | POST	| Créer / envoyer données			| Non			| Oui              |
# | PUT		| Mettre à jour / remplace			| Oui			| Oui              |
# | DELETE	| Supprimer							| Oui			| Généralement non |
# | PATCH	| Mettre à jour partiellement		| Parfois		| Oui              |
# | HEAD	| Récupérer headers seulement		| Oui			| Non              |
# | OPTIONS	| Demander les méthodes supportées	| Oui			| Non              |
# |---------|-----------------------------------|---------------|------------------|


RED='\033[0;41m'
YELLOW='\033[0;43m'
CYAN='\033[0;46m'
NC='\033[0m'

error_code=$(docker logs nginx 2>&1 | cut -d ' ' -f 9 | uniq | grep -E '^[3-5][0-9][0-9]')

for code in $error_code; do
	if echo "$code" | grep -q '^3'; then
		COLOR=$CYAN
	elif echo "$code" | grep -q '^4'; then
		COLOR=$YELLOW
	else
		COLOR=$RED
	fi

	echo "${COLOR}----- Logs for status code: $code -----${NC}"
	docker logs nginx 2>&1 | grep $code | sed G
done
