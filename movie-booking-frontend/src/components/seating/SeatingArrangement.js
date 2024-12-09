import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { bookSeats, getBookedSeats } from '../../services/api';
import './SeatingArrangement.css';

const SeatingArrangement = () => {
  const location = useLocation();
  const { showId: urlShowId } = useParams();
  const navigate = useNavigate();
  const seatingCapacity = location.state?.seatingCapacity;
  const showId = urlShowId || location.state?.showId;

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);

  useEffect(() => {
    const fetchBookedSeats = async () => {
      try {
        const response = await getBookedSeats(showId);
        setBookedSeats(response.data.bookedSeats);
      } catch (error) {
        console.error('Failed to fetch booked seats', error);
      }
    };

    if (showId) {
      fetchBookedSeats();
    }
  }, [showId]);

  useEffect(() => {
    // Check for authentication when component mounts
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  if (!seatingCapacity) {
    return <div>No seating capacity provided.</div>;
  }

  const premiumSeats = Math.ceil(seatingCapacity * 0.1);
  const middleSeats = Math.ceil(seatingCapacity * 0.6);
  const frontSeats = seatingCapacity - premiumSeats - middleSeats;

  const handleSeatClick = (seatLabel) => {
    if (bookedSeats.includes(seatLabel)) return; // Prevent selecting booked seats
    setSelectedSeats((prevSelectedSeats) =>
      prevSelectedSeats.includes(seatLabel)
        ? prevSelectedSeats.filter((seat) => seat !== seatLabel)
        : [...prevSelectedSeats, seatLabel]
    );
  };

  const handleConfirmBooking = () => {
    if (selectedSeats.length === 0) {
        alert('Please select seats first');
        return;
    }
    
    // Calculate total amount (dummy calculation - $10 per seat)
    const totalAmount = selectedSeats.length * 10;
    
    // Navigate to payment page with booking details
    navigate('/payment', {
        state: {
            amount: totalAmount,
            showId: showId,
            selectedSeats: selectedSeats
        }
    });
  };

  const renderSeats = (count, type, startRow) => {
    const seats = [];
    const seatsPerRow = 10;
    const rows = Math.ceil(count / seatsPerRow);

    for (let row = 0; row < rows; row++) {
      for (let seat = 0; seat < seatsPerRow; seat++) {
        const seatIndex = row * seatsPerRow + seat;
        if (seatIndex >= count) break;
        const seatLabel = `${String.fromCharCode(65 + startRow + row)}${seat + 1}`;
        seats.push(
          <div
            key={seatLabel}
            className={`seat ${type} ${selectedSeats.includes(seatLabel) ? 'selected' : ''} ${bookedSeats.includes(seatLabel) ? 'booked' : ''}`}
            onClick={() => handleSeatClick(seatLabel)}
          >
            {seatLabel}
          </div>
        );
      }
    }
    return seats;
  };

  return (
    <div className="seating-arrangement">
      <div className="screen">Screen</div>
      <div className="seats front">{renderSeats(frontSeats, 'front', 0)}</div>
      <div className="seats middle">{renderSeats(middleSeats, 'middle', Math.ceil(frontSeats / 10))}</div>
      <div className="seats premium">{renderSeats(premiumSeats, 'premium', Math.ceil((frontSeats + middleSeats) / 10))}</div>
      <div className="selected-seats">
        <h3>Selected Seats: {selectedSeats.join(', ')}</h3>
        <button onClick={handleConfirmBooking}>
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default SeatingArrangement;