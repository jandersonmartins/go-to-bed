FROM node:alpine

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

EXPOSE 4000

ENV PORT=4000
ENV BROWSER=none

CMD [ "yarn", "start" ]
