# Use official Node.js image as the base
FROM node:18

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy the rest of the source code
COPY . .

# Expose Next.js default dev port
EXPOSE 3000

# Start Next.js in development mode with hot-reloading
CMD ["npm", "run", "dev"]