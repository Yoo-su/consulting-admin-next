# Base Node.js image
FROM node:20 AS base

# Create app directory
WORKDIR /consulting-admin

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_MOCKING

ENV NEXT_PUBLIC_BASE_URL=${NEXT_PUBLIC_BASE_URL}
ENV NEXT_PUBLIC_MOCKING=${NEXT_PUBLIC_MOCKING}

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Expose port
EXPOSE 3000

# Start Nginx server
CMD ["npm", "start"]
