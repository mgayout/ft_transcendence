.PHONY: all clean fclean re

all:

	@sudo chmod 600 ./srcs/requirements/hashicorp_vault/postgresql/conf/server.key
	@sudo chown 70:root ./srcs/requirements/hashicorp_vault/postgresql/conf/root.crt \
						./srcs/requirements/hashicorp_vault/postgresql/conf/server.crt \
						./srcs/requirements/hashicorp_vault/postgresql/conf/server.key

	@sudo mkdir -p ./srcs/requirements/service_user_handler/postgresql/conf/data/pg_serial \
					./srcs/requirements/service_user_handler/postgresql/conf/data/pg_stat_tmp \
					./srcs/requirements/service_user_handler/postgresql/conf/data/pg_snapshots \
					./srcs/requirements/service_user_handler/postgresql/conf/data/pg_twophase \
					./srcs/requirements/service_user_handler/postgresql/conf/data/pg_replslot \
					./srcs/requirements/service_user_handler/postgresql/conf/data/pg_wal/archive_status \
					./srcs/requirements/service_user_handler/postgresql/conf/data/pg_dynshmem \
					./srcs/requirements/service_user_handler/postgresql/conf/data/pg_tblspc \
					./srcs/requirements/service_user_handler/postgresql/conf/data/pg_commit_ts \
					./srcs/requirements/service_user_handler/postgresql/conf/data/pg_notify \
					./srcs/requirements/service_user_handler/postgresql/conf/data/pg_logical/mappings \
					./srcs/requirements/service_user_handler/postgresql/conf/data/pg_logical/snapshots \
					./srcs/requirements/hashicorp_vault_sealer/postgresql/conf/data/pg_serial \
					./srcs/requirements/hashicorp_vault_sealer/postgresql/conf/data/pg_stat_tmp \
					./srcs/requirements/hashicorp_vault_sealer/postgresql/conf/data/pg_snapshots \
					./srcs/requirements/hashicorp_vault_sealer/postgresql/conf/data/pg_twophase \
					./srcs/requirements/hashicorp_vault_sealer/postgresql/conf/data/pg_replslot \
					./srcs/requirements/hashicorp_vault_sealer/postgresql/conf/data/pg_wal/archive_status \
					./srcs/requirements/hashicorp_vault_sealer/postgresql/conf/data/pg_dynshmem \
					./srcs/requirements/hashicorp_vault_sealer/postgresql/conf/data/pg_tblspc \
					./srcs/requirements/hashicorp_vault_sealer/postgresql/conf/data/pg_commit_ts \
					./srcs/requirements/hashicorp_vault_sealer/postgresql/conf/data/pg_notify \
					./srcs/requirements/hashicorp_vault_sealer/postgresql/conf/data/pg_logical/mappings \
					./srcs/requirements/hashicorp_vault_sealer/postgresql/conf/data/pg_logical/snapshots \
					./srcs/requirements/hashicorp_vault/postgresql/conf/data/pg_serial \
					./srcs/requirements/hashicorp_vault/postgresql/conf/data/pg_stat_tmp \
					./srcs/requirements/hashicorp_vault/postgresql/conf/data/pg_snapshots \
					./srcs/requirements/hashicorp_vault/postgresql/conf/data/pg_twophase \
					./srcs/requirements/hashicorp_vault/postgresql/conf/data/pg_replslot \
					./srcs/requirements/hashicorp_vault/postgresql/conf/data/pg_wal/archive_status \
					./srcs/requirements/hashicorp_vault/postgresql/conf/data/pg_dynshmem \
					./srcs/requirements/hashicorp_vault/postgresql/conf/data/pg_tblspc \
					./srcs/requirements/hashicorp_vault/postgresql/conf/data/pg_commit_ts \
					./srcs/requirements/hashicorp_vault/postgresql/conf/data/pg_notify \
					./srcs/requirements/hashicorp_vault/postgresql/conf/data/pg_logical/mappings \
					./srcs/requirements/hashicorp_vault/postgresql/conf/data/pg_logical/snapshots \
					./srcs/requirements/service_game_pong/postgresql/conf/data/pg_serial \
					./srcs/requirements/service_game_pong/postgresql/conf/data/pg_stat_tmp \
					./srcs/requirements/service_game_pong/postgresql/conf/data/pg_snapshots \
					./srcs/requirements/service_game_pong/postgresql/conf/data/pg_twophase \
					./srcs/requirements/service_game_pong/postgresql/conf/data/pg_replslot \
					./srcs/requirements/service_game_pong/postgresql/conf/data/pg_wal/archive_status \
					./srcs/requirements/service_game_pong/postgresql/conf/data/pg_dynshmem \
					./srcs/requirements/service_game_pong/postgresql/conf/data/pg_tblspc \
					./srcs/requirements/service_game_pong/postgresql/conf/data/pg_commit_ts \
					./srcs/requirements/service_game_pong/postgresql/conf/data/pg_notify \
					./srcs/requirements/service_game_pong/postgresql/conf/data/pg_logical/mappings \
					./srcs/requirements/service_game_pong/postgresql/conf/data/pg_logical/snapshots \
					./srcs/requirements/service_live_chat/postgresql/conf/data/pg_serial \
					./srcs/requirements/service_live_chat/postgresql/conf/data/pg_stat_tmp \
					./srcs/requirements/service_live_chat/postgresql/conf/data/pg_snapshots \
					./srcs/requirements/service_live_chat/postgresql/conf/data/pg_twophase \
					./srcs/requirements/service_live_chat/postgresql/conf/data/pg_replslot \
					./srcs/requirements/service_live_chat/postgresql/conf/data/pg_wal/archive_status \
					./srcs/requirements/service_live_chat/postgresql/conf/data/pg_dynshmem \
					./srcs/requirements/service_live_chat/postgresql/conf/data/pg_tblspc \
					./srcs/requirements/service_live_chat/postgresql/conf/data/pg_commit_ts \
					./srcs/requirements/service_live_chat/postgresql/conf/data/pg_notify \
					./srcs/requirements/service_live_chat/postgresql/conf/data/pg_logical/mappings \
					./srcs/requirements/service_live_chat/postgresql/conf/data/pg_logical/snapshots

	@if [ ! -d "./volume/smart_contract" ]; then \
		sudo mkdir -p "./volume/smart_contract"; \
	fi

	@if [ ! -d "./volume/static/static_service_app" ]; then \
		sudo mkdir -p "./volume/static/static_service_app"; \
	fi

	@if [ ! -d "./volume/service_app/django" ]; then \
		sudo mkdir -p "./volume/service_app/django"; \
	fi

	@if [ ! -d "./volume/service_app/postgresql" ]; then \
		sudo mkdir -p "./volume/service_app/postgresql"; \
	fi

	@if [ ! -d "./volume/static/static_service_chat" ]; then \
		sudo mkdir -p "./volume/static/static_service_chat"; \
	fi

	@if [ ! -d "./volume/service_chat/django" ]; then \
		sudo mkdir -p "./volume/service_chat/django"; \
	fi

	@if [ ! -d "./volume/service_chat/postgresql" ]; then \
		sudo mkdir -p "./volume/service_chat/postgresql"; \
	fi

	@if [ ! -d "./volume/eventbus" ]; then \
		sudo mkdir -p "./volume/eventbus"; \
	fi

	@sudo docker compose -f ./srcs/docker-compose.yml up -d --build

	@printf "\033[00;32mDebezium source connectors create\033[00m\n"

	@while ! docker compose -f ./srcs/docker-compose.yml exec debezium /bin/bash /connectors/source.sh -eq 0; do \
		sleep 1; \
	done

	@printf "\033[00;32mDebezium sink connectors create\033[00m\n"

	@while ! docker compose -f ./srcs/docker-compose.yml exec debezium /bin/bash /connectors/sink.sh -eq 0; do \
		sleep 1; \
	done

	@sudo docker compose -f ./srcs/docker-compose.yml exec vault_sealer vault operator unseal XSlqgv8XRbzSyytnbzck3V2nQHWdB/1/o4IIzJhdvVzQ
	@sudo docker compose -f ./srcs/docker-compose.yml exec vault_sealer vault operator unseal x9Pcd9kSLALh4i7PgEW/6Kke2Swd8Ambyo/z12OgQIrA
	@sudo docker compose -f ./srcs/docker-compose.yml exec vault_sealer vault operator unseal +CveHjrkub3mRvRItUMni2zhx5Z3zuuUk+ccUypr+kDX

clean:

	@sudo docker compose -f ./srcs/docker-compose.yml down

fclean: clean

	@if [ $$(sudo docker images -qa | wc -l) -ne 0 ]; then \
		sudo docker rmi -f $(shell sudo docker images -qa); \
	fi

	@if [ $$(sudo docker network ls -q | wc -l) -ne 0 ]; then \
		sudo docker network prune -f; \
	fi

	@if [ $$(sudo docker volume ls -q | wc -l) -ne 0 ]; then \
		sudo docker volume rm -f $(shell sudo docker volume ls -q); \
	fi

re: fclean all
