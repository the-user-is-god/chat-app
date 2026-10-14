# syntax=docker/dockerfile:1

# ---- Build stage ----
FROM node:24-bookworm-slim AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# prisma.config.ts validates DATABASE_URL, but generate never connects to the DB
RUN DATABASE_URL="postgresql://mock:mock@localhost:5432/mock" npx prisma generate
RUN npm run build

# ---- Production stage ----
FROM node:24-bookworm-slim AS production
ENV NODE_ENV=production \
    PORT=10000
WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --from=builder --chown=node:node /app/dist ./dist

USER node
EXPOSE 10000

# run node directly: proper signal handling, no npm wrapper process
CMD ["node", "dist/server.js"]