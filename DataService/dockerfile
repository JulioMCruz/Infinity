# nodejs version 22.11.0
FROM node:22.11.0

WORKDIR /usr/src/app

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy source code
COPY . .

# Build the application
RUN yarn build

# Expose port
EXPOSE 4000

# Start the application
CMD ["yarn", "local"]