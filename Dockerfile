# Base Node.js image
FROM node:20 AS base

# Create app directory
RUN mkdir /consulting-admin
WORKDIR /consulting-admin

COPY package*.json .
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the Next.js application
RUN npm run build

# Expose port
EXPOSE 8080

# Start Nginx server
CMD ["npm", "start"]
