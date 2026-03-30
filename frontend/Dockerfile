# Build stage
FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Accept the NEXT_PUBLIC_API_URL build argument
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app ./

EXPOSE 3000

CMD ["npm", "start"]