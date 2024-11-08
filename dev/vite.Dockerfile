# Use official Node.js 20 as base image
FROM node:20-alpine3.19

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Expose port 5175 for the client
EXPOSE 5175

# Start the Vite client in development mode
CMD [ "npm", "run", "dev" ]
