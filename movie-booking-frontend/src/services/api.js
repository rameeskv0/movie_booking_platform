import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Auth functions
export const register = (userData) => 
    axios.post(`${API_URL}auth/register/`, userData);

export const login = (credentials) => 
    axios.post(`${API_URL}auth/login/`, credentials);

// Add token to all requests
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Handle token expiration
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// API functions using axiosInstance
export const fetchLocations = () => axiosInstance.get('theaters/locations/');
export const fetchTheaters = () => axiosInstance.get('theaters/theaters/');
export const fetchScreens = () => axiosInstance.get('theaters/screens/');
export const fetchMovies = () => axiosInstance.get('theaters/movies/');
export const fetchShows = () => axiosInstance.get('theaters/shows/');
export const fetchBookings = () => axiosInstance.get('bookings/bookings/');

export const bookSeats = (showId, seats) => {
    console.log('Booking request:', { showId, seats });  // Debug log
    return axiosInstance.post('bookings/book-seats/', { 
        showId: parseInt(showId),  // Ensure showId is a number
        seats: seats 
    });
};

export const getBookedSeats = (showId) => 
    axiosInstance.get(`bookings/booked-seats/?showId=${showId}`);