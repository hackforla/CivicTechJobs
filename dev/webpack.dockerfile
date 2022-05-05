FROM node:18

WORKDIR /code


# install app dependencies
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install


# add app
COPY . .