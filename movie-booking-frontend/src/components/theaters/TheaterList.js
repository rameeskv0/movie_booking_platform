import React, { useEffect, useState } from 'react';
import { fetchTheaters, fetchLocations } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const TheaterList = ({ selectedCity, setSelectedTheater }) => {
  const [theaters, setTheaters] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getLocations = async () => {
      try {
        const response = await fetchLocations();
        setLocations(response.data);
      } catch (err) {
        console.error('Failed to fetch locations', err);
      }
    };

    getLocations();
  }, []);

  useEffect(() => {
    const getTheaters = async () => {
      try {
        const response = await fetchTheaters();
        const location = locations.find(loc => loc.city === selectedCity);
        const filteredTheaters = location 
          ? response.data.filter(theater => theater.location === location.id)
          : response.data;
        setTheaters(filteredTheaters);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch theaters');
        setLoading(false);
      }
    };

    if (locations.length > 0) {
      getTheaters();
    }
  }, [selectedCity, locations]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="theater-list">
      <h2>Theaters</h2>
      <div className="theater-grid">
        {theaters.map(theater => (
          <div 
            key={theater.id} 
            className="theater-card"
            onClick={() => {
              setSelectedTheater(theater.id);
              navigate(`/theater/${theater.id}`); // Navigate to the theater detail page
            }}
          >
            <h3>{theater.name}</h3>
            <p>{theater.address}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TheaterList;