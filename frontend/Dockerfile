# Stage 1: Build the Angular application
FROM node:18.19.0 AS build
WORKDIR /app

# Copy package.json and package-lock.json first for better caching
COPY ./package*.json ./
RUN npm install --legacy-peer-deps

# Copy the rest of the application
COPY ./ ./

# Build the application for production
RUN npm run build -- --configuration=production

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

# Copy the build output to replace the default nginx contents
COPY --from=build /app/dist/argon-design-system-angular/ /usr/share/nginx/html/

# Configure Nginx for Angular routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Add health check
HEALTHCHECK --interval=30s --timeout=3s CMD wget -q --spider http://localhost/ || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
