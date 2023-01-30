### STAGE 1: Build ###
FROM node:16.13.2 AS build
WORKDIR /usr/src/app
ARG environment
ENV PORT=$environment
RUN echo "Oh dang look at port ${PORT}"

COPY package.json ./
RUN npm config set registry http://registry.npmjs.org/ 
RUN npm install


COPY . .
#RUN ng serve

#RUN npm run build:${PORT}
RUN npm run build
### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY --from=build /usr/src/app/dist/report_engine /usr/share/nginx/html
#COPY ./lxp.crt /etc/ssl/certs/
#COPY ./lxp.key /etc/ssl/certs/
EXPOSE 80