# Production Dockerfile for LPU Campus Navigator
FROM node:20-alpine AS runner

WORKDIR /app

# Set production environment
ENV NODE_ENV=production
ENV PORT=3000

# Copy application files
COPY package.json ./
RUN npm install --omit=dev --ignore-scripts || true

COPY . .

# Run as non-root user
USER node

EXPOSE 3000

CMD ["node", "server.js"]
