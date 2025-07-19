# Use official Node.js image
FROM node:20

# Create app directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Build for production
RUN npm run build

# Expose the port
EXPOSE 3000

# Default command (can be overridden by docker-compose.override.yml)
CMD ["npm", "run", "start"]