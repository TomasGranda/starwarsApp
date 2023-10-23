FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install\
    && npm install typescript -g

COPY . .

ENV PORT 8080
EXPOSE 8080

RUN tsc
CMD [ "node", "dist/index.js" ]
