FROM node:10-alpine
EXPOSE 5000

# Install PM2 globally
RUN npm install pm2 -g

# Set working directory
WORKDIR /app

# SERVER
# ===================================================================
WORKDIR /app
# Copy installation files and run npm install
COPY ["./package.json", "./package-lock.json", "./"]

RUN npm install --production


# Copy scripts
COPY [ "./build_subscriber.js", "./server.js", \
    "./ecosystem.config.js", "./"]

# Set production environment
ENV NODE_ENV production

# Start services
CMD ["pm2-runtime", "start", "ecosystem.config.js"]



