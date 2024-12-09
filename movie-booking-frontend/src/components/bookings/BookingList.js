import React, { useEffect, useState } from 'react';
import { fetchBookings } from '../../services/api';

const BookingList = ({ selectedCity }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBookings = async () => {
      try {
        const response = await fetchBookings();
        const filteredBookings = selectedCity 
          ? response.data.filter(booking => 
              booking.show.screen.theater.location.city === selectedCity)
          : response.data;
        setBookings(filteredBookings);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch bookings');
        setLoading(false);
      }
    };

    getBookings();
  }, [selectedCity]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="booking-list">
      <h2>My Bookings</h2>
      <div className="booking-grid">
        {bookings.map(booking => (
          <div key={booking.id} className="booking-card">
            <h3>Booking #{booking.id}</h3>
            <p>Status: {booking.status}</p>
            <p>Seats: {booking.number_of_seats}</p>
            <p>Total Amount: ${booking.total_amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingList;