FROM node:14-alpine AS node

# Builder stage

FROM node AS builder

# Use /app as the CWD
WORKDIR /app            

# Copy package.json and package-lock.json to /app
COPY package*.json ./   

# Install all dependencies
RUN npm ci               

# Copy the rest of the code
COPY . .    

# Open desired port
ENV PORT=3000
EXPOSE 3000

# Use js files to run the application
ENTRYPOINT ["node", "./bin/www"]