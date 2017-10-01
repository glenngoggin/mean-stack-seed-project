FROM node:6.10.1
MAINTAINER Glenn Goggin <glennpgoggin@gmail.com>
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app/
RUN npm cache clean
RUN npm install typings --global
RUN npm install
COPY . /app/
EXPOSE 4200
CMD [ "npm", "start" ]
