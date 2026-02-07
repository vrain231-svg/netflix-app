# Use official Node.js LTS image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json/yarn.lock
COPY package.json ./
# If you use npm:
COPY package-lock.json ./
# If you use yarn, uncomment the next line:
# COPY yarn.lock ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js app
RUN npm run build

# Expose port (default for Next.js)
EXPOSE 80

# Start the app on port 80
CMD ["npm", "run", "start", "--", "-p", "80"]