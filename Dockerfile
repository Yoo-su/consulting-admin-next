# Base Node.js image
FROM node:20 AS builder

# Create app directory
WORKDIR /consulting-admin

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_MOCKING

ENV NEXT_PUBLIC_BASE_URL=${NEXT_PUBLIC_BASE_URL}
ENV NEXT_PUBLIC_MOCKING=${NEXT_PUBLIC_MOCKING}

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Check if .next directory exists in the builder stage
RUN echo "Checking .next directory in builder stage:" && ls -la .next

# Production stage
FROM node:20-alpine AS production

# Install coreutils for stdbuf
RUN apk add --no-cache coreutils

WORKDIR /consulting-admin

# Copy built assets from the build stage
COPY --from=builder /consulting-admin/.next ./.next
RUN echo "Checking .next directory in production stage after COPY:" && ls -la .next

COPY --from=builder /consulting-admin/public ./public
COPY --from=builder /consulting-admin/package*.json ./

# Install production dependencies
RUN npm ci --omit=dev

# Check if .next directory exists after dependency installation
RUN echo "Checking .next directory in production stage after npm ci:" && ls -la .next

# Expose port
EXPOSE 3000

# Start the application with unbuffer to ensure logs are flushed
CMD ["/bin/sh", "-c", "echo 'Listing files in current directory:' && ls -la && echo 'Listing files in .next directory:' && ls -la .next && echo 'Starting Next.js...' && stdbuf -oL npm run start"]
