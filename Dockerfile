<<<<<<< HEAD
    FROM node:latest 
    WORKDIR /app
    COPY . .
    RUN npm install
    EXPOSE 4000
    ENTRYPOINT npm run dev
=======

FROM node:18 AS build

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm run build

FROM node:18
WORKDIR /app
COPY --from=build /app/package*.json ./
COPY --from=build /app/dist ./dist
RUN npm install 
EXPOSE 3000

CMD ["npm", "run", "start"]
>>>>>>> origin/QA
