# # Here I will build a custom NGINX image
# # Here i pull the alpine linux version of nginx image to my local machine (becuase it more lightweight than the nginx:latest and also alpine is better for my project because its a small one and does not require big libraries and other tools) and build mu custom image on top of it
FROM nginx:alpine

# Copy the built files from the `dist` folder into NGINX's default html directory
COPY ./dist /usr/share/nginx/html

# Copy the custom Nginx configuration file into the container
COPY nginx.conf /etc/nginx/nginx.conf

# # Expose the port for nginx (default is 80 for nginx)
EXPOSE 80

# # This tells Docker to start the NGINX server when the container is run.
# # nginx -> starts the nginx server
CMD ["nginx", "-g", "daemon off;"]
