# Stage 1: Build the React app
FROM node:20 AS build

WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy all source code and build the app
COPY . .
RUN npm run build

# Stage 2: Serve app with Nginx
FROM nginx:alpine

# Remove default Nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy build output from Stage 1
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom Nginx config for React Router
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
