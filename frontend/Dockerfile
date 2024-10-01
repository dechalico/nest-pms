FROM node:20.15.0-alpine3.20

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i; \
  else echo "Lockfile not found." && exit 1; \
  fi

ENV NODE_ENV=production

RUN npm run build

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nuxtjs -u 1001

COPY --chown=nuxtjs:nodejs . ./.output

USER nuxtjs

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]