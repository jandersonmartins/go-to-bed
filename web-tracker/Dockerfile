FROM node:alpine

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

EXPOSE 3000

ENV PORT=3000
ENV BROWSER=none

CMD [ "yarn", "start" ]
