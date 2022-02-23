# Base image
FROM node:latest

# copying all the files from your file system to container file system
COPY . /bk
# make file system workdir to develop inside the container
WORKDIR /bk

# Create package.json file in container file system
COPY package*.json ./

# Install dependencies
RUN npm install
# Copy all other files to container file system
COPY . . 

EXPOSE 4000

# command to run when intantiate an image
CMD ["npm", "start"]