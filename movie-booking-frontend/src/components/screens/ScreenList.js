import React, { useEffect, useState } from 'react';
import { fetchScreens } from '../../services/api';

const ScreenList = ({ selectedCity }) => {
  const [screens, setScreens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getScreens = async () => {
      try {
        const response = await fetchScreens();
        const filteredScreens = selectedCity 
          ? response.data.filter(screen => 
              screen.theater.location.city === selectedCity)
          : response.data;
        setScreens(filteredScreens);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch screens');
        setLoading(false);
      }
    };

    getScreens();
  }, [selectedCity]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="screen-list">
      <h2>Screens</h2>
      <div className="screen-grid">
        {screens.map(screen => (
          <div key={screen.id} className="screen-card">
            <h3>{screen.name}</h3>
            <p>Capacity: {screen.seating_capacity}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScreenList;