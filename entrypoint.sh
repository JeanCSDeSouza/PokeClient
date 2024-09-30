#!/bin/bash

# Substituir variáveis de ambiente nos arquivos HTML, JS ou CSS, se necessário
envsubst < /usr/share/nginx/html/static/spa2.js > /usr/share/nginx/html/static/spa2.js.tmp && mv /usr/share/nginx/html/static/spa2.js.tmp /usr/share/nginx/html/static/spa2.js

# Substituir variáveis de ambiente na configuração do Nginx (se houver)
envsubst '$$POKEAPI_URL' < /etc/nginx/nginx.conf > /etc/nginx/nginx.conf.tmp && mv /etc/nginx/nginx.conf.tmp /etc/nginx/nginx.conf

# Iniciar o Nginx
nginx -g 'daemon off;'
