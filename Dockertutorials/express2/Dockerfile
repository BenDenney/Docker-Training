FROM node:alpine3.10
COPY package.json package.json
RUN npm install
COPY ./app ./app
EXPOSE 80
CMD ["node", "app/server.js"]