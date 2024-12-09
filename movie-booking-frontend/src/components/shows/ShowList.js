import React, { useEffect, useState } from 'react';
import { fetchShows } from '../../services/api';

const ShowList = ({ selectedCity }) => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getShows = async () => {
      try {
        const response = await fetchShows();
        const filteredShows = selectedCity 
          ? response.data.filter(show => 
              show.screen.theater.location.city === selectedCity)
          : response.data;
        setShows(filteredShows);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch shows');
        setLoading(false);
      }
    };

    getShows();
  }, [selectedCity]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="show-list">
      <h2>Shows</h2>
      <div className="show-grid">
        {shows.map(show => (
          <div key={show.id} className="show-card">
            <h3>{show.movie.title}</h3>
            <p>Time: {new Date(show.show_time).toLocaleString()}</p>
            <p>Price: ${show.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowList;