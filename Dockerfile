
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm run build

FROM node:18
WORKDIR /app
COPY --from=build /app/package*.json ./
COPY --from=build /app/dist ./dist
COPY --from=build /app/.env.production ./dist
RUN npm install 
EXPOSE 3000

CMD ["npm", "run", "start"]
