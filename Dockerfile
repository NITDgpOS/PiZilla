FROM node:alpine
LABEL MAINTAINER Naveen Kumar Sangi <naveenkumarsangi@protonmail.com>

ENV USER=node_server ROOT=/usr/src/app

EXPOSE 8000

WORKDIR $ROOT

ADD . $ROOT

RUN addgroup -S $USER && \
    adduser -h $ROOT -G $USER -S $USER

RUN npm install

RUN npm run build

RUN npm cache clean --force

CMD ["npm", "start"]
