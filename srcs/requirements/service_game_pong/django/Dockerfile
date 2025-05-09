# syntax=docker/dockerfile:1
# escape=\

FROM python@sha256:2003de5fe1ed2b09578778c83fc0a6a199a443077b5d9d02a3bd04a6ef5ea9f4

#args of build
ARG APP_DIR=/django_web_app
ARG ENV_DIR=$APP_DIR/.env/bin/activate

#Installing utils
RUN apk update \
	&& apk upgrade \
	&& apk add vim postgresql-dev postgresql-client gcc python3-dev musl-dev redis

RUN mkdir $APP_DIR /static
WORKDIR $APP_DIR

COPY ./conf/requirements.txt .
COPY ./conf/manage.py .

RUN	python3 -m venv .env \
	&& source $ENV_DIR \
	&& pip install --upgrade pip \
	&& pip install -r requirements.txt

RUN source $ENV_DIR \
	&& python3 manage.py startapp core

COPY ./tools/init.sh ./init.sh
RUN chmod +x init.sh

EXPOSE 8000

CMD ["./init.sh"]
