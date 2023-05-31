FROM node:18.16.0

WORKDIR /app

COPY . .

RUN yarn install

EXPOSE 3000

CMD ["node", "server"]