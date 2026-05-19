# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=builder /app/.next/static /usr/share/nginx/html/_next/static
COPY --from=builder /app/public /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
