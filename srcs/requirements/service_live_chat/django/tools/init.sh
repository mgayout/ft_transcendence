#!/bin/sh

# Lancer Redis en arrière-plan avec des options pour minimiser les risques
redis-server --daemonize yes --maxmemory 256mb --maxmemory-policy allkeys-lru --save "" || { echo "Échec du démarrage de Redis"; exit 1; }

# Attendre que Redis soit prêt
until redis-cli ping | grep -q PONG; do
  echo "En attente de Redis..."
  sleep 1
done

echo "Redis fonctionnel"

sed -i "s/\${DOMAIN_NAME}/$DOMAIN_NAME/g" /django_web_app/django_live_chat/settings.py

source /django_web_app/.env/bin/activate \
	&& python3 manage.py makemigrations shared_models --no-input \
	&& python3 manage.py migrate --fake-initial --no-input \
	&& python3 manage.py makemigrations core --no-input \
	&& python3 manage.py migrate --fake-initial --no-input \
	&& daphne -b 0.0.0.0 -p 8000 django_live_chat.asgi:application
