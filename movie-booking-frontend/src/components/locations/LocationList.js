import React, { useEffect, useState } from 'react';
import { fetchLocations } from '../../services/api';

const LocationList = ({ selectedCity }) => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getLocations = async () => {
      try {
        const response = await fetchLocations();
        const filteredLocations = selectedCity 
          ? response.data.filter(location => location.city === selectedCity)
          : response.data;
        setLocations(filteredLocations);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch locations');
        setLoading(false);
      }
    };

    getLocations();
  }, [selectedCity]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="location-list">
      <h2>Locations</h2>
      <div className="location-grid">
        {locations.map(location => (
          <div key={location.id} className="location-card">
            <h3>{location.name}</h3>
            <p>{location.city}, {location.state}</p>
            <p>{location.country}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationList;