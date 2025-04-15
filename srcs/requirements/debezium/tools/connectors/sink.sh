#!/bin/sh

curl -sf -H 'Content-Type: application/json' debezium:8083/connectors --data '{
  "name": "postgres-sink-connector",
  "config": {
    "connector.class": "io.debezium.connector.jdbc.JdbcSinkConnector",
    "tasks.max": "1",
    "connection.url": "jdbc:postgresql://service_app_postgresql:5432/pandashop",
    "connection.username": "postgresuser",
    "connection.password": "postgrespw",
    "insert.mode": "upsert",
    "delete.enabled": "true",
    "primary.key.mode": "record_key",
    "schema.evolution": "basic",
    "database.time_zone": "UTC",
    "topics": "dbz.public.pong_article"
  }
}' \
&& echo -e "\n" \
&& curl -sf -H 'Content-Type: application/json' debezium:8083/connectors --data '{
  "name": "postgres-sink-connector_2",
  "config": {
    "connector.class": "io.debezium.connector.jdbc.JdbcSinkConnector",
    "tasks.max": "1",
    "connection.url": "jdbc:postgresql://service_live_chat_postgresql:5432/transcendence",
    "connection.username": "biaroun",
    "connection.password": "azerty",
    "insert.mode": "upsert",
    "delete.enabled": "true",
    "primary.key.mode": "record_key",
    "schema.evolution": "basic",
    "database.time_zone": "UTC",
    "topics": "dbz.public.shared_models_player"
  }
}' \
&& echo -e "\n" \
&& curl -sf -H 'Content-Type: application/json' debezium:8083/connectors --data '{
  "name": "postgres-sink-connector_3",
  "config": {
    "connector.class": "io.debezium.connector.jdbc.JdbcSinkConnector",
    "tasks.max": "1",
    "connection.url": "jdbc:postgresql://service_live_chat_postgresql:5432/transcendence",
    "connection.username": "biaroun",
    "connection.password": "azerty",
    "insert.mode": "upsert",
    "delete.enabled": "true",
    "primary.key.mode": "record_key",
    "schema.evolution": "basic",
    "database.time_zone": "UTC",
    "topics": "dbz.public.shared_models_friendship"
  }
}' \
&& echo -e "\n" \
&& curl -sf -H 'Content-Type: application/json' debezium:8083/connectors --data '{
  "name": "postgres-sink-connector_4",
  "config": {
    "connector.class": "io.debezium.connector.jdbc.JdbcSinkConnector",
    "tasks.max": "1",
    "connection.url": "jdbc:postgresql://service_live_chat_postgresql:5432/transcendence",
    "connection.username": "biaroun",
    "connection.password": "azerty",
    "insert.mode": "upsert",
    "delete.enabled": "true",
    "primary.key.mode": "record_key",
    "schema.evolution": "basic",
    "database.time_zone": "UTC",
    "topics": "dbz.public.shared_models_block"
  }
}' \
&& echo -e "\n" \
&& curl -sf -H 'Content-Type: application/json' debezium:8083/connectors --data '{
  "name": "postgres-sink-connector_5",
  "config": {
    "connector.class": "io.debezium.connector.jdbc.JdbcSinkConnector",
    "tasks.max": "1",
    "connection.url": "jdbc:postgresql://service_live_chat_postgresql:5432/transcendence",
    "connection.username": "biaroun",
    "connection.password": "azerty",
    "insert.mode": "upsert",
    "delete.enabled": "true",
    "primary.key.mode": "record_key",
    "schema.evolution": "basic",
    "database.time_zone": "UTC",
    "topics": "dbz.public.shared_models_tournament"
  }
}' \
&& echo -e "\n" \
&& curl -sf -H 'Content-Type: application/json' debezium:8083/connectors --data '{
  "name": "postgres-sink-connector_6",
  "config": {
    "connector.class": "io.debezium.connector.jdbc.JdbcSinkConnector",
    "tasks.max": "1",
    "connection.url": "jdbc:postgresql://service_live_chat_postgresql:5432/transcendence",
    "connection.username": "biaroun",
    "connection.password": "azerty",
    "insert.mode": "upsert",
    "delete.enabled": "true",
    "primary.key.mode": "record_key",
    "schema.evolution": "basic",
    "database.time_zone": "UTC",
    "topics": "dbz.public.shared_models_match"
  }
}' \
&& echo -e "\n" \
