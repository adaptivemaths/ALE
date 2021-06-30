FROM node:14.17.0
ADD backend /app/
RUN yarn install
CMD yarn run start