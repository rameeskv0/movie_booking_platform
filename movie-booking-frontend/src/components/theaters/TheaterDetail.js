import React, { useEffect, useState } from 'react';
import { fetchScreens, fetchShows, fetchMovies } from '../../services/api';
import { useNavigate, useParams } from 'react-router-dom';

const TheaterDetail = () => {
  const { theaterId } = useParams();
  const [screens, setScreens] = useState([]);
  const [shows, setShows] = useState([]);
  const [movies, setMovies] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getScreensAndShows = async () => {
      try {
        const screensResponse = await fetchScreens();
        const showsResponse = await fetchShows();
        const moviesResponse = await fetchMovies();

        const theaterScreens = screensResponse.data.filter(screen => screen.theater === parseInt(theaterId));
        const theaterShows = showsResponse.data.filter(show => 
          theaterScreens.some(screen => screen.id === show.screen)
        );

        setScreens(theaterScreens);
        setShows(theaterShows);
        setMovies(moviesResponse.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch screens, shows, or movies');
        setLoading(false);
      }
    };

    getScreensAndShows();
  }, [theaterId]);

  const handleShowClick = (show) => {
    setSelectedShow(show);
    const screen = screens.find(screen => screen.id === show.screen);
    if (screen) {
      navigate(`/seating/${show.id}`, { 
        state: { 
          seatingCapacity: screen.seating_capacity,
          showId: show.id 
        } 
      });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="theater-detail">
      <h2>Movies and Showtimes</h2>
      {screens.map(screen => (
        <div key={screen.id} className="screen-section">
          <h3>{screen.name}</h3>
          <div className="showtimes">
            {shows.filter(show => show.screen === screen.id).map(show => {
              const movie = movies.find(movie => movie.id === show.movie);
              return (
                <div 
                  key={show.id} 
                  className="showtime-card" 
                  onClick={() => handleShowClick(show)}
                  style={{ cursor: 'pointer' }}
                >
                  <h4>{movie ? movie.title : 'Unknown Movie'}</h4>
                  <p>Time: {new Date(show.show_time).toLocaleString()}</p>
                  <p>Price: ${show.price}</p>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TheaterDetail;