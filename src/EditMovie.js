import React from 'react';
import { useParams } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

export default function EditMovie() {
  const { id } = useParams();
  const [movie, setMovie] = React.useState(null);

  React.useEffect(() => {
    fetch(`https://65f3cfc6105614e654a12eeb.mockapi.io/movie/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch movie');
        }
        return response.json();
      })
      .then(data => {
        setMovie(data);
      })
      .catch(error => {
        console.error('Error fetching movie:', error);
      });
  }, [id]);

  const editMovie = values => {
    fetch(`https://65f3cfc6105614e654a12eeb.mockapi.io/movie/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to edit movie');
        }
        return response.json();
      })
      .then(() => {
        // Redirect or show success message
      })
      .catch(error => {
        console.error('Error editing movie:', error);
      });
  };

  return (
    <div>
      {movie ? <EditForm movie={movie} editMovie={editMovie} /> : 'Loading...'}
    </div>
  );
}

function EditForm({ movie, editMovie }) {
  const movieValidationSchema = yup.object({
    name: yup.string().required(),
    poster: yup.string().required().url(),
    trailer: yup.string().required().url(),
    rating: yup.number().required().min(0).max(10),
    summary: yup.string().required().min(50),
  });

  const formik = useFormik({
    initialValues: {
      name: movie.name,
      poster: movie.poster,
      trailer: movie.trailer,
      rating: movie.rating,
      summary: movie.summary,
    },
    validationSchema: movieValidationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await editMovie(values);
        setSubmitting(false); // Set submitting to false after form submission
      } catch (error) {
        console.error('Error submitting form:', error);
        setSubmitting(false); // Ensure submitting is set to false in case of error
      }
    },
  });

  return (
    <form className="editForm" onSubmit={formik.handleSubmit}>
      <h1>Edit Movie</h1>
      <TextField
        id="name"
        name="name"
        label="Movie Name"
        variant="outlined"
        fullWidth
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
      />
      <TextField
        id="poster"
        name="poster"
        label="Movie Poster URL"
        variant="outlined"
        fullWidth
        value={formik.values.poster}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.poster && Boolean(formik.errors.poster)}
        helperText={formik.touched.poster && formik.errors.poster}
      />
      <TextField
        id="trailer"
        name="trailer"
        label="Movie Trailer URL"
        variant="outlined"
        fullWidth
        value={formik.values.trailer}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.trailer && Boolean(formik.errors.trailer)}
        helperText={formik.touched.trailer && formik.errors.trailer}
      />
      <TextField
        id="rating"
        name="rating"
        label="Movie Rating"
        variant="outlined"
        fullWidth
        type="number"
        value={formik.values.rating}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.rating && Boolean(formik.errors.rating)}
        helperText={formik.touched.rating && formik.errors.rating}
      />
      <TextField
        id="summary"
        name="summary"
        label="Movie Summary"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={formik.values.summary}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.summary && Boolean(formik.errors.summary)}
        helperText={formik.touched.summary && formik.errors.summary}
      />
      <Button variant="contained" type="submit">
        Submit
      </Button>
    </form>
  );
}
