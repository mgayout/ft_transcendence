DROP ROLE IF EXISTS replicator;
CREATE ROLE replicator WITH LOGIN PASSWORD 'replicator_password' REPLICATION;

GRANT ALL ON DATABASE transcendence TO replicator;

DROP SUBSCRIPTION IF EXISTS user_sub_chat;
CREATE SUBSCRIPTION user_sub_chat
CONNECTION 'host=service_user_handler_postgresql port=5432 dbname=transcendence user=replicator password=replicator_password'
PUBLICATION user_pub
WITH (create_slot = true);

DROP SUBSCRIPTION IF EXISTS game_sub_chat;
CREATE SUBSCRIPTION game_sub_chat
CONNECTION 'host=service_game_pong_postgresql port=5432 dbname=transcendence user=replicator password=replicator_password'
PUBLICATION game_pub
WITH (create_slot = true);
