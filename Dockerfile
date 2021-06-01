FROM node:14.17.0
COPY src src/
COPY package.json package.json
RUN npm i
CMD npm run start