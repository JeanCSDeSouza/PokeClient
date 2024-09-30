# Usar a imagem oficial do Nginx
FROM nginx:alpine

# Instalar utilitários como envsubst para substituir as variáveis de ambiente
RUN apk add --no-cache bash curl gettext

# Copiar o arquivo de configuração do Nginx
COPY ./nginx.conf /etc/nginx/nginx.conf

# Copiar todos os arquivos HTML, CSS e JS para o diretório padrão do Nginx
COPY . /usr/share/nginx/html

# Copiar o script de inicialização que fará a substituição das variáveis de ambiente
COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Expor a porta 80 para o tráfego HTTP
EXPOSE 80

# Usar o script de inicialização que fará a substituição das variáveis
CMD ["/entrypoint.sh"]