# Build stage
FROM node:16-alpine AS build
WORKDIR /app
COPY package.json .
COPY package-lock.json .  
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM scratch
WORKDIR /app
COPY --from=build /app/package.json .
COPY --from=build /app/dist ./dist
EXPOSE 3000
CMD ["node", "server.js"]

