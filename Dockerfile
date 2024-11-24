FROM loadimpact/k6:latest

# Copy your k6 script into the container
COPY loadtest.js /scripts/loadtest.js

# Set the default command to run the k6 script
CMD ["run", "/scripts/loadtest.js"]
