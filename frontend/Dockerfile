FROM node:20.15.0-alpine3.20 as builder

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN npm ci && npm cache clean --force

COPY . .

RUN npm run build

FROM node:20.15.0-alpine3.20

WORKDIR /app

ENV NODE_ENV=production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nuxtjs -u 1001

COPY --from=builder /app/.output/public ./.output/public
COPY --from=builder --chown=nuxtjs:nodejs /app/.output/server ./.output/server
COPY --from=builder --chown=nuxtjs:nodejs /app/.output/nitro.json ./.output/nitro.json

USER nuxtjs

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]