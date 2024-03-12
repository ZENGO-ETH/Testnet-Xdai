FROM node:19.3-bullseye
ENV NODE_ENV production

WORKDIR /usr/src/app
COPY . /usr/src/app

COPY package*.json ./

RUN yarn set version latest
RUN yarn install
RUN yarn run build

COPY . .

EXPOSE 443
EXPOSE 80
EXPOSE 8080

CMD [ "yarn", "start" ]
