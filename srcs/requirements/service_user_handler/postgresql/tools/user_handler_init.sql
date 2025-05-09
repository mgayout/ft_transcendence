-- Créer l'utilisateur replicator
CREATE ROLE replicator WITH LOGIN PASSWORD 'replicator_password' REPLICATION;

GRANT ALL ON DATABASE transcendence TO replicator;

GRANT ALL ON TABLE public.auth_user TO replicator;
GRANT ALL ON TABLE public.shared_models_player TO replicator;
GRANT ALL ON TABLE public.shared_models_block TO replicator;
GRANT ALL ON TABLE public.shared_models_friendship TO replicator;

-- Créer la publication
CREATE PUBLICATION user_pub FOR TABLE 
    public.auth_user,
    public.shared_models_player,
    public.shared_models_block,
    public.shared_models_friendship;

-- Créer la souscription pour game_pong
CREATE SUBSCRIPTION game_sub_user
CONNECTION 'host=service_game_pong_postgresql port=5432 dbname=transcendence user=replicator password=replicator_password'
PUBLICATION game_pub
WITH (create_slot = true);
