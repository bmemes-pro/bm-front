FROM node:16-alpine AS builder
ENV NODE_ENV=production
# Add a work directory
WORKDIR /app
# Cache and Install dependencies
COPY package*.json ./
RUN npm install
# Copy app files
COPY . ./
# Build the app
RUN npm run build

ENV PORT=3000
EXPOSE 3000

CMD ["node", "./server.js"]