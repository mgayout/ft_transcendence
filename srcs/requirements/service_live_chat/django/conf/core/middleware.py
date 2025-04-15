from channels.middleware import BaseMiddleware
from django.conf import settings
from channels.db import database_sync_to_async
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from django.contrib.auth.models import AnonymousUser
from channels.auth import AuthMiddlewareStack
from shared_models.models import Player
import asyncio

# Middleware existant pour l'authentification JWT
@database_sync_to_async
def get_user_from_token(token):
    try:
        jwt_auth = JWTAuthentication()
        validated_token = jwt_auth.get_validated_token(token)
        user = jwt_auth.get_user(validated_token)
        return user
    except (InvalidToken, TokenError):
        return AnonymousUser()

class JWTAuthMiddleware(BaseMiddleware):
    def __init__(self, inner):
        self.inner = inner

    async def __call__(self, scope, receive, send):
        headers = dict(scope['headers'])
        token = None

        if b'authorization' in headers:
            auth_header = headers[b'authorization'].decode('utf-8')
            if auth_header.startswith('Bearer '):
                token = auth_header.split(' ')[1]

        if token:
            scope['user'] = await get_user_from_token(token)
            if scope['user'].is_authenticated:
                try:
                    player = await database_sync_to_async(lambda: scope['user'].player_profile)()
                    scope['player_id'] = player.id
                except Player.DoesNotExist:
                    scope['player_id'] = None
            else:
                scope['player_id'] = None
        else:
            scope['user'] = AnonymousUser()
            scope['player_id'] = None

        return await self.inner(scope, receive, send)

# Middleware pour vérifier ALLOWED_HOSTS
class AllowedHostsMiddleware(BaseMiddleware):
    def __init__(self, inner):
        self.inner = inner

    async def __call__(self, scope, receive, send):
        # Extraire l'en-tête Host
        host = None
        for header_name, header_value in scope['headers']:
            if header_name == b'host':
                host = header_value.decode('utf-8')
                break

        # Vérifier si l'hôte est dans ALLOWED_HOSTS
        if host:
            host_name = host.split(':')[0]
            if host_name not in settings.ALLOWED_HOSTS:
                # Accepter la connexion WebSocket
                await send({
                    'type': 'websocket.accept'
                })
                # Envoyer un message de fermeture
                await send({
                    'type': 'websocket.close',
                    'code': 3016,
                    'reason': 'Invalid Host header'
                })
                await asyncio.sleep(0.1)
                return

        return await self.inner(scope, receive, send)

# Mise à jour de CustomAuthMiddlewareStack pour inclure AllowedHostsMiddleware
def CustomAuthMiddlewareStack(inner):
    return AllowedHostsMiddleware(JWTAuthMiddleware(AuthMiddlewareStack(inner)))
