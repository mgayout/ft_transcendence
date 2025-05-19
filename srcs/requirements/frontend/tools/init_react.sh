#!/bin/sh

echo "REACT_APP_DOMAIN_NAME='$DOMAIN_NAME'" >> /home/frontend/.env
echo "REACT_APP_PORT_NUM='$PORT_NUM'" >> /home/frontend/.env

npx serve /home/frontend/dist
