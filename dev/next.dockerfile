# Dev container for the Next.js frontend.
#
# Pairs with docker-compose.yml's `next` service. Source is mounted via
# Compose `develop.watch` so edits hot-reload without rebuilding the image.
# The image rebuild is only needed when package.json/package-lock.json change.

FROM node:22-alpine

WORKDIR /usr/src/app

# Install deps from lockfile - reproducible across machines.
COPY package.json package-lock.json ./
RUN npm ci

# Source is mounted at runtime; this COPY exists so the image is self-contained
# for one-shot runs (e.g. `docker compose run next npm run lint`).
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
