import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Payment.css';
import { bookSeats } from '../../services/api';

const Payment = () => {
    const [upiId, setUpiId] = useState('');
    const [isUpiVerified, setIsUpiVerified] = useState(false);
    const [upiPin, setUpiPin] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const { amount, showId, selectedSeats } = location.state || {};

    const handleUpiVerification = () => {
        // Dummy verification - just check if UPI ID contains '@'
        if (upiId.includes('@')) {
            setIsUpiVerified(true);
            setError('');
        } else {
            setError('Invalid UPI ID');
        }
    };

    const handlePayment = async () => {
        if (upiPin.length === 4) {
            try {
                // First book the seats
                const response = await bookSeats(showId, selectedSeats);
                
                if (response.status === 200) {
                    // Simulate payment processing
                    setTimeout(() => {
                        alert('Payment Successful!');
                        navigate('/');  // Navigate to home page
                    }, 1500);
                }
            } catch (error) {
                setError(error.response?.data?.error || 'Failed to complete booking');
            }
        } else {
            setError('UPI PIN must be 4 digits');
        }
    };

    return (
        <div className="payment-container">
            <h2>Payment Details</h2>
            <div className="payment-amount">
                <h3>Amount to Pay: ₹{amount}</h3>
            </div>
            
            {!isUpiVerified ? (
                <div className="upi-verification">
                    <input
                        type="text"
                        placeholder="Enter UPI ID (e.g. user@bank)"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                    />
                    <button onClick={handleUpiVerification}>Verify UPI</button>
                </div>
            ) : (
                <div className="upi-pin">
                    <input
                        type="password"
                        maxLength="4"
                        placeholder="Enter 4-digit UPI PIN"
                        value={upiPin}
                        onChange={(e) => setUpiPin(e.target.value.replace(/\D/g, ''))}
                    />
                    <button onClick={handlePayment}>Pay Now</button>
                </div>
            )}
            
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default Payment;