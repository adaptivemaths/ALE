FROM node:14.17.0
COPY backend/src backend/src/
COPY backend/sql backend/sql/
COPY backend/package.json package.json
RUN yarn install
CMD yarn run start