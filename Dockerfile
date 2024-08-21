# Etapa 1: Construcción
FROM node:18 AS build

# Configura el directorio de trabajo
WORKDIR /app

# Copia los archivos de configuración y las dependencias
COPY package*.json ./
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Construye la aplicación (si tienes un paso de build)
RUN npm run build

# Etapa 2: Producción
FROM node:18

# Configura el directorio de trabajo
WORKDIR /app

# Copia solo los archivos necesarios desde la etapa de construcción
COPY --from=build /app/package*.json ./
COPY --from=build /app/dist ./dist

# Instala solo las dependencias necesarias para producción
RUN npm install --only=production

# Expone el puerto de la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
