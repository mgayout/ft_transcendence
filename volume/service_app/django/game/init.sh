#!/bin/sh

sed -i "s/\${DOMAIN_NAME}/$DOMAIN_NAME/g" /django_web_app/game/game/settings.py

source /django_web_app/env/bin/activate \
    && python3 manage.py makemigrations --no-input \
    && python3 manage.py migrate --fake-initial --no-input \
    && python3 manage.py collectstatic --no-input \
	&& (
        python3 -c "import os; os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'game.settings'); import django; django.setup(); from django.contrib.auth.models import User; exit(0 if User.objects.filter(username='$SUPER_USER_NAME').exists() else 1)" \
        || \
        DJANGO_SUPERUSER_PASSWORD=$SUPER_USER_PASSWORD python3 manage.py createsuperuser --username $SUPER_USER_NAME --email $SUPER_USER_EMAIL --noinput) \
    && gunicorn --workers=9 game.wsgi:application --bind 0.0.0.0:8000
