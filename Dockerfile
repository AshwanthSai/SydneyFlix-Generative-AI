# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.10.0

################################################################################
# Base stage
FROM node:${NODE_VERSION}-alpine AS base
WORKDIR /usr/src/app

################################################################################
# Dependencies stage
FROM base AS deps
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev --force

################################################################################
# Build stage
FROM deps AS build
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --force

COPY . .
ARG REACT_APP_TMDBKEY
ARG REACT_APP_ALAN_KEY
ENV REACT_APP_TMDBKEY=${REACT_APP_TMDBKEY}
ENV REACT_APP_ALAN_KEY=${REACT_APP_ALAN_KEY}
RUN npm run build

################################################################################
# Production stage
FROM nginx:stable-alpine AS production
COPY --from=build /usr/src/app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s \
    CMD wget --quiet --tries=1 --spider http://localhost:80/ || exit 1
CMD ["nginx", "-g", "daemon off;"]