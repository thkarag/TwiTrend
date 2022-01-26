FROM node:latest


COPY . /fr
#WORKDIR /app
WORKDIR /fr
   
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3000 

CMD ["npm", "start"]