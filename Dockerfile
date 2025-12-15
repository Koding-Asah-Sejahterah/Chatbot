FROM node:lts as builder

WORKDIR /app

COPY package*.json ./
COPY . .

RUN npm install
RUN npm run build

FROM node:lts-slim
WORKDIR /app
COPY --from=builder /app/build ./build
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.env ./

CMD ["node", "--env-file=.env", "build/index.js"]



EXPOSE 3000