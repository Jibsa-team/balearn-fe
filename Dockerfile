FROM node:22-bookworm-slim AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_LOGIN_PROVIDERS
ARG MEDIA_IMAGE_BASE_URLS
ARG DIRECT_MEDIA_IMAGES
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL \
    NEXT_PUBLIC_LOGIN_PROVIDERS=$NEXT_PUBLIC_LOGIN_PROVIDERS \
    MEDIA_IMAGE_BASE_URLS=$MEDIA_IMAGE_BASE_URLS \
    DIRECT_MEDIA_IMAGES=$DIRECT_MEDIA_IMAGES \
    NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM node:22-bookworm-slim
WORKDIR /app
ENV NODE_ENV=production HOSTNAME=0.0.0.0 PORT=3000 NEXT_TELEMETRY_DISABLED=1
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
COPY --from=builder --chown=node:node /app/public ./public
RUN mkdir -p .next/cache && chown node:node .next/cache
USER node
EXPOSE 3000
CMD ["node", "server.js"]
