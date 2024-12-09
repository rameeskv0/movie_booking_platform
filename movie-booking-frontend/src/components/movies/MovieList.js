import React, { useEffect, useState } from 'react';
import { fetchMovies } from '../../services/api';

const MovieList = ({ selectedCity }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await fetchMovies();
        const filteredMovies = selectedCity 
          ? response.data.filter(movie => 
              movie.shows.some(show => 
                show.screen.theater.location.city === selectedCity))
          : response.data;
        setMovies(filteredMovies);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch movies');
        setLoading(false);
      }
    };

    getMovies();
  }, [selectedCity]);

  if (loading) return <div className="loading">Loading movies...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="movie-list">
      <h2>Now Showing</h2>
      <div className="movie-grid">
        {movies.map(movie => (
          <div key={movie.id} className="movie-card">
            <h3>{movie.title}</h3>
            <div className="movie-details">
              <p className="description">{movie.description}</p>
              <div className="meta">
                <span>{movie.duration} mins</span>
                <span>{movie.language}</span>
                <span>Release: {new Date(movie.release_date).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;