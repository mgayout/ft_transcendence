# syntax=docker/dockerfile:1
# escape=\

FROM hashicorp/vault@sha256:c51bb287709b74daefab32d1246cac767c32b8c73cb86509957634dffcd66a0e

RUN apk update \
	&& apk upgrade \
	&& apk add vim curl

COPY --chown=vault:vault ./conf/config/vault.hcl /vault/config/vault.hcl

RUN chmod 640 /vault/config/vault.hcl

CMD ["vault", "server", "-config=/vault/config/vault.hcl"]
