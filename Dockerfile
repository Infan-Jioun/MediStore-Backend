FROM node:22-alpine

WORKDIR /app
RUN corepack enable && corepack prepare npm@10.20.0 --activate
COPY package.json npm-lock.yml ./
RUN npm install --frozen-lockfile
COPY . .
EXPOSE 5000
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/server.js"]
