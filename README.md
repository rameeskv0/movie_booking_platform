# Movie Booking Platform

A full-stack web application for booking movie tickets, built with Django REST Framework and React, containerized with Docker.

## Features

- User Authentication with JWT
- Movie and Theater Management
- Show Scheduling
- Seat Selection and Booking
- Admin Dashboard
- Location-based Theater Search

## Tech Stack

- **Backend**: Django REST Framework
- **Frontend**: React
- **Database**: SQLite
- **Authentication**: JWT (djangorestframework-simplejwt)
- **Containerization**: Docker & Docker Compose

## Prerequisites

- Docker
- Docker Compose

## Quick Start

1. Clone the repository: 
```bash
git clone https://github.com/rameeskv0/movie_booking_platform.git
cd movie_booking_platform
```

2. Build and start the application:
```bash
# Build the images
docker-compose build

# Start the services in detached mode
docker-compose up -d

# Check the logs (optional)
docker-compose logs -f
```

3. Initialize the database:
```bash
# Create data directory
mkdir -p data

# Run migrations
docker-compose exec backend python manage.py migrate

# Create superuser (if needed)
docker-compose exec backend python manage.py createsuperuser
```

4. Access the applications:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000/api
- Admin Interface: http://localhost:8000/admin

Default admin credentials:
- Username: ramees
- Password: 12345

## Project Structure

```
movie_booking_platform/
├── docker/                 # Docker configuration
│   ├── backend/           # Backend Dockerfile
│   └── frontend/          # Frontend Dockerfile
├── movie-booking-frontend/# React frontend application
├── authentication/        # Django authentication app
├── bookings/             # Booking management app
├── theaters/             # Theater management app
├── core/                 # Django core settings
├── docker-compose.yml    # Docker compose configuration
└── requirements.txt      # Python dependencies
```

## API Endpoints

- Authentication:
  - POST `/api/auth/login/` - User login
  - POST `/api/auth/register/` - User registration

- Theaters:
  - GET `/api/theaters/` - List theaters
  - GET `/api/theaters/<id>/` - Theater details

- Movies:
  - GET `/api/movies/` - List movies
  - GET `/api/movies/<id>/` - Movie details

- Shows:
  - GET `/api/shows/` - List shows
  - GET `/api/shows/<id>/` - Show details

- Bookings:
  - POST `/api/bookings/` - Create booking
  - GET `/api/bookings/` - List user bookings

## Development

### Backend Development

```bash
# Access backend shell
docker-compose exec backend python manage.py shell

# Create migrations
docker-compose exec backend python manage.py makemigrations

# Apply migrations
docker-compose exec backend python manage.py migrate

# Create superuser
docker-compose exec backend python manage.py createsuperuser
```

### Frontend Development

```bash
# Access frontend shell
docker-compose exec frontend sh

# Install new packages
docker-compose exec frontend npm install [package-name]
```

## Docker Commands

```bash
# Build the images
docker-compose build

# Start the services
docker-compose up -d

# View logs
docker-compose logs -f

# View logs for specific service
docker-compose logs -f backend
docker-compose logs -f frontend

# Stop services
docker-compose down

# Stop services and remove volumes
docker-compose down -v

# Rebuild and restart services
docker-compose down
docker-compose build
docker-compose up -d

# Check running containers
docker-compose ps

# Restart a specific service
docker-compose restart backend
docker-compose restart frontend

# Execute commands in containers
docker-compose exec backend python manage.py shell
docker-compose exec frontend npm install [package-name]

# Clean up everything (use with caution)
docker-compose down -v
docker system prune -f
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Contact

Ramees KV - [@rameeskv0](https://github.com/rameeskv0)

Project Link: [https://github.com/rameeskv0/movie_booking_platform](https://github.com/rameeskv0/movie_booking_platform)