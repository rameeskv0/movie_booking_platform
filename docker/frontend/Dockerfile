FROM node:16

WORKDIR /app

COPY movie-booking-frontend/package*.json ./
RUN npm install

COPY movie-booking-frontend/ ./

EXPOSE 3000

CMD ["npm", "start"]