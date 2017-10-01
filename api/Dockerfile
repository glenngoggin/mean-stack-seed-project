FROM node:6.10.1
MAINTAINER Glenn Goggin <glennpgoggin@gmail.com>
RUN mkdir -p /app

WORKDIR /app
COPY package.json /app/
RUN npm cache clean

# Install Global Build Dependencies
RUN npm install -g migrate
RUN npm install -g mongoose-migrate-2
RUN npm install -g node-mongo-seeds
RUN npm install -g mongodb-backup-cli

COPY . /app/
RUN npm install
EXPOSE 3000
CMD [ "npm", "start" ]
