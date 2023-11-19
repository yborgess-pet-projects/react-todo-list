FROM node:21 AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Set up the production environment
FROM nginx:1.25.3
# Install dnsutils and vi
RUN apt-get update && apt-get install -y dnsutils vim iputils-ping
ENV ENV_FRONT_LISTEN_PORT=8080
ENV NGINX_ENTRYPOINT_LOCAL_RESOLVERS=on

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/templates/nginx.conf.template

EXPOSE $ENV_FRONT_LISTEN_PORT
CMD ["nginx-debug", "-g", "daemon off;"]