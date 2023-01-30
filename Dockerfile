### STAGE 1: Build ###
#FROM node:12.7-alpine AS build
FROM node:14.16.0 AS build
RUN npm config set registry http://registry.npmjs.org/

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ARG environment
ENV PORT=$environment
RUN echo "Oh dang look at port ${PORT}"

COPY package.json ./
RUN npm config set registry http://registry.npmjs.org/
RUN npm install
RUN npm install @types/core-js --save-dev



# Bundle app source
COPY . /usr/src/app

EXPOSE 80
