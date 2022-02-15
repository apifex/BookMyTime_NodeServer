# syntax=docker/dockerfile:1

FROM node:14.18.1

ENV GOOGLE_APPLICATION_CREDENTIALS_PATH=./src/config/calendar-325805-76f604d33727.json EMAIL=admin@apifex.pl PORT=3000

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm ci

COPY . .

RUN npm run build

CMD ["npm", "start"]
