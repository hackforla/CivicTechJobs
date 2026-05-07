# Stage container for the Next.js frontend.
#
# Three-stage build:
#   1. deps     - install npm packages from the lockfile
#   2. builder  - run `next build` (output goes to .next/)
#   3. runner   - minimal runtime image that runs `next start`
#
# No source mount in stage - the build artifact is baked into the
# image. `develop.watch` is intentionally omitted; stage exists to
# verify the production-shape build, not to iterate on source.

# Stage 1: dependencies
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Stage 2: build
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Stage 3: runtime
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.ts ./next.config.ts

EXPOSE 3000

CMD ["npm", "start"]
