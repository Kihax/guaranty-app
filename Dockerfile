FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV WATCHPACK_POLLING=true

EXPOSE 3000

CMD ["npm", "run", "dev"]