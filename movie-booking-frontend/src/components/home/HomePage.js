import React, { useState, useEffect } from 'react';
import { fetchLocations } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const HomePage = ({ onCitySelect }) => {
  const [locations, setLocations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getLocations = async () => {
      try {
        const response = await fetchLocations();
        setLocations(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch locations');
        setLoading(false);
      }
    };

    getLocations();
  }, []);

  const filteredLocations = locations.filter(location =>
    location.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCityClick = (city) => {
    onCitySelect(city);
    navigate('/theaters'); // Navigate to the theater list page
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="home-page">
      <div className="search-section">
        <h2>Book Movie Tickets in Your City</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for your city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="cities-section">
        <h3>Available Cities</h3>
        <div className="cities-grid">
          {filteredLocations.map(location => (
            <div 
              key={location.id} 
              className="city-card"
              onClick={() => handleCityClick(location.city)}
            >
              <h4>{location.city}</h4>
              <p>{location.state}, {location.country}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;