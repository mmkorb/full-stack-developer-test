# Step 1: Build the application
FROM node:16-alpine AS build

WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package.json package-lock.json ./

# Install production and development dependencies
RUN npm install

# Copy the source code into the container
COPY . ./

# Compile the application
RUN npm run build

# Step 2: Serve the application with http-server
FROM node:16-alpine

WORKDIR /app

# Install http-server globally
RUN npm install -g http-server

# Copy the build files from the previous step
COPY --from=build /app/build ./build

# Exposing ports 3000 and 5000
EXPOSE 3000 5000

# Command to run the http-server on port 3000
CMD ["http-server", "build", "-p", "3000", "-c-1"]
