# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.10.0

################################################################################
# Base stage
FROM node:${NODE_VERSION}-alpine as base
WORKDIR /usr/src/app

################################################################################
# Dependencies stage
FROM base as deps
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev --force

################################################################################
# Build stage
FROM deps as build

# Install all dependencies for build
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --force

# Copy source and build
COPY . .
RUN npm run build

################################################################################
# Production stage
FROM node:${NODE_VERSION}-alpine
WORKDIR /usr/src/app

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Install serve globally with proper permissions
RUN npm install -g serve && \
    chown -R appuser:appgroup /usr/src/app

# Copy build files with correct ownership
COPY --from=build --chown=appuser:appgroup /usr/src/app/build ./build

# Switch to non-root user
USER appuser

EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s \
    CMD wget --quiet --tries=1 --spider http://localhost:3000/ || exit 1

CMD ["serve", "-s", "build", "-l", "3000"]