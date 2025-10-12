# Use Node.js 18 LTS
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the server
RUN npm run build:server

# Expose port (Railway will set PORT environment variable)
EXPOSE $PORT

# Start the server
CMD ["npm", "run", "start:server"]