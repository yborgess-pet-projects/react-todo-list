FROM node:22-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

# Set up the production environment
FROM nginx:1.27

# Install dnsutils and vi
RUN apt-get update && apt-get install -y dnsutils vim iputils-ping

# Default listen port
ENV ENV_FRONT_LISTEN_PORT=8080

# Uses the local resolvers included in nginx for the DNS resolution of the backend
ENV NGINX_ENTRYPOINT_LOCAL_RESOLVERS=on

# Remove the default nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy the compiled app to the nginx directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the nginx configuration
COPY nginx/nginx.conf /etc/nginx/templates/nginx.conf.template

EXPOSE $ENV_FRONT_LISTEN_PORT
CMD ["nginx-debug", "-g", "daemon off;"]

