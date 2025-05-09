CREATE ROLE replicator WITH LOGIN PASSWORD 'replicator_password' REPLICATION;

GRANT ALL ON DATABASE transcendence TO replicator;

GRANT ALL ON TABLE public.shared_models_tournament TO replicator;
GRANT ALL ON TABLE public.shared_models_match TO replicator;

CREATE PUBLICATION game_pub FOR TABLE public.shared_models_tournament, public.shared_models_match;

CREATE SUBSCRIPTION user_sub_game
CONNECTION 'host=service_user_handler_postgresql port=5432 dbname=transcendence user=replicator password=replicator_password'
PUBLICATION user_pub
WITH (create_slot = true);
