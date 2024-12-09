import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/navigation/Navbar';
import HomePage from './components/home/HomePage';
import TheaterList from './components/theaters/TheaterList';
import TheaterDetail from './components/theaters/TheaterDetail';
import SeatingArrangement from './components/seating/SeatingArrangement';
import Login from './components/auth/Login';
import Payment from './components/Payment/Payment';


// Protected Route component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedTheater, setSelectedTheater] = useState(null);

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setSelectedTheater(null);  // Reset theater when city changes
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage onCitySelect={handleCitySelect} />} />
            <Route 
              path="/theaters" 
              element={
                <TheaterList 
                  selectedCity={selectedCity} 
                  setSelectedTheater={setSelectedTheater}
                />
              } 
            />
            <Route path="/theater/:theaterId" element={<TheaterDetail />} />
            <Route path="/login" element={<Login />} />
            <Route 
              path="/seating/:showId" 
              element={
                <ProtectedRoute>
                  <SeatingArrangement />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/payment" 
              element={
                <ProtectedRoute>
                  <Payment />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;