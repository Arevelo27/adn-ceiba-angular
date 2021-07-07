#Primera Etapa
FROM node:14.17-alpine3.13 as build-step

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build --prod

#Segunda Etapa
FROM nginx:1.20.1-alpine
	#Si estas utilizando otra aplicacion cambia PokeApp por el nombre de tu app
COPY --from=build-step /app/dist/app-base /usr/share/nginx/html

# Tutorial 
# https://amoelcodigo.com/docker-angular-app/