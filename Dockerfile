# Base image
FROM node:latest

# Create package.json file in container file system
COPY package*.json ./
# Install dependencies
RUN npm run dev
# Copy all other files to container file system
COPY . . 

EXPOSE 3000
# command to run when intantiate an image
CMD ["npm", "run", "dev"]