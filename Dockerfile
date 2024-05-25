# Base Node.js image
FROM node:20 AS base

# Create app directory
RUN mkdir /consulting-admin
WORKDIR /consulting-admin

COPY package*.json .
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

ARG BASE_URL
ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_MOCKING

ENV BASE_URL=${BASE_URL}
ENV NEXT_PUBLIC_BASE_URL=${NEXT_PUBLIC_BASE_URL}
ENV NEXT_PUBLIC_MOCKING=${NEXT_PUBLIC_MOCKING}

# Build the Next.js application
RUN npm run build

# Expose port
EXPOSE 3000

# Start Nginx server
CMD ["npm", "start"]
