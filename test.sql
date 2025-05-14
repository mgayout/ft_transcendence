Sur service_user_handler_postgresql
docker exec -it service_user_handler_postgresql psql -U biaroun -d transcendence 
CREATE USER replicator WITH PASSWORD 'azerty' REPLICATION;
GRANT USAGE ON SCHEMA public TO replicator;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO replicator;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO replicator;


Sur service_game_pong_postgresql
docker exec -it service_game_pong_postgresql psql -U biaroun -d transcendence
CREATE USER replicator WITH PASSWORD 'azerty' REPLICATION;
GRANT USAGE ON SCHEMA public TO replicator;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO replicator;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO replicator;

Sur service_live_chat_postgresql
docker exec -it service_live_chat_postgresql psql -U biaroun -d transcendence
CREATE USER replicator WITH PASSWORD 'azerty' REPLICATION;
GRANT USAGE ON SCHEMA public TO replicator;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO replicator;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO replicator;

Sur service_user_handler_postgresql (publier auth_user et les modèles partagés):
docker exec -it service_user_handler_postgresql psql -U biaroun -d transcendence
CREATE PUBLICATION auth_user_pub FOR TABLE auth_user;
CREATE PUBLICATION shared_models_pub FOR TABLE shared_models_player, shared_models_block, shared_models_friendship;


Sur service_game_pong_postgresql (publier tournament et match):
docker exec -it service_game_pong_postgresql psql -U biaroun -d transcendence
CREATE PUBLICATION tournament_match_pub FOR TABLE shared_models_tournament, shared_models_match;

Sur service_game_pong_postgresql:
docker exec -it service_game_pong_postgresql psql -U biaroun -d transcendence
CREATE SUBSCRIPTION game_sub_auth_user 
CONNECTION 'host=service_user_handler_postgresql dbname=transcendence user=replicator password=azerty'
PUBLICATION auth_user_pub;

CREATE SUBSCRIPTION game_sub_player_data 
CONNECTION 'host=service_user_handler_postgresql dbname=transcendence user=replicator password=azerty'
PUBLICATION shared_models_pub;


Sur service_live_chat_postgresql (s abonner à auth_user, shared_models, tournament et match):
docker exec -it service_live_chat_postgresql psql -U biaroun -d transcendence
CREATE SUBSCRIPTION chat_sub_auth_user 
CONNECTION 'host=service_user_handler_postgresql dbname=transcendence user=replicator password=azerty'
PUBLICATION auth_user_pub;

CREATE SUBSCRIPTION chat_sub_tournament_data 
CONNECTION 'host=service_game_pong_postgresql dbname=transcendence user=replicator password=azerty'
PUBLICATION tournament_match_pub;

CREATE SUBSCRIPTION chat_sub_player_data 
CONNECTION 'host=service_user_handler_postgresql dbname=transcendence user=replicator password=azerty'
PUBLICATION shared_models_pub;

Sur service_user_handler_postgresql (s abonner à tournament et match):
docker exec -it service_user_handler_postgresql psql -U biaroun -d transcendence
CREATE SUBSCRIPTION user_sub_tournament_data 
CONNECTION 'host=service_game_pong_postgresql dbname=transcendence user=replicator password=azerty'
PUBLICATION tournament_match_pub;
