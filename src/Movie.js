import React, { useState } from 'react';
import Counter from './Counter';
import IconButton from '@mui/material/IconButton';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoIcon from '@mui/icons-material/Info';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Movie({ movieTake = {}, getMovies }) {
  const [show, setShow] = useState(true);
  const navigate = useNavigate();

  // Ensure that movieTake is defined and contains necessary properties
  const { id, name = "", poster = "", rating = 0, summary = "" } = movieTake;

  const deleteMovie = (id) => {
    fetch(`https://65f3cfc6105614e654a12eeb.mockapi.io/movie/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete movie.");
        }
        return response.json();
      })
      .then(() => {
        getMovies();
        alert("This card has been deleted.");
      })
      .catch((error) => {
        console.error("Error deleting movie:", error);
        alert("Failed to delete movie. Please try again.");
      });
  };

  return (
    <Card className='movie-container'>
      <br />
      {/* Conditionally render the image if poster exists */}
      {poster && <img className='movie-poster' src={poster} alt="Movie Poster" />}
      <CardContent>
        <div className='movie-spec'>
          <h2>
            {name}
            <IconButton color="secondary" aria-label='Toggle-Description' onClick={() => setShow(!show)}>
              {show ? <ExpandMoreIcon fontSize='small' color='secondary' /> : <ExpandLessIcon fontSize='small' color='secondary' />}
            </IconButton>
          </h2>
          <IconButton color="secondary" aria-label='Movie-info' onClick={() => navigate(`/portal/view/${id}`)}>
            <InfoIcon fontSize='medium' />
          </IconButton>
          <h3 className='movie-rating'>⭐{rating}</h3>
        </div>
      </CardContent>
      {!show &&
        <CardContent>
          <p className='movie-summary'>{summary}</p>
        </CardContent>
      }
      <CardActions>
        <Counter />
        <IconButton sx={{ marginLeft: "auto" }} aria-label='editMovie' onClick={() => navigate(`/portal/edit/${id}`)}>
          <EditIcon color='primary' />
        </IconButton>
        <IconButton sx={{ marginLeft: "auto" }} aria-label='deleteMovie' onClick={() => deleteMovie(id)}>
          <DeleteIcon color='primary' />
        </IconButton>
      </CardActions>
    </Card>
  );
}
