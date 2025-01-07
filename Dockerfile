# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/
# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

ARG NODE_VERSION=20.10.0

################################################################################
# Use node image for base image for all stages.
FROM node:${NODE_VERSION}-alpine as base

# Set working directory for all build stages.
WORKDIR /usr/src/app

################################################################################
# Create a stage for installing production dependecies.
FROM base as deps

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.npm to speed up subsequent builds.
# Leverage bind mounts to package.json and package-lock.json to avoid having to copy them
# into this layer.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev --force

################################################################################
# Create a stage for building the application.
FROM deps as build

ARG REACT_APP_TMDBKEY
ARG REACT_APP_ALAN_KEY
ARG TMDB_TEST_EMAIL
ARG TMDB_TEST_PASSWORD
ARG PROJECT_ID

ENV REACT_APP_TMDBKEY=${REACT_APP_TMDBKEY}
ENV REACT_APP_ALAN_KEY=${REACT_APP_ALAN_KEY}
ENV TMDB_TEST_EMAIL=${TMDB_TEST_EMAIL}
ENV TMDB_TEST_PASSWORD=${TMDB_TEST_PASSWORD}
ENV PROJECT_ID=${PROJECT_ID}

# Download additional development dependencies before building, as some projects require
# "devDependencies" to be installed to build. If you don't need this, remove this step.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --force

# Copy the rest of the source files into the image.
COPY . .

# Run the build script
RUN npm run build

################################################################################
# Production Stage
# FROM nginx:stable-alpine AS production
# COPY --from=build /usr/src/app/build /usr/share/nginx/html
# COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 8080
# HEALTHCHECK --interval=30s --timeout=3s \
#     CMD wget --quiet --tries=1 --spider http://localhost:8080/ || exit 1
# CMD ["nginx", "-g", "daemon off;"]

FROM nginx:stable-alpine AS production
COPY --from=build /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]