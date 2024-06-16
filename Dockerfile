# Stage 1: Build the React application
FROM node:14 as build

WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Set the environment variable REACT_APP_API_URL
ENV REACT_APP_API_URL=http://backend:8080

# Build the application
RUN npm run build

# Stage 2: Serve the built application with Nginx
FROM nginx:alpine

# Copy the built files from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 3000

# Run Nginx
CMD ["nginx", "-g", "daemon off;"]
