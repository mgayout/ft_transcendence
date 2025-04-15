ui = false
#cluster_addr = "https://127.0.0.1:8201"
api_addr = "http://172.20.0.11:8100"
disable_mlock = false

storage "file" {
  path = "/vault/file"
}

#storage "postgresql" {
#  connection_url = "postgresql://vault_postgresql:postgrespw@vault_postgresql:5432/vault"
#}

#storage "postgresql" {
#  connection_url = "postgresql://vault_postgresql:postgrespw@vault_postgresql:5432/vault?sslmode=verify-full"
#  ssl_cert = "/vault/certs/server.crt"
#  ssl_key = "/vault/certs/server.key"
#  ssl_ca = "/vault/certs/root.crt"
#}

listener "tcp" {
  address = "172.20.0.11:8100"
  tls_disable = 1
#  tls_cert_file = "/vault/certs/vault-cert.pem"
#  tls_key_file = "/vault/certs/vault-key.pem"
}
