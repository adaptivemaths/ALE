FROM node:14.17.0
COPY backend/src src/
COPY backend/package.json package.json
RUN yarn install
CMD yarn run start