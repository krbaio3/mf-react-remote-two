# Etapa 1: Construcción con Node.js y esbuild
FROM node:20-alpine AS build

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el package.json y el yarn.lock para instalar dependencias
COPY package.json yarn.lock ./

# Instala las dependencias
RUN yarn install --frozen-lockfile

# Copia el resto de los archivos del proyecto al contenedor
COPY . .

# Ejecuta el script de construcción con esbuild
RUN yarn build

# Etapa 2: Servir con Nginx
FROM nginx:stable-alpine

# Copia los archivos construidos desde la etapa de construcción
COPY --from=build /app/dist /usr/share/nginx/html

# Copia el archivo de configuración de Nginx personalizado si es necesario
COPY nginx.conf /etc/nginx/nginx.conf

# Exponer el puerto 80 para servir el contenido
EXPOSE 80

# Inicia Nginx
CMD ["nginx", "-g", "daemon off;"]
