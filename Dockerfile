FROM node:alpine
LABEL maintainer "Naveen Kumar Sangi <nkprince007@gmail.com>"

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
