FROM node:latest

COPY package*.json ./
RUN npm run dev
COPY . . 

EXPOSE 3000

CMD ["npm", "run", "dev"]