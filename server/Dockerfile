FROM node:alpine

WORKDIR /app

COPY package*.json /app/

RUN npm install --silent

COPY . /app

ENV NODE_ENV production

EXPOSE 5000

CMD ["npm", "start"]