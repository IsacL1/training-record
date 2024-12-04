# Dockerfile
FROM node:23
WORKDIR /usr/src/web/training-record/frontend
COPY package*.json /usr/src/web/training-record/frontend
RUN yarn install
COPY . /usr/src/web/training-record/frontend
RUN yarn build
# frontend port
EXPOSE 6660 
CMD ["yarn", "start:frontend", "--port", "6660"]