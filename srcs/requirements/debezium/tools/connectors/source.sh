#!/bin/sh

curl -sf -H 'Content-Type: application/json' debezium:8083/connectors --data '{
  "name": "postgres-source-connector",
  "config": {
    "connector.class": "io.debezium.connector.postgresql.PostgresConnector",
    "tasks.max": "1",
    "plugin.name": "pgoutput",
    "database.hostname": "service_chat_postgresql",
    "database.port": "5432",
    "database.user": "postgresuser",
    "database.password": "postgrespw",
    "database.dbname": "pandashop",
    "database.server.name": "service_chat_postgresql",
    "table.include.list": "public.pong_article",
    "topic.prefix": "dbz",
    "database.time_zone": "UTC"
  }
}' \
&& echo -e "\n" \
&& curl -sf -H 'Content-Type: application/json' debezium:8083/connectors --data '{
  "name": "postgres-source-connector_2",
  "config": {
    "connector.class": "io.debezium.connector.postgresql.PostgresConnector",
    "tasks.max": "1",
    "plugin.name": "pgoutput",
    "database.hostname": "service_chat_postgresql",
    "database.port": "5432",
    "database.user": "postgresuser",
    "database.password": "postgrespw",
    "database.dbname": "pandashop",
    "database.server.name": "service_chat_postgresql",
    "table.include.list": "public.pong_article",
    "topic.prefix": "dbz",
    "database.time_zone": "UTC"
  }
}' \
&& echo -e "\n" \
&& curl -sf -H 'Content-Type: application/json' debezium:8083/connectors --data '{
  "name": "postgres-source-connector_3",
  "config": {
    "connector.class": "io.debezium.connector.postgresql.PostgresConnector",
    "tasks.max": "1",
    "plugin.name": "pgoutput",
    "database.hostname": "service_user_handler_postgresql",
    "database.port": "5432",
    "database.user": "biaroun",
    "database.password": "azerty",
    "database.dbname": "transcendence",
    "database.server.name": "service_user_handler_postgresql",
    "table.include.list": "public.shared_models_player, public.shared_models_block, public.shared_models_friendship, public.shared_models_tournament, public.shared_models_match",
    "topic.prefix": "dbz",
    "database.time_zone": "UTC"
  }
}' \
&& echo -e "\n" \
