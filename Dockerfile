### STAGE 1: Build ###
FROM node:14.16.0 AS build

RUN npm config set registry http://registry.npmjs.org/
#ENV REDIS=redis-master
#ENV REDIS_PORT=6379
# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

RUN npm install -g pptx2pdf

RUN \
  apt-get update && \
  apt-get -y install libasound2 && \
  apt-get install -y libnss3-dev libatk-bridge2.0-0 libxkbcommon-x11-0 libgtk-3-0 libgbm-dev && \
  apt-get install -y build-essential make gcc g++ python python-dev python-pip python-virtualenv && \
  apt-get -y install ghostscript && apt-get clean && \
  apt-get install -y libgs-dev && \
  rm -rf /var/lib/apt/lists/* 


# Bundle app source
COPY . /usr/src/app

EXPOSE 80