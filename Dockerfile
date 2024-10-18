FROM node:16
LABEL maintainer="abcd@gmail.com"
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm","start"]
