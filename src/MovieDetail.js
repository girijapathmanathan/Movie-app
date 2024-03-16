import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export default function MovieDetail() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch(`https://65f3cfc6105614e654a12eeb.mockapi.io/movie/${id}`, { method: "GET" })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setMovie(data))
      .catch((error) => console.error('Error fetching movie:', error));
  }, [id]); // Added id to the dependency array

  const ratingStyles = {
    color: movie && movie.rating >= 8.5 ? "green" : "red",
  };

  return (
    <div className='movie-detail'>
      <iframe width="100%" height="900px" src="https://www.youtube.com/embed/O27I_g_xqLI"
        title={movie ? movie.name : "Loading..."} frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen>
      </iframe>
      <div className='movie-detail-container'>
        <div className='movie-spec'>
          <h2 className='movie-name'>{movie ? movie.name : "Loading..."}</h2>
          <h3 style={ratingStyles} className="movie-rating">⭐{movie ? movie.rating : "Loading..."}</h3>
        </div>
        <p className='movie-summary'>{movie ? movie.summary : "Loading..."}</p>
      </div>
      <Button variant="contained" startIcon={<ArrowBackIosIcon />} onClick={() => window.history.back()}>Back </Button>
    </div>
  );
}
