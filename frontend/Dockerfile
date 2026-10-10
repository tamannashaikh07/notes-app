FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install frontend dependencies
RUN npm install

# Copy frontend source code
COPY . .

# Vite development server port
EXPOSE 5173

# Start Vite server accessible outside the container
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]