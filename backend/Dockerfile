FROM node:latest

COPY . /bk
#WORKDIR /app
WORKDIR /bk

COPY package*.json ./
RUN npm install
COPY . . 

EXPOSE 4000

CMD ["npm", "start"]