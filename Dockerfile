FROM nginx:alpine

LABEL version="1.1"
LABEL description="una pagina de juegos"
LABEL maintainer="Luis"

# Limpia solo el contenido, no el folder
RUN rm -rf /usr/share/nginx/html/*

# Copia todo el sitio
COPY . /usr/share/nginx/html/

# Permisos correctos
RUN chmod -R 755 /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
