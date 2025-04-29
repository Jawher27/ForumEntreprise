#!/bin/bash

cd /app

# Only build if not already built (can be removed if you want always rebuild)
if [ ! -d "dist/argon-design-system-angular" ]; then
  echo "Building Angular app..."
  #npm run build -- --configuration=production
fi

echo "Starting NGINX..."
cat /etc/nginx/conf.d/default.conf
nginx -g 'daemon off;'

