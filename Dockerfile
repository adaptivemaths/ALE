FROM node:14.17.0
ADD backend /app/backend/
RUN yarn install
CMD yarn run start